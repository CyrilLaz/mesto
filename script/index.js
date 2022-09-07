const content = document.querySelector('.content');
const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup-profile');
const popupCard = document.querySelector('.popup-addPicture');
const popupPicture = document.querySelector('.popup-picture');

//переменные попап профиля
const buttonOpenPopupProfile = content.querySelector('.profile__button_type_edit');
const buttonOpenPopupCard = content.querySelector('.profile__button_type_add');
const name = content.querySelector('.profile__name');
const job = content.querySelector('.profile__subname');
const formPopupProfile = popupProfile.querySelector('.form');
const inputName = formPopupProfile.querySelector('.form__input_type_name');
const inputJob = formPopupProfile.querySelector('.form__input_type_job');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__button-close');
const buttonSubmitPopupProfile = popupProfile.querySelector('.form__button');

//переменные попап добавления фотографий
const cardsList = content.querySelector('.cards__list');
const formCardPopup = popupCard.querySelector('.form');
const titleInput = formCardPopup.querySelector('.form__input_type_title');
const urlInput = formCardPopup.querySelector('.form__input_type_url');
const buttonClosePopupCard = popupCard.querySelector('.popup__button-close');
const buttonSubmitPopupCard = formCardPopup.querySelector('.form__button');

//переменные карточек
const cardTemplate = document.querySelector('#card-template').content;

//переменные попап открытия фотографии
const buttonClosePopupPicture = popupPicture.querySelector('.close-picture');
const imgPopupPicture = popupPicture.querySelector('.popup-picture__picture');
const titlePopupPicture = popupPicture.querySelector('.popup-picture__title');

//функция на закрытие попап кликом оверлей
function setCloseByOverlay(popupElement) {
  popupElement.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) closePopup(popupElement);
  });
}

//раскидываем слушателя на попапы
popups.forEach((popupElement)=>{
  setCloseByOverlay(popupElement);
});

//функция для закрытия попап клавишей esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupElement = document.querySelector('.popup_opened')
    closePopup(popupElement);
  }
}

//фукция отмены слушателя для закрытия клавишей esc
function cancelEventByEsc() {
  document.removeEventListener('keydown', closeByEsc);
}

//функция открытия попап
function openPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc)
}

//функция закрытия попап
function closePopup(element) {
  element.classList.remove('popup_opened');
  cancelEventByEsc();
}

// функция внесения данных попап профиля
function editInfo(evt) {
  evt.preventDefault();

  job.textContent = inputJob.value;
  name.textContent = inputName.value;

  closePopup(popupProfile);
}

//функция создания карточки
const createCard = (url, title) => {
  const cardItem = cardTemplate.querySelector('.card__item').cloneNode(true);
  const cardPicture = cardItem.querySelector('.cards__picture');
  const cardTitle = cardItem.querySelector('.cards__title');
  const likeIcon = cardItem.querySelector('.cards__like-icon');

  cardPicture.src = url;
  cardPicture.alt = `Картинка с названием "${title}"`;

  cardTitle.textContent = title;

  setListenersCard(cardItem, url, title, likeIcon);

  return cardItem;
};

//функция открытия картинки в попапе
const openPicture = (url, title) => {

  imgPopupPicture.src = '';
  imgPopupPicture.src = url;
  imgPopupPicture.alt = `Тут находится картинка ${title}`;

  titlePopupPicture.textContent = title;

  openPopup(popupPicture);
};

//функция изменния лайка
function handleLikeButton(like) {
  like.classList.toggle('cards__like-icon_active');
}

//функция удаления карточки
function deleteCard(elementItem) {
  elementItem.remove();
}

//сборник слушателей на карточке
const setListenersCard = (cardItem, url, title, like) => {
  cardItem
    .querySelector('.cards__like-icon')
    .addEventListener('click', () => handleLikeButton(like));
  cardItem
    .querySelector('.cards__button-delete')
    .addEventListener('click', () => deleteCard(cardItem));
  cardItem
    .querySelector('.cards__picture')
    .addEventListener('click', () => openPicture(url, title));
};

//функция записи карточки в ДОМ
const renderCard = (url, title) => {
  cardsList.prepend(createCard(url, title));
};

//добавление фотографий из массива
initialCards.forEach((item) => renderCard(item.link, item.name));

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

  openPopup(popupProfile);
});
  //на закрытие попап-профиля
buttonClosePopupProfile.addEventListener('click', () => {
  closePopup(popupProfile);
  clearInputErrors(popupProfile);
});
  //отправка изменений в профиле
formPopupProfile.addEventListener('submit', (evt) => {
  editInfo(evt);
  makeButtonDisabled(buttonSubmitPopupProfile);
});

// слушатели на попап создания фотографий
  //на открытие попапа создания карточек
buttonOpenPopupCard.addEventListener('click', () => {
  openPopup(popupCard);
});
  //на закрытие попапа создания карточек
buttonClosePopupCard.addEventListener('click', () => {
  closePopup(popupCard);
  formCardPopup.reset();
  clearInputErrors(popupCard);
});
  //на создания новой карточки
formCardPopup.addEventListener('submit', (evt) => {
  makeNewCard(evt);
  makeButtonDisabled(buttonSubmitPopupCard);
});

//слушатель на закрытие попап фотографии
buttonClosePopupPicture.addEventListener('click', () => closePopup(popupPicture));
