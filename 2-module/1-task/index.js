function sumSalary(salaries) {
  let sumSalary = 0;
  for (let key in salaries) {
    if (isFinite(salaries[key])) {
      sumSalary += salaries[key];
    }
  }
  return sumSalary;
}
