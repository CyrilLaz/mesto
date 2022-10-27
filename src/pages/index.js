import { validationConfig as config } from '../utils/validation-config.js';
import { Card } from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

import UserInfo from '../components/UserInfo.js';
import {
  buttonOpenPopupCard,
  buttonOpenPopupProfile,
  avatarPicture,
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
    renderCard.addItems(res.reverse().map((el) => makeNewCard(el)));
  })
  .catch((err) => console.log(err));

//------------

api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo = {
      userName: res.name,
      userJob: res.about,
      userId: res._id,
    };
    userInfo.setUserAvatar(res.avatar);
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

avatarPicture.addEventListener('click', () => {
  validFormAvatar.makeButtonDisabled();
  validFormAvatar.clearInputErrors();
  popupAvatar.open();
});
//-------------
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__subname',
  avatarSelector: '.profile__avatar-img',
});

//---------------
const makeNewCard = function (el) {
  const newCard = new Card(el.name, el.link, '#card-template', {
    openPicture: () => popupWithImage.open(el.name, el.link),
    changeLike: () => {
      if (
        newCard.getLikes.find(
          (item) => item._id === userInfo.getUserInfo.userId
        )
      ) {
        api
          .removeLike(el._id)
          .then((res) => {
            newCard.handleLikeButton(false);
            newCard.setLikes = res.likes;
          })
          .catch((err) => console.log(err));
      } else {
        api
          .addLike(el._id)
          .then((res) => {
            newCard.handleLikeButton(true);
            newCard.setLikes = res.likes;
          })
          .catch((err) => console.log(err));
      }
    },
    deleteCard: () => {
      popupWithConfirmation.setInputs = { cardId: el._id };
      popupWithConfirmation.open(newCard.deleteCardFromDom.bind(newCard));
    },
  });

  newCard.handleLikeButton(
    el.likes.find((el) => el._id === userInfo.getUserInfo.userId)
  );
  newCard.setLikes = el.likes;
  newCard.showDeleteIcon(el.owner._id === userInfo.getUserInfo.userId);
  
  return newCard.getCard();
};
//----------------
const popupCard = new PopupWithForm('.popup-addPicture', (values) => {
  api
    .addNewCard(values.pictureName, values.pictureUrl)
    .then((res) => {
      renderCard.addItem(makeNewCard(res));
      popupCard.close();
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
      popupProfile.close();
    })
    .catch((err) => console.log(err));
});
popupProfile.setEventListeners();

//--------------------------------
const popupAvatar = new PopupWithForm('.popup-changeAvatar', (value) => {
  api
    .changeAvatar(value.avatarUrl)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      popupAvatar.close();
    })
    .catch((err) => console.log(err));
});
popupAvatar.setEventListeners();
//----------------
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
const popupWithConfirmation = new PopupWithConfirmation(
  '.popup-confirmation',
  (value) =>
    api
      .removeCard(value.cardId)
      .then((res) => console.log(res.message)) //пост удален
      .catch((err) => console.log(err))
);

popupWithConfirmation.setEventListeners();
//-----------
//валидация
const validFormProfile = new FormValidator(config, '.popup-profile .form');
const validFormCard = new FormValidator(config, '.popup-addPicture .form');
const validFormAvatar = new FormValidator(config, '.popup-changeAvatar .form');

validFormProfile.enableValidation();
validFormCard.enableValidation();
validFormAvatar.enableValidation();
