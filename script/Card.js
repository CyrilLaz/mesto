export class Card {
  #title;
  #url;
  #item;
  #popup;
  #openPopup;
  constructor(title, url, selector, popup, openPopup) {
    this.#title = title;
    this.#url = url;
    this.#popup = popup;
    this.#openPopup = openPopup;
    this.#item = document
      .querySelector(selector)
      .content.querySelector(".card__item")
      .cloneNode(true);
  }

  createCard() {
    const cardPicture = this.#item.querySelector(".cards__picture");
    const cardTitle = this.#item.querySelector(".cards__title");

    cardPicture.src = this.#url;
    cardPicture.alt = `Картинка с названием "${this.#title}"`;

    cardTitle.textContent = this.#title;

    this.#setListenersCard();
    return this.#item;
  }

  #setListenersCard() {
    this.#item
      .querySelector(".cards__like-icon")
      .addEventListener("click", () => this.#handleLikeButton());
    this.#item
      .querySelector(".cards__button-delete")
      .addEventListener("click", () => this.#deleteCard());
    this.#item
      .querySelector(".cards__picture")
      .addEventListener("click", () => this.#openPicture());
  }

  #handleLikeButton() {
    this.#item
      .querySelector(".cards__like-icon")
      .classList.toggle("cards__like-icon_active");
  }

  #deleteCard() {
    this.#item.remove();
  }

  #openPicture() {
    const imgPopupPicture = this.#popup.querySelector('.popup-picture__picture');
    const titlePopupPicture = this.#popup.querySelector('.popup-picture__title');

    imgPopupPicture.src = '';
    imgPopupPicture.src = this.#url;
    imgPopupPicture.alt = `Тут находится картинка ${this.#title}`;

    titlePopupPicture.textContent = this.#title;

    this.#openPopup(this.#popup);
  }
} /*

//функция открытия картинки в попапе
const openPicture = (url, title) => {

  imgPopupPicture.src = '';
  imgPopupPicture.src = url;
  imgPopupPicture.alt = `Тут находится картинка ${title}`;

  titlePopupPicture.textContent = title;

  openPopup(popupPicture);
};

//функция изменния лайка
function handleLikeButton(buttonLike) {
  buttonLike.classList.toggle('cards__like-icon_active');
}

//функция удаления карточки
function deleteCard(elementItem) {
  elementItem.remove();
}

//сборник слушателей на карточке
const setListenersCard = (cardItem, url, title, buttonLike) => {
  cardItem
    .querySelector('.cards__like-icon')
    .addEventListener('click', () => handleLikeButton(buttonLike));
  cardItem
    .querySelector('.cards__button-delete')
    .addEventListener('click', () => deleteCard(cardItem));
  cardItem
    .querySelector('.cards__picture')
    .addEventListener('click', () => openPicture(url, title));
};


// функция добавления фотографии из попапа
function makeNewCard(evt) {
  evt.preventDefault();

  renderCard(urlInput.value, titleInput.value);

  formCardPopup.reset();

  closePopup(popupCard);
}

// слушатели на попап-профиле
  //на открытие попап-профиле
buttonOpenPopupProfile.addEventListener('click', () => {
  inputJob.value = job.textContent;
  inputName.value = name.textContent;

  makeButtonDisabled(buttonSubmitPopupProfile);
  clearInputErrors(formPopupProfile);

  openPopup(popupProfile);
});
  //на закрытие попап-профиля
buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));
  //отправка изменений в профиле
formPopupProfile.addEventListener('submit', editInfo);

// слушатели на попап создания фотографий
  //на открытие попапа создания карточек
buttonOpenPopupCard.addEventListener('click', () => {

  makeButtonDisabled(buttonSubmitPopupCard);
  formCardPopup.reset();
  clearInputErrors(formCardPopup);

  openPopup(popupCard);
});
  //на закрытие попапа создания карточек
buttonClosePopupCard.addEventListener('click', () => closePopup(popupCard));
  //на создания новой карточки
formCardPopup.addEventListener('submit', (evt) => {
  makeNewCard(evt);
});

*/
