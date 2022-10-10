export default class Section {
  constructor({ items, renderer }, container) {
    this.items = items;
    this.renderer = renderer;
    this.container = document.querySelector(container);
  }

  addItems() {
    this.items.forEach(element => {
      this.addItem(element);
    });
  }

  addItem(element) {
    this.renderer(element, this.container);
  }
}

/** осуществляем вставку готовой карточки и возможно осуществялет вставку данных профиля из формы */
