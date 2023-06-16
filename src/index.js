import * as path from 'node:path';
import * as process from 'process';
import * as fs from 'fs';
import _ from 'lodash';

function parseJson(json) {
  return JSON.parse(json);
}

const formats = {
  json(content) {
    return parseJson(content);
  },
};

function genDiff(filepath1, filepath2) {
  let result = '';

  const fullPath1 = path.resolve(process.cwd(), filepath1);
  const fullPath2 = path.resolve(process.cwd(), filepath2);

  const content1 = fs.readFileSync(fullPath1, { encoding: 'utf8' });
  const content2 = fs.readFileSync(fullPath2, { encoding: 'utf8' });

  const ext1 = filepath1.split('.').at(-1);
  const ext2 = filepath2.split('.').at(-1);

  const parsedContent1 = formats[ext1](content1);
  const parsedContent2 = formats[ext2](content2);

  const sortedContent1 = Object.fromEntries(_.sortBy(Object.entries(parsedContent1)));
  const sortedContent2 = Object.fromEntries(_.sortBy(Object.entries(parsedContent2)));

  const keys1 = Object.keys(sortedContent1);
  const keys2 = Object.keys(sortedContent2);

  keys1.forEach((key) => {
    const value1 = sortedContent1[key];
    const value2 = sortedContent2[key];

    if (!value2) {
      result = `${result}\n- ${key}: ${value1}`;
    }

    if (value1 === value2) {
      result = `${result}\n  ${key}: ${value1}`;
    }

    if (value1 !== value2 && value2) {
      result = `${result}\n- ${key}: ${value1}\n+ ${key}: ${value2}`;
    }
  });

  keys2.forEach((key) => {
    const value1 = sortedContent1[key];
    const value2 = sortedContent2[key];

    if (!value1) {
      result = `${result}\n+ ${key}: ${value2}`;
    }
  });

  return `{${result}
}`;
}

export default genDiff;
