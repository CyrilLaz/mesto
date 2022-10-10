import { validationConfig as config } from './validation-config.js';
import { Card } from './Card.js';
import { initialCards } from './initial-cards.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import { buttonOpenPopupCard,buttonOpenPopupProfile } from "./constants.js";

//на открытие попапа создания карточек
buttonOpenPopupCard.addEventListener('click', () => {
  validFormCard.makeButtonDisabled();
  validFormCard.clearInputErrors();

  popupCard.open();
});

buttonOpenPopupProfile.addEventListener('click', () => {
  validFormProfile.makeButtonDisabled();
  validFormProfile.clearInputErrors();

  popupProfile.setInputs = userInfo.getUserInfo;

  popupProfile.open();
});

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__subname',
});

//----------------
const popupCard = new PopupWithForm('.popup-addPicture', ([title, url]) => {
  const newCard = new Card(title, url, '#card-template', () =>
    popupWithImage.open(title, url)
  );
  renderCard.addItem(newCard.renderCard());
});
popupCard.setEventListeners();

//----------------------------------
const popupProfile = new PopupWithForm('.popup-profile', (values) => {
  userInfo.setUserInfo = values;
});
popupProfile.setEventListeners();

//--------------------------------
const popupWithImage = new PopupWithImage('.popup-picture');
popupWithImage.setEventListeners();

// внесение карточек в контейнер
const renderCard = new Section(
  {
    items: initialCards.map((el) => {
      const card = new Card(el.name, el.link, '#card-template', () =>
        popupWithImage.open(el.name, el.link)
      );
      return card.renderCard();
    }),
    renderer: (element, container) => {
      container.prepend(element);
    },
  },
  '.cards__list'
);

renderCard.addItems();

//валидация
const validFormProfile = new FormValidator(config, '.popup-profile .form');
const validFormCard = new FormValidator(config, '.popup-addPicture .form');

validFormProfile.enableValidation();
validFormCard.enableValidation();
