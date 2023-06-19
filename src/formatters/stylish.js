function stylish(coll) {
  const signRepeatPerStage = 4;
  const sign = ' ';
  const openBracket = '{';
  const closeBracket = '}';
  let openBracketCounter = 0;
  let closeBracketCounter = 0;
  let stage;
  let repeatedSign;

  const json = JSON.stringify(coll, null, 2);
  const formattedJson = json.replaceAll('"', '').replaceAll(',', '');

  const jsonArr = formattedJson.split('\n').map((item) => {
    let innerStageSings = 0;

    const itemArr = item.split('');

    if (itemArr.length === 1) {
      if (itemArr[0] === openBracket) openBracketCounter += 1;
      if (itemArr[0] === closeBracket) closeBracketCounter += 1;
      return item;
    }

    const filteredItemArr = itemArr.filter((i) => i !== ' ');

    if (filteredItemArr.includes(':')) {
      const index = filteredItemArr.indexOf(':');
      filteredItemArr.splice(index + 1, 0, sign);
    }

    if (filteredItemArr.includes(openBracket)) openBracketCounter += 1;

    if (filteredItemArr.includes(closeBracket)) closeBracketCounter += 1;

    if (filteredItemArr.includes('+') || filteredItemArr.includes('-')) {
      innerStageSings = 2;
      const index1 = filteredItemArr.indexOf('+');
      const index2 = filteredItemArr.indexOf('-');
      const index = index1 >= 0 ? index1 : index2;
      filteredItemArr.splice(index + 1, 0, sign);
    }

    stage = openBracketCounter - closeBracketCounter;

    if (filteredItemArr.includes(openBracket)) {
      repeatedSign = sign.repeat((stage - 1) * signRepeatPerStage - innerStageSings);
    } else {
      repeatedSign = sign.repeat(stage * signRepeatPerStage - innerStageSings);
    }

    filteredItemArr.unshift(repeatedSign);
    return filteredItemArr.join('');
  });

  return jsonArr.join('\n');
}

export default stylish;
