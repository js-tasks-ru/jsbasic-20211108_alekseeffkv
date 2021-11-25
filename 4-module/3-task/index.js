function highlight(table) {
  for (let tr of table.tBodies[0].rows) {
    tr.cells[3].dataset.available === undefined ? tr.hidden = true :
    tr.cells[3].dataset.available == 'true' ? tr.classList.add('available') :
    tr.classList.add('unavailable');

    tr.cells[2].innerHTML == 'm' ? tr.classList.add('male') :
    tr.classList.add('female');

    ( +tr.cells[1].innerHTML < 18 ) && ( tr.style.textDecoration = 'line-through' );
  }
}
