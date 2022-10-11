export default class Section {
  constructor({ renderer }, container) {
    this.renderer = renderer;
    this.container = document.querySelector(container);
  }

  addItems(items) {
    items.forEach(element => {
      this.addItem(element);
    });
  }

  addItem(element) {
    this.renderer(element, this.container);
  }
}


