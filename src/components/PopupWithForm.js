import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, submit) {
    super(popup);
    this.submit = submit;
    this.inputs = this.popup.querySelectorAll('.form__input');
  }

  set setInputs(inputsValue) {
    this.inputs.forEach((element) => {
      element.value = inputsValue[element.name];
    });
  }

  close() {
    this.popup.querySelector('.form').reset();
    super.close();
  }

  _setSubmit(evt) {
    evt.preventDefault();
    const values = this._getInputValues();
    console.log(values);
    this.submit(values);

    this.close();
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
