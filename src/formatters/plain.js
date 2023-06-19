function isObject(item) {
  return typeof item === 'object';
}

function getFormattedValue(value) {
  let valueForStr;

  if (isObject(value) && value !== null) {
    return valueForStr = '[complex value]';
  } if (value === 'false' || value === 'true' || value === null || Number(value)) {
    return valueForStr = value;
  }

  return valueForStr = `'${value}'`;
}

function plain(coll, path = '') {
  const newPath = path === '' ? '' : `${path}.`;
  const result = [];

  const keys = Object.keys(coll);

  const keysWithoutSigh = keys.map((key) => {
    const newKey = key.split(' ').at(-1);
    return newKey;
  });

  keysWithoutSigh.forEach((key, i, arr) => {
    let str;

    const repeatedKeyI = arr.indexOf(key, i + 1);
    const value = coll[keys[i]];
    const valueForStr = getFormattedValue(value);
    const sign = keys[i].split(' ').at(0);
    const isValueObject = isObject(value);

    if (sign === '-') {
      if (repeatedKeyI < 0) {
        str = `Property '${newPath}${key}' was removed`;
        result.push(str);
        return;
      }
      if (repeatedKeyI >= 0) {
        str = `Property '${newPath}${key}' was updated. From ${valueForStr} to ${getFormattedValue(coll[keys[repeatedKeyI]])}`;
        result.push(str);
        return;
      }
    }

    if (sign === '+') {
      if (key === arr[i - 1]) {
        return;
      }
      if (isValueObject) {
        str = `Property '${newPath}${key}' was added with value: ${valueForStr}`;
        result.push(str);
        return;
      }
      if (!isValueObject) {
        str = `Property '${newPath}${key}' was added with value: ${valueForStr}`;
        result.push(str);
        return;
      }
    }

    if (sign === key) {
      if (!isValueObject) {
        return;
      }
      if (isValueObject) {
        str = plain(value, `${newPath}${key}`);
        result.push(str);
      }
    }
  });

  return result.join('\n');
}

export default plain;
