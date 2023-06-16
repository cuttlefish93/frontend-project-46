import * as path from 'node:path';
import * as process from 'process';
import genDiff from '../src/index.js';

test('genDiff', () => {
  const path1 = path.join(process.cwd(), '/files/file1.json');
  const path2 = path.join(process.cwd(), '/files/file2.json');

  const result = genDiff(path1, path2);
  const correct = `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`;

  expect(result).toEqual(correct);
});
