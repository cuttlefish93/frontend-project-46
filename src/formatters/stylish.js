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

    const itemArr = item.trim().split('');

    if (itemArr.includes(openBracket)) openBracketCounter += 1;

    if (itemArr.includes(closeBracket)) closeBracketCounter += 1;

    if (itemArr.length === 1 && openBracketCounter - closeBracketCounter === 0) {
      return item;
    }

    if (itemArr.includes('+') || itemArr.includes('-')) {
      innerStageSings = 2;
    }

    stage = openBracketCounter - closeBracketCounter;

    if (itemArr.includes(openBracket)) {
      repeatedSign = sign.repeat((stage - 1) * signRepeatPerStage - innerStageSings);
    } else {
      repeatedSign = sign.repeat(stage * signRepeatPerStage - innerStageSings);
    }

    itemArr.unshift(repeatedSign);
    return itemArr.join('');
  });

  return jsonArr.join('\n');
}

export default stylish;
