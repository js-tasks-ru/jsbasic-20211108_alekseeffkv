function makeFriendsList(friends) {
  let liElements = '';
  for (let friend of friends) {
    liElements += `<li>${friend.firstName} ${friend.lastName}</li>`;
  }
  let ul = document.createElement('ul');
  ul.innerHTML = liElements;
  return ul;
}
