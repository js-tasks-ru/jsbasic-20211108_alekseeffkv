function isEmpty(obj) {
  for (let key in obj) {
    if (obj[key] !== null) return false;
  }
  return true;
}
