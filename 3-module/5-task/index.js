function getMinMax(str) {
  let arrFromStr = str.split(' ')
                      .map(a => +a)
                      .filter(a => !isNaN(a));
  let maximum = arrFromStr[0];
  let minimum = arrFromStr[0];
  for (let key of arrFromStr) {
    if (key > maximum) maximum = key;
  }
  for (let key of arrFromStr) {
    if (key < minimum) minimum = key;
  }
  return {
    min: minimum,
    max: maximum
  }
}
