import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, submit) {
    super(popup);
    this.submit = submit;
    this.inputs = this.popup.querySelectorAll('.form__input');
    this.submitButton = this.popup.querySelector('.form__button');
  }

  set setInputs(inputsValue) {
    this.inputs.forEach((element) => {
      console.log(inputsValue);

      element.value = inputsValue[element.name];
      console.log(element.value);
    });
  }

  _changeTextButton(text) {
    this.submitButton.textContent = text;
  }

  close() {
    this.popup.querySelector('.form').reset();
    this._changeTextButton('Готово');
    super.close();
  }

open() {
  this._changeTextButton('Сохранить');
  super.open();
}

  _setSubmit(evt) {
    evt.preventDefault();
    console.log(evt);
    const values = this._getInputValues();
    this.submit(values);
    this._changeTextButton('Сохранение...');
  }

  setEventListeners() {
    this.popup.addEventListener('submit', this._setSubmit.bind(this));
    super.setEventListeners();
  }

  _getInputValues() {
    return Array.from(this.inputs).reduce((initial, el) => {
      initial[el.name] = el.value;
      return initial;
    }, {});
  }
}
