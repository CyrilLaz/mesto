import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup,submit,openPopup) {
    super(popup);
    this.submit = submit;
    this.inputs = this.popup.querySelectorAll('.form__input');
    this.openPopup=openPopup;
  }

  set setInputs(inputsValue) {
    this.inputs.forEach((element, index) => {
      element.value = inputsValue[index]
});
  
  }

  close() {
    this.popup.querySelector('.form').reset();
    super.close();
  }

  _setSubmit(evt) {
    evt.preventDefault();
    const values = this._getInputValues();
    this.submit(values);

    this.close();
  }

  setEventListeners() {
    this.popup.addEventListener("submit", this._setSubmit.bind(this));
    super.setEventListeners();
  }

  _getInputValues() {
    return Array.from(this.inputs).map((el)=>el.value)
  }

}
