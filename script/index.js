import { validationConfig as config } from './validation-config.js';
import { Card } from './Card.js';
import { initialCards } from './initial-cards.js';
import FormValidator from './FormValidator.js';

//переменные попап добавления фотографий
const content = document.querySelector('.content');

const popupProfile = document.querySelector('.popup-profile');
const popupCard = document.querySelector('.popup-addPicture');
const formCardPopup = popupCard.querySelector('.form');
const titleInput = formCardPopup.querySelector('.form__input_type_title');
const urlInput = formCardPopup.querySelector('.form__input_type_url');
const buttonClosePopupCard = popupCard.querySelector('.popup__button-close');

//переменные попап профиля
const buttonOpenPopupProfile = content.querySelector(
  '.profile__button_type_edit'
);
const buttonOpenPopupCard = content.querySelector('.profile__button_type_add');
const name = content.querySelector('.profile__name');
const job = content.querySelector('.profile__subname');
const formPopupProfile = popupProfile.querySelector('.form');
const inputName = formPopupProfile.querySelector('.form__input_type_name');
const inputJob = formPopupProfile.querySelector('.form__input_type_job');
const buttonClosePopupProfile = popupProfile.querySelector(
  '.popup__button-close'
);

const cardsList = document.querySelector('.cards__list'); //контейнер для карточек
const popupPicture = document.querySelector('.popup-picture');
const popups = document.querySelectorAll('.popup');

//переменные попап открытия фотографии
const buttonClosePopupPicture = popupPicture.querySelector('.close-picture');

initialCards.forEach((el) => {
  const card = new Card(
    el.name,
    el.link,
    '#card-template',
    popupPicture,
    openPopup
  );
  cardsList.prepend(card.createCard());
});

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

popups.forEach((popupElement) => {
  setCloseByOverlay(popupElement);
});



//на создания новой карточки
formCardPopup.addEventListener('submit', (evt) => {
  makeNewCard(evt);
});

// функция внесения данных попап профиля
function editInfo(evt) {
  evt.preventDefault();

  job.textContent = inputJob.value;
  name.textContent = inputName.value;

  closePopup(popupProfile);
}

// функция добавления фотографии из попапа
function makeNewCard(evt) {
  evt.preventDefault();

  const card = new Card(
    titleInput.value,
    urlInput.value,
    '#card-template',
    popupPicture,
    openPopup
  );

  cardsList.prepend(card.createCard());

  formCardPopup.reset();

  closePopup(popupCard);
}

//на открытие попап-профиле
buttonOpenPopupProfile.addEventListener('click', () => {
  inputJob.value = job.textContent;
  inputName.value = name.textContent;

  validFormProfile.makeButtonDisabled();
  validFormProfile.clearInputErrors();

  openPopup(popupProfile);
});

//на закрытие попап-профиля
buttonClosePopupProfile.addEventListener('click', () =>
  closePopup(popupProfile)
);

//отправка изменений в профиле
formPopupProfile.addEventListener('submit', editInfo);

// слушатели на попап создания фотографий
//на открытие попапа создания карточек
buttonOpenPopupCard.addEventListener('click', () => {

  validFormCard.makeButtonDisabled();
  validFormCard.clearInputErrors();

  formCardPopup.reset();

  openPopup(popupCard);
});

 //валидация
const validFormProfile = new FormValidator(config, formPopupProfile);
const validFormCard = new FormValidator(config, formCardPopup);

validFormProfile.enableValidation();
validFormCard.enableValidation();
