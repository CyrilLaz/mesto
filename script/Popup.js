export default class Popup {
  constructor(selector) {
    this.popup=document.querySelector(selector);
  }

  open() {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown',this._handleEscClose.bind(this));
  }

  close() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  setEventListeners() {
    this.popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) this.close();//сожранится ли привязка?
    });
    this.popup.querySelector('.popup__button-close').addEventListener('click',()=>this.close())
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _cancelEventByEsc() {
    console.log('gggg');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}

/*

//функция открытия попап
function openPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

//функция для закрытия попап клавишей esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupElement = document.querySelector('.popup_opened');
    closePopup(popupElement);
  }
}

//функция закрытия попап
function closePopup(element) {
  element.classList.remove('popup_opened');
  cancelEventByEsc();
}

//фукция отмены слушателя для закрытия клавишей esc
function cancelEventByEsc() {
  document.removeEventListener('keydown', closeByEsc);
}

//функция на закрытие попап кликом оверлей
function setCloseByOverlay(popupElement) {
  popupElement.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) closePopup(popupElement);
  });
}

//на закрытие попапа создания карточек
buttonClosePopupCard.addEventListener('click', () => closePopup(popupCard));

//слушатель на закрытие попап фотографии
buttonClosePopupPicture.addEventListener('click', () =>
  closePopup(popupPicture)
);

//прокидываем на попапы
popups.forEach((popupElement) => {
  setCloseByOverlay(popupElement);
});
*/
