export default class Popup {
  constructor(selector) {
    this.popup = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this.popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) this.close(); //сожранится ли привязка?
    });
    this.popup
      .querySelector('.popup__button-close')
      .addEventListener('click', () => this.close());
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
