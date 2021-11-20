function camelize(str) {
  let arrFromStr = str.split('-');
  if (arrFromStr[0] == '') {
    arrFromStr.shift();
    return arrFromStr.map(a => a[0].toUpperCase() + a.slice(1))
                     .join('');
  } else {
    let newStr = arrFromStr.map(a => a[0].toUpperCase() + a.slice(1))
                         .join('');
    return newStr[0].toLowerCase() + newStr.slice(1);
  }
}

