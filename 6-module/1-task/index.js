/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  #users = [];
  elem = null;

  constructor(rows) {
    this.#users = rows;
    this.elem = this.#tableCreate();
  }

  #trTemplate(user) {
    return `
    <tr>
        <td>${user.name}</td>
        <td>${user.age}</td>
        <td>${user.salary}</td>
        <td>${user.city}</td>
        <td><button>X</button></td>
    </tr>
    `;
  }

  #tbodyCreate() {
    let tbody = '';

    for (let user of this.#users) {
      tbody += this.#trTemplate(user);
    }

    return tbody;
  }

  #onButtonClick = event => {
    if (event.target.tagName == 'BUTTON') {
      event.target.closest('tr').remove();
    }
  }

  #tableCreate() {
    let table = document.createElement('table');

    table.innerHTML = `
    <thead>
        <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
    ${this.#tbodyCreate()}
    </tbody>
    `

    table.addEventListener('click', this.#onButtonClick);
    
    return table;
  }
}
