import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this.imgPopup = this.popup.querySelector(".popup-picture__picture");
    this.titlePopup = this.popup.querySelector(".popup-picture__title");

  }

  open (title,url) {
    //this.imgPopup.src = ""; //прежде без этого при открытии попапа первые доли секунды отображалась прежде открытая картинка, сейчас же вроде нет такого
    this.imgPopup.src = url;
    this.imgPopup.alt = `Тут находится картинка ${title}`;

    this.titlePopup.textContent = title;

    super.open();
  }
}
