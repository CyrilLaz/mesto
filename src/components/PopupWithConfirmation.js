import PopupWithForm from './PopupWithForm';

export default class PopupWithConfirmation extends PopupWithForm {
  constructor(popup, submit) {
    super(popup, submit);
  }

  open(action) {
    this.action = action;
    super.open();
  }

  _setSubmit(evt) {
    super._setSubmit(evt);
    this.action();
    super.close();
  }
}
