import { validationConfig as config } from "./validation-config.js";
import { Card } from "./Card.js";
import { initialCards } from "./initial-cards.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";

//переменные документа
const content = document.querySelector(".content");
/*
const name = content.querySelector(".profile__name");
const job = content.querySelector(".profile__subname");
*/
const buttonOpenPopupCard = content.querySelector(".profile__button_type_add");
/*
const buttonOpenPopupProfile = content.querySelector(".profile__button_type_edit");
// поппапы
const popups = document.querySelectorAll(".popup");
const popupProfile = document.querySelector(".popup-profile");
const popupCard = document.querySelector(".popup-addPicture");
const popupPicture = document.querySelector(".popup-picture");
// переменные попапа картчоек
const formCardPopup = popupCard.querySelector(".form");
const titleInput = formCardPopup.querySelector(".form__input_type_title");
const urlInput = formCardPopup.querySelector(".form__input_type_url");
const buttonClosePopupCard = popupCard.querySelector(".popup__button-close");
 //переменные попапа профиля
const formPopupProfile = popupProfile.querySelector(".form");
const inputName = formPopupProfile.querySelector(".form__input_type_name");
const inputJob = formPopupProfile.querySelector(".form__input_type_job");
const buttonClosePopupProfile = popupProfile.querySelector(".popup__button-close");
//переменные попап фотографии
const buttonClosePopupPicture = popupPicture.querySelector(".close-picture");
const imgPopupPicture = popupPicture.querySelector(".popup-picture__picture");
const titlePopupPicture = popupPicture.querySelector(".popup-picture__title");

//на создания новой карточки
formCardPopup.addEventListener("submit", makeNewCard);

// функция внесения данных попап профиля
function editInfo(evt) {
  evt.preventDefault();

  job.textContent = inputJob.value;
  name.textContent = inputName.value;

  closePopup(popupProfile);
}

// функция создания карточки
function createCard(name, url) {
  const newCard = new Card(name, url, "#card-template", openPicture);

  return newCard.renderCard();
}

// функция добавления фотографии из попапа
function makeNewCard(evt) {
  evt.preventDefault();

  renderCard.addItem(createCard(titleInput.value, urlInput.value)); // создание карточки из экземпляра класса section

  //formCardPopup.reset();
  closePopup(popupCard);
}

function openPicture(title, url) {
  imgPopupPicture.src = "";
  imgPopupPicture.src = url;
  imgPopupPicture.alt = `Тут находится картинка ${title}`;

  titlePopupPicture.textContent = title;

  openPopup(popupPicture);
}

//на открытие попап-профиле
buttonOpenPopupProfile.addEventListener("click", () => {
  inputJob.value = job.textContent;
  inputName.value = name.textContent;

  validFormProfile.makeButtonDisabled();
  validFormProfile.clearInputErrors();

  popupProfile.open();

});

//на закрытие попап-профиля
buttonClosePopupProfile.addEventListener("click", () =>closePopup(popupProfile));

//отправка изменений в профиле
formPopupProfile.addEventListener("submit", editInfo);
*/
//на открытие попапа создания карточек
buttonOpenPopupCard.addEventListener("click", () => {
  //validFormCard.makeButtonDisabled();
  //validFormCard.clearInputErrors();

  //formCardPopup.reset();
  popupCard.open();
});

const popupCard = new Popup(".popup-addPicture");
popupCard.setEventListeners();

const popupProfile = new Popup(".popup-profile");
popupProfile.setEventListeners();

//--------------------------------
const popupPicture = new Popup(".popup-picture");
popupPicture.setEventListeners();
const popupWithImage = new PopupWithImage(".popup-picture");

// внесение карточек в контейнер
const renderCard = new Section(
  {
    items: initialCards.map((el) =>
      new Card(el.name, el.link, "#card-template", () =>
        popupWithImage.open(el.name, el.link)
      ).renderCard()
    ),
    renderer: (element, container) => {
      container.prepend(element);
    },
  },
  ".cards__list"
);

renderCard.addItems();

//const popupProfile = new Popup('.popup-profile');
/*
//валидация
const validFormProfile = new FormValidator(config, formPopupProfile);
const validFormCard = new FormValidator(config, formCardPopup);

validFormProfile.enableValidation();
validFormCard.enableValidation();
*/
