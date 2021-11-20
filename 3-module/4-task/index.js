function showSalary(users, age) {
  let listName = '';
  for (let user of users) {
    if (user.age <= age) {
      listName += `${user.name}, ${user.balance}\n`;
    }
  }
  return listName.slice(0, listName.length - 1);
}
