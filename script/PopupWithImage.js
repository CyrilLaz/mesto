import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this.imgPopup = this.popup.querySelector(".popup-picture__picture");
    this.titlePopup = this.popup.querySelector(".popup-picture__title");

  }

  open (title,url) {
    this.imgPopup.src = "";
    this.imgPopup.src = url;
    this.imgPopup.alt = `Тут находится картинка ${title}`;

    this.titlePopup.textContent = title;

    super.open();
  }
}
