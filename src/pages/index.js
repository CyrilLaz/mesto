import { validationConfig as config } from '../utils/validation-config.js';
import { Card } from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  buttonOpenPopupCard,
  buttonOpenPopupProfile,
  userAvatar,
} from '../utils/constants.js';
import '../pages/index.css';
import Api from '../components/Api.js';
//---------------------------------------

//------------------------------------------
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: 'eec9246c-b7c7-4dd5-846f-1c8a00774f54',
    'Content-Type': 'application/json',
  },
});
//-------
api
  .getInitialCards()
  .then((res) => {
    renderCard.addItems(res.map((el) => makeNewCard(el.name, el.link)));
  })
  .catch((err) => console.log(err));

//------------
api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo = {
      userName: res.name,
      userJob: res.about,
    };
    userInfo.setUserAvatar = res.avatar
  })
  .catch((err) => console.log(err));
//-------------

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
  avatarSelector: '.profile__avatar',
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
  api.addNewCard(values.pictureName,values.pictureUrl)
  .then(res=>{
    renderCard.addItem(makeNewCard(res.name, res.link));
  })
  .catch(err=>console.log(err))

});
popupCard.setEventListeners();

//----------------------------------
const popupProfile = new PopupWithForm('.popup-profile', (values) => {
  api
    .changeUserInfo(values)
    .then((res) => {
      userInfo.setUserInfo = {
        userName: res.name,
        userJob: res.about,
      };
    })
    .catch((err) => console.log(err));
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

//валидация
const validFormProfile = new FormValidator(config, '.popup-profile .form');
const validFormCard = new FormValidator(config, '.popup-addPicture .form');

validFormProfile.enableValidation();
validFormCard.enableValidation();
