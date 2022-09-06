const content = document.querySelector('.content');
const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup-profile');
const cardPopup = document.querySelector('.popup-addPicture');
const picturePopup = document.querySelector('.popup-picture');

//переменные попап профиля
const formProfile = profilePopup.querySelector('.form');
const editButton = content.querySelector('.profile__button_type_edit');
const addButton = content.querySelector('.profile__button_type_add');
const name = content.querySelector('.profile__name');
const job = content.querySelector('.profile__subname');
const nameInput = formProfile.querySelector('.form__input_type_name');
const jobInput = formProfile.querySelector('.form__input_type_job');
const closeButtonProfile = profilePopup.querySelector('.popup__button-close');
const submitButtonProfile = profilePopup.querySelector('.form__button');

//переменные попап добавления фотографий
const formAddPicture = cardPopup.querySelector('.form');
const titleInput = cardPopup.querySelector('.form__input_type_title');
const urlInput = cardPopup.querySelector('.form__input_type_url');
const closeButtonAddPicture = cardPopup.querySelector('.popup__button-close');
const cardsList = content.querySelector('.cards__list');

//переменные карточек
const cardTemplate = document.querySelector('#card-template').content;

//переменные попап открытия фотографии
const closeButtonPicture = picturePopup.querySelector('.close-picture');
const imgPicturePopup = picturePopup.querySelector('.popup-picture__picture');
const titlePicturePopup = picturePopup.querySelector('.popup-picture__title');


//функция на закрытие попап кликом оверлей
function setOverlayClose(popupElement) {
  popupElement.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) closePopup(popupElement);
  });
}

//раскидываем слушателя на попапы
popups.forEach((popupElement)=>{
  setOverlayClose(popupElement);
});

//функция для закрытия попап клавишей esc
function closeByEsc(evt) {
    if (evt.key === 'Escape') {
      console.log(`нажали ${evt.key}`);
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

  /*скрытие текста ошибки при закрытии*/
  const inputElements = element.querySelectorAll('.form__input');
  inputElements.forEach(inputElement =>
    hideInputError(element, inputElement));
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
  const cardItem = cardTemplate.querySelector('li').cloneNode(true);

  cardItem.querySelector('.cards__picture').src = url;
  cardItem.querySelector('.cards__picture').alt = `Картинка с названием "${title}"`;

  cardItem.querySelector('.cards__title').textContent = title;

  addListenersCard(cardItem);

  return cardItem;
};

const openPicture = (elementItem) => {
  imgPicturePopup.src = '';
  imgPicturePopup.src = elementItem.querySelector('.cards__picture').src;
  imgPicturePopup.alt = elementItem.querySelector('.cards__picture').alt;

  titlePicturePopup.textContent =
    elementItem.querySelector('.cards__title').textContent;

  openPopup(picturePopup);
};

//функция изменния лайка
function handleLikeButton(elementItem) {
  const likeIcon = elementItem.querySelector('.cards__like-icon');
  likeIcon.classList.toggle('cards__like-icon_active');
}

//функция удаления карточки
function deleteCard(elementItem) {
  elementItem.remove();
}

//сборник слушателей на карточке
const addListenersCard = (element) => {
  element
    .querySelector('.cards__like-icon')
    .addEventListener('click', () => handleLikeButton(element));
  element
    .querySelector('.cards__button-delete')
    .addEventListener('click', () => deleteCard(element));
  element
    .querySelector('.cards__picture')
    .addEventListener('click', () => openPicture(element));
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

  formAddPicture.reset();

  closePopup(cardPopup);
}

// слушатели на попап-профиле
editButton.addEventListener('click', () => {
  jobInput.value = job.textContent;
  nameInput.value = name.textContent;

  openPopup(profilePopup);
});

closeButtonProfile.addEventListener('click', () => closePopup(profilePopup));
formProfile.addEventListener('submit', editInfo);

// слушатели на попап-добавлении фотографий
addButton.addEventListener('click', () => {
  openPopup(cardPopup);
});

closeButtonAddPicture.addEventListener('click', () => {
  closePopup(cardPopup);
  formAddPicture.reset();
});
formAddPicture.addEventListener('submit', addPicture);

//слушатель на закрытие попап фотографии
closeButtonPicture.addEventListener('click', () => closePopup(picturePopup));
