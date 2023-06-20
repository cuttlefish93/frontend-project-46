import * as path from 'node:path';
import * as process from 'process';
import * as fs from 'fs';
import genDiff from '../src/index.js';

const path1F = path.join(process.cwd(), '/__fixtures__/file1.json');
const path2F = path.join(process.cwd(), '/__fixtures__/file2.json');
const path3F = path.join(process.cwd(), '/__fixtures__/file1.yml');
const path4F = path.join(process.cwd(), '/__fixtures__/file2.yaml');
const path1N = path.join(process.cwd(), '/__fixtures__/file3.json');
const path2N = path.join(process.cwd(), '/__fixtures__/file4.json');
const path3N = path.join(process.cwd(), '/__fixtures__/file3.yml');
const path4N = path.join(process.cwd(), '/__fixtures__/file4.yaml');

test('genDiff flat stylish', () => {
  const content = fs.readFileSync(path.join(process.cwd(), '/__fixtures__/flatStylish.txt'), { encoding: 'utf8' });

  const resultJson = genDiff(path1F, path2F);
  expect(resultJson).toEqual(content);

  const resultYaml = genDiff(path3F, path4F);
  expect(resultYaml).toEqual(content);
});

test('genDiff nested stylish', () => {
  const content = fs.readFileSync(path.join(process.cwd(), '/__fixtures__/nestedStylish.txt'), { encoding: 'utf8' });

  const resultJson = genDiff(path1N, path2N);
  expect(resultJson).toEqual(content);

  const resultYaml = genDiff(path3N, path4N);
  expect(resultYaml).toEqual(content);
});

test('genDiff flat plain', () => {
  const content = fs.readFileSync(path.join(process.cwd(), '/__fixtures__/flatPlain.txt'), { encoding: 'utf8' });

  const resultJson = genDiff(path1F, path2F, 'plain');
  expect(resultJson).toEqual(content);

  const resultYaml = genDiff(path3F, path4F, 'plain');
  expect(resultYaml).toEqual(content);
});

test('genDiff nested plain', () => {
  const content = fs.readFileSync(path.join(process.cwd(), '/__fixtures__/nestedPlain.txt'), { encoding: 'utf8' });

  const resultJson = genDiff(path1N, path2N, 'plain');
  expect(resultJson).toEqual(content);

  const resultYaml = genDiff(path3N, path4N, 'plain');
  expect(resultYaml).toEqual(content);
});

test('genDiff flat json', () => {
  const content = fs.readFileSync(path.join(process.cwd(), '/__fixtures__/flatJson.txt'), { encoding: 'utf8' });

  const resultJson = genDiff(path1F, path2F, 'json');
  expect(resultJson).toEqual(content);

  const resultYaml = genDiff(path3F, path4F, 'json');
  expect(resultYaml).toEqual(content);
});

test('genDiff nested json', () => {
  const content = fs.readFileSync(path.join(process.cwd(), '/__fixtures__/nestedJson.txt'), { encoding: 'utf8' });

  const resultJson = genDiff(path1N, path2N, 'json');
  expect(resultJson).toEqual(content);

  const resultYaml = genDiff(path3N, path4N, 'json');
  expect(resultYaml).toEqual(content);
});
