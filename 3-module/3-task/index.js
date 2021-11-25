function camelize(str) {
  let arrFromStr = str.split('-');
  return arrFromStr.map( (a, b) => b == 0 ? a: a[0].toUpperCase() + a.slice(1))
                   .join('');
}
