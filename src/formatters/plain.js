function isObject(item) {
  return typeof item === 'object';
}

function getFormattedValue(value) {
  if (isObject(value) && value !== null) {
    return '[complex value]';
  }
  if (value === 'false' || value === 'true' || value === null || value === '0' || Boolean(parseInt(value, 10))) {
    return value;
  }

  return `'${value}'`;
}

function plain(coll, path = '') {
  const newPath = path === '' ? '' : `${path}.`;

  const keys = Object.keys(coll);

  const keysWithoutSigh = keys.map((key) => {
    const newKey = key.split(' ').at(-1);
    return newKey;
  });

  const result = keysWithoutSigh.map((key, i, arr) => {
    const repeatedKeyI = arr.indexOf(key, i + 1);
    const value = coll[keys[i]];
    const valueForStr = getFormattedValue(value);
    const sign = keys[i].split(' ').at(0);
    const isValueObject = isObject(value);

    if (sign === '-') {
      if (repeatedKeyI < 0) {
        const str = `Property '${newPath}${key}' was removed`;
        return str;
      }
      if (repeatedKeyI >= 0) {
        const str = `Property '${newPath}${key}' was updated. From ${valueForStr} to ${getFormattedValue(coll[keys[repeatedKeyI]])}`;
        return str;
      }
    }

    if (sign === '+') {
      if (key === arr[i - 1]) {
        return '';
      }
      if (isValueObject) {
        const str = `Property '${newPath}${key}' was added with value: ${valueForStr}`;
        return str;
      }
      if (!isValueObject) {
        const str = `Property '${newPath}${key}' was added with value: ${valueForStr}`;
        return str;
      }
    }

    if (sign === key) {
      if (!isValueObject) {
        return '';
      }
      if (isValueObject) {
        const str = plain(value, `${newPath}${key}`);
        return str;
      }
    }

    return '';
  });

  const filteredResult = result.filter((item) => item !== '');
  return filteredResult.join('\n');
}

export default plain;
