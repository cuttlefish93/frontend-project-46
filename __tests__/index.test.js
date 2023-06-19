import * as path from 'node:path';
import * as process from 'process';
import genDiff from '../src/index.js';

const correctResults = {
  flatStylish: `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`,
  nestedStylish: `{
    common: {
      + follow: false
        setting1: Value1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blahblah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: somuch
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`,
  flatPlain: `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`,
  nestedPlain: `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`,
  flatJson: `{
  "- follow": "false",
  "host": "hexlet.io",
  "- proxy": "123.234.53.22",
  "- timeout": "50",
  "+ timeout": "20",
  "+ verbose": "true"
}`,
  nestedJson: `{
  "common": {
    "+ follow": "false",
    "setting1": "Value 1",
    "- setting2": "200",
    "- setting3": "true",
    "+ setting3": null,
    "+ setting4": "blah blah",
    "+ setting5": {
      "key5": "value5"
    },
    "setting6": {
      "doge": {
        "- wow": "",
        "+ wow": "so much"
      },
      "key": "value",
      "+ ops": "vops"
    }
  },
  "group1": {
    "- baz": "bas",
    "+ baz": "bars",
    "foo": "bar",
    "- nest": {
      "key": "value"
    },
    "+ nest": "str"
  },
  "- group2": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  },
  "+ group3": {
    "deep": {
      "id": {
        "number": 45
      }
    },
    "fee": 100500
  }
}`,
};

test('genDiff flat stylish', () => {
  const path1 = path.join(process.cwd(), '/__fixtures__/file1.json');
  const path2 = path.join(process.cwd(), '/__fixtures__/file2.json');
  const path3 = path.join(process.cwd(), '/__fixtures__/file1.yml');
  const path4 = path.join(process.cwd(), '/__fixtures__/file2.yaml');

  const resultJson = genDiff(path1, path2);
  expect(resultJson).toEqual(correctResults.flatStylish);

  const resultYaml = genDiff(path3, path4);
  expect(resultYaml).toEqual(correctResults.flatStylish);
});

test('genDiff nested stylish', () => {
  const path1 = path.join(process.cwd(), '/__fixtures__/file3.json');
  const path2 = path.join(process.cwd(), '/__fixtures__/file4.json');
  const path3 = path.join(process.cwd(), '/__fixtures__/file3.yml');
  const path4 = path.join(process.cwd(), '/__fixtures__/file4.yaml');

  const resultJson = genDiff(path1, path2);
  expect(resultJson).toEqual(correctResults.nestedStylish);

  const resultYaml = genDiff(path3, path4);
  expect(resultYaml).toEqual(correctResults.nestedStylish);
});

test('genDiff flat plain', () => {
  const path1 = path.join(process.cwd(), '/__fixtures__/file1.json');
  const path2 = path.join(process.cwd(), '/__fixtures__/file2.json');
  const path3 = path.join(process.cwd(), '/__fixtures__/file1.yml');
  const path4 = path.join(process.cwd(), '/__fixtures__/file2.yaml');

  const resultJson = genDiff(path1, path2, 'plain');
  expect(resultJson).toEqual(correctResults.flatPlain);

  const resultYaml = genDiff(path3, path4, 'plain');
  expect(resultYaml).toEqual(correctResults.flatPlain);
});

test('genDiff nested plain', () => {
  const path1 = path.join(process.cwd(), '/__fixtures__/file3.json');
  const path2 = path.join(process.cwd(), '/__fixtures__/file4.json');
  const path3 = path.join(process.cwd(), '/__fixtures__/file3.yml');
  const path4 = path.join(process.cwd(), '/__fixtures__/file4.yaml');

  const resultJson = genDiff(path1, path2, 'plain');
  expect(resultJson).toEqual(correctResults.nestedPlain);

  const resultYaml = genDiff(path3, path4, 'plain');
  expect(resultYaml).toEqual(correctResults.nestedPlain);
});

test('genDiff flat json', () => {
  const path1 = path.join(process.cwd(), '/__fixtures__/file1.json');
  const path2 = path.join(process.cwd(), '/__fixtures__/file2.json');
  const path3 = path.join(process.cwd(), '/__fixtures__/file1.yml');
  const path4 = path.join(process.cwd(), '/__fixtures__/file2.yaml');

  const resultJson = genDiff(path1, path2, 'json');
  expect(resultJson).toEqual(correctResults.flatJson);

  const resultYaml = genDiff(path3, path4, 'json');
  expect(resultYaml).toEqual(correctResults.flatJson);
});

test('genDiff nested json', () => {
  const path1 = path.join(process.cwd(), '/__fixtures__/file3.json');
  const path2 = path.join(process.cwd(), '/__fixtures__/file4.json');
  const path3 = path.join(process.cwd(), '/__fixtures__/file3.yml');
  const path4 = path.join(process.cwd(), '/__fixtures__/file4.yaml');

  const resultJson = genDiff(path1, path2, 'json');
  expect(resultJson).toEqual(correctResults.nestedJson);

  const resultYaml = genDiff(path3, path4, 'json');
  expect(resultYaml).toEqual(correctResults.nestedJson);
});
