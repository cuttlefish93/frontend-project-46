import * as path from 'node:path';
import * as process from 'process';
import * as fs from 'fs';
import parsers from './parsers.js';
import formatters from './formatters.js';

function sortCollection(coll) {
  const newColl = {};

  Object.keys(coll)
    .sort((a, b) => {
      const str1 = a.split(' ').at(-1);
      const str2 = b.split(' ').at(-1);
      if (str1 > str2) {
        return 1;
      }
      if (str1 < str2) {
        return -1;
      }
      return 0;
    })
    .forEach((key) => {
      newColl[key] = coll[key];
      if (typeof newColl[key] === 'object' && newColl[key] !== null) {
        const sortedColl = sortCollection(newColl[key]);
        newColl[key] = sortedColl;
      }
    });
  return newColl;
}

function calcDiff(coll1, coll2) {
  const diff = {};
  const keys1 = Object.keys(coll1);

  keys1.forEach((key) => {
    const value1 = coll1[key];
    const value2 = coll2[key];
    const str1 = typeof value1 === 'object' ? value1 : String(value1);
    const str2 = typeof value2 === 'object' ? value2 : String(value2);

    // when one key is object and another key is not object
    if ((typeof str1 === 'object' || typeof str2 === 'object') && typeof str1 !== typeof str2 && str1 !== 'undefined' && str2 !== 'undefined') {
      diff[`- ${key}`] = str1;
      diff[`+ ${key}`] = str2;
      return;
    }

    // when key in coll1 exist and key in coll2 do not exist
    if (str1 !== str2 && str2 === 'undefined') {
      diff[`- ${key}`] = str1;
      return;
    }

    // when key exist in both colls and has the same value (not objects)
    if (str1 === str2 && typeof str1 !== 'object' && typeof str2 !== 'object') {
      diff[key] = str1;
      return;
    }

    // when key exist in both colls and has different value (not object)
    if (str1 !== str2 && str2 !== 'undefined' && str2 !== null && typeof str1 !== 'object' && typeof str2 !== 'object') {
      diff[`- ${key}`] = str1;
      diff[`+ ${key}`] = str2;
      return;
    }

    // when key in both colls is object
    if (typeof str1 === 'object' && typeof str2 === 'object') {
      const innerDiff = calcDiff(str1, str2);
      diff[key] = innerDiff;
    }
  });

  const keys2 = Object.keys(coll2);
  const uniqueKeys2 = keys2.filter((key) => !keys1.includes(key));

  uniqueKeys2.forEach((key) => {
    const value1 = coll1[key];
    const value2 = coll2[key];
    const str1 = typeof value1 === 'object' ? value1 : String(value1);
    const str2 = typeof value2 === 'object' ? value2 : String(value2);

    if (str1 === 'undefined') {
      diff[`+ ${key}`] = str2;
    }
  });

  return diff;
}

function genDiff(filepath1, filepath2, formatter = 'stylish') {
  const fullPath1 = path.resolve(process.cwd(), filepath1);
  const fullPath2 = path.resolve(process.cwd(), filepath2);

  const content1 = fs.readFileSync(fullPath1, { encoding: 'utf8' });
  const content2 = fs.readFileSync(fullPath2, { encoding: 'utf8' });

  const ext1 = filepath1.split('.').at(-1);
  const ext2 = filepath2.split('.').at(-1);

  const parsedContent1 = parsers[ext1](content1);
  const parsedContent2 = parsers[ext2](content2);

  const diff = calcDiff(parsedContent1, parsedContent2);
  const sortedDiff = sortCollection(diff);
  const formattedDiff = formatters[formatter](sortedDiff);
  return formattedDiff;
}

export default genDiff;
