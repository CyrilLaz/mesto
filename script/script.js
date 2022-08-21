const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

let content = document.querySelector('.content');

//переменные попап профиля
let popupProfile = document.querySelector('.popup-profile');
let formProfile = popupProfile.querySelector('.form');
let editButton = content.querySelector('.profile__button_type_edit');
let addButton = content.querySelector('.profile__button_type_add');
let name = content.querySelector('.profile__name');
let job = content.querySelector('.profile__subname');
let nameInput = formProfile.querySelector('.form__input_type_name');
let jobInput = formProfile.querySelector('.form__input_type_job');
let closeButtonProfile = popupProfile.querySelector('.popup__button-close');

//переменные попап добавления фотографий
let popupAddPicture = document.querySelector('.popup-addPicture');
let formAddPicture = popupAddPicture.querySelector('.form');
let titleInput = popupAddPicture.querySelector('.form__input_type_title');
let urlInput = popupAddPicture.querySelector('.form__input_type_url');
let closeButtonAddPicture = popupAddPicture.querySelector(
  '.popup__button-close'
);

//функция открытия попап профиля
function openPopupProfile() {
  jobInput.value = job.textContent;
  nameInput.value = name.textContent;

  popupProfile.classList.add('popup_opened');
}

//функция обработчик событий
const eventProssesor = (elementItem) => {
  elementItem.addEventListener('click', (evt) => {
    if (evt.target === elementItem.querySelector('.cards__like-icon'))
      liked(elementItem);
    else if (evt.target === elementItem.querySelector('.cards__button-delete'))
      deletePicture(elementItem);
    else openPicture(elementItem);
  });
};

//функция создания карточки
const createCard = (url, title) => {
  let cardTemplate = document.querySelector('#card-template').content;
  let cardsList = document.querySelector('.cards__list');

  let cardItem = cardTemplate.querySelector('li').cloneNode(true);

  cardItem.querySelector('.cards__picture').src = url;
  cardItem.querySelector('.cards__title').textContent = title;
  cardsList.append(cardItem);

  eventProssesor(cardItem); //обработчик событий
};

//функция создания попап фотографии
const openPicture = (elementItem) => {
  let pictureTemplate = document.querySelector('#popup-template').content;

  let popupPicture = pictureTemplate
    .querySelector('.popup-picture')
    .cloneNode(true);

  popupPicture.querySelector('.popup-picture__picture').src =
    elementItem.querySelector('.cards__picture').src;
  popupPicture.querySelector('.popup-picture__title').textContent =
    elementItem.querySelector('.cards__title').textContent;
  content.append(popupPicture);

  //слушатель на закрытие
  popupPicture
    .querySelector('.popup__button-close')
    .addEventListener('click', () => popupPicture.remove());
};

//функция изменния лайка
function liked(elementItem) {
  let likeIcon = elementItem.querySelector('.cards__like-icon');
  likeIcon.classList.toggle('cards__like-icon_active');
}

//добавление фотографий из массива
initialCards.forEach((item) => createCard(item.link, item.name));

// функция внесения данных попап профиля
function editInfo(evt) {
  evt.preventDefault();

  job.textContent = jobInput.value;
  name.textContent = nameInput.value;

  closePopup(evt);
}

// функция открытия папап добавления фотографии
function openPopupAddPicture() {
  popupAddPicture.classList.add('popup_opened');
}

// функция добавления фотографии из попапа
function addPicture(evt) {
  evt.preventDefault();

  createCard(urlInput.value, titleInput.value);

  closePopup(evt);

  urlInput.value = '';
  titleInput.value = '';
}

//функция удаления карточки
function deletePicture(elementItem) {
  elementItem.remove();
}

function closePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

// слушатели на попап-профиле
editButton.addEventListener('click', openPopupProfile);
closeButtonProfile.addEventListener('click', closePopup);
formProfile.addEventListener('submit', editInfo);

// слушатели на попап-добавлении фотографий
addButton.addEventListener('click', openPopupAddPicture);
closeButtonAddPicture.addEventListener('click', closePopup);
formAddPicture.addEventListener('submit', addPicture);
