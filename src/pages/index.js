import { validationConfig as config } from '../utils/validation-config.js';
import { Card } from '../components/Card.js';
import { initialCards } from '../utils/initial-cards.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  buttonOpenPopupCard,
  buttonOpenPopupProfile,
} from '../utils/constants.js';
import '../pages/index.css';

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

//---------------
const makeNewCard = function (title, url) {
  const newCard = new Card(title, url, '#card-template', () =>
    popupWithImage.open(title, url)
  );
  return newCard.getCard();
};
//----------------
const popupCard = new PopupWithForm('.popup-addPicture', (values) => {
  renderCard.addItem(makeNewCard(values.pictureName, values.pictureUrl));
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
    renderer: (element, container) => {
      container.prepend(element);
    },
  },
  '.cards__list'
);
//--------------------
renderCard.addItems(
  initialCards.map((el) =>
    makeNewCard(el.name, el.link)
  )
);

//валидация
const validFormProfile = new FormValidator(config, '.popup-profile .form');
const validFormCard = new FormValidator(config, '.popup-addPicture .form');

validFormProfile.enableValidation();
validFormCard.enableValidation();
