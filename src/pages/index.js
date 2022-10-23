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
    renderCard.addItems(res.map((el) => makeNewCard(el)));
  })
  .catch((err) => console.log(err));

//------------
const user = {};
api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo = {
      userName: res.name,
      userJob: res.about,
    };
    userInfo.setUserAvatar = res.avatar;
  })
  .catch((err) => console.log(err));
//-------------
//console.log(userId);
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
const makeNewCard = function (el) {
  const newCard = new Card(
    el.name,
    el.link,
    // el._id,
    '#card-template',
    () => popupWithImage.open(el.name, el.link),
    () => {
      const user = userInfo.getUserInfo;
      api.findCardById(el._id).then((res) => {
        if (
          res.likes.find(
            (el) => el.name === user.userName && el.about === user.userJob
          )
        ) {
          api.removeLike(el._id).then((res) => {
            newCard.handleLikeButton(false);
            newCard.setCountLike = res.likes.length;
          }); //некотрая задержка есть в изменении количества лайков, что если ...
        } else {

          api
            .addLike(el._id)
            .then((res) => {
              newCard.handleLikeButton(true);
              newCard.setCountLike = res.likes.length;
            });
        }
      });
    }
  );
  newCard.handleLikeButton(
    el.likes.find(
      (el) =>
        el.name === userInfo.getUserInfo.userName &&
        el.about === userInfo.getUserInfo.userJob
    )
  );
  newCard.setCountLike = el.likes.length;

  return newCard.getCard();
};
//----------------
const popupCard = new PopupWithForm('.popup-addPicture', (values) => {
  api
    .addNewCard(values.pictureName, values.pictureUrl)
    .then((res) => {
      renderCard.addItem(makeNewCard(res));
    })
    .catch((err) => console.log(err));
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
