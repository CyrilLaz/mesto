export default class Section {
  constructor({ renderer }, container) {
    this.renderer = renderer;
    this.container = document.querySelector(container);
  }

  addItems(items) {
    items.forEach(element => {
      this.renderer(element);
    });
  }

  addItem (element) {
    this.container.prepend(element);
  }
}


