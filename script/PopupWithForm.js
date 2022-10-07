import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector) {
    this.popup=document.querySelector(selector);
  }

  open() {
console.log(this.popup);
  }
}
