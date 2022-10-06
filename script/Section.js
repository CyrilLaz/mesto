class Section {
  constructor({ items, renderer }, container) {
    this.items = items;
    this.renderer = renderer;
    this.container = document.querySelector(container);
  }
}
