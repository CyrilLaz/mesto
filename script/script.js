const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const content = document.querySelector(".content");
const profilePopup = document.querySelector(".popup-profile");
const cardPopup = document.querySelector(".popup-addPicture");
const picturePopup = document.querySelector(".popup-picture");

//переменные попап профиля
const formProfile = profilePopup.querySelector(".form");
const editButton = content.querySelector(".profile__button_type_edit");
const addButton = content.querySelector(".profile__button_type_add");
const name = content.querySelector(".profile__name");
const job = content.querySelector(".profile__subname");
const nameInput = formProfile.querySelector(".form__input_type_name");
const jobInput = formProfile.querySelector(".form__input_type_job");
const closeButtonProfile = profilePopup.querySelector(".popup__button-close");

//переменные попап добавления фотографий

const formAddPicture = cardPopup.querySelector(".form");
const titleInput = cardPopup.querySelector(".form__input_type_title");
const urlInput = cardPopup.querySelector(".form__input_type_url");
const closeButtonAddPicture = cardPopup.querySelector(".popup__button-close");
const cardsList = content.querySelector(".cards__list");

//переменные попап открытия фотографии
const closeButtonPicture = picturePopup.querySelector(".close-picture");

//функция открытия попап
function openPopup(element) {
  element.classList.add("popup_opened");
}

//функция закрытия попап
function closePopup(element) {
  element.classList.remove("popup_opened");
}

// функция внесения данных попап профиля
function editInfo(evt) {
  evt.preventDefault();

  job.textContent = jobInput.value;
  name.textContent = nameInput.value;

  closePopup(profilePopup);
}

//функция создания карточки
const createCard = (url, title) => {
  let cardTemplate = document.querySelector("#card-template").content;

  let cardItem = cardTemplate.querySelector("li").cloneNode(true);

  cardItem.querySelector(".cards__picture").src = url;
  cardItem.querySelector(".cards__title").textContent = title;

  eventListenersCard(cardItem);

  return cardItem;
};

const openPicture = (elementItem) => {
  picturePopup.querySelector(".popup-picture__picture").src =
    elementItem.querySelector(".cards__picture").src;
  picturePopup.querySelector(".popup-picture__title").textContent =
    elementItem.querySelector(".cards__title").textContent;

  openPopup(picturePopup);
};

//функция изменния лайка
function liked(elementItem) {
  let likeIcon = elementItem.querySelector(".cards__like-icon");
  likeIcon.classList.toggle("cards__like-icon_active");
}

//функция удаления карточки
function deleteCard(elementItem) {
  elementItem.remove();
}

//сборник слушателей на карточке
const eventListenersCard = (element) => {
  element
    .querySelector(".cards__like-icon")
    .addEventListener("click", () => liked(element));
  element
    .querySelector(".cards__button-delete")
    .addEventListener("click", () => deleteCard(element));
  element
    .querySelector(".cards__picture")
    .addEventListener("click", () => openPicture(element));
};

//функция записи карточки в ДОМ
const renderCard = (url, title) => {
  cardsList.prepend(createCard(url, title));
};

//добавление фотографий из массива
initialCards.forEach((item) => renderCard(item.link, item.name));

// функция добавления фотографии из попапа
function addPicture(evt) {
  evt.preventDefault();

  renderCard(urlInput.value, titleInput.value);

  urlInput.value = "";
  titleInput.value = "";

  closePopup(cardPopup);
}

// слушатели на попап-профиле
editButton.addEventListener("click", () => {
  jobInput.value = job.textContent;
  nameInput.value = name.textContent;

  openPopup(profilePopup);
});

closeButtonProfile.addEventListener("click", () => closePopup(profilePopup));
formProfile.addEventListener("submit", editInfo);

// слушатели на попап-добавлении фотографий
addButton.addEventListener("click", () => openPopup(cardPopup));
closeButtonAddPicture.addEventListener("click", () => closePopup(cardPopup));
formAddPicture.addEventListener("submit", addPicture);

//слушатель на закрытие попап фотографии
closeButtonPicture.addEventListener("click", () => {
  picturePopup.querySelector(".popup-picture__picture").src = "#";
  closePopup(picturePopup);
});
