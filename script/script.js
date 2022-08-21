const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


let content = document.querySelector('.content');

//let popup = document.querySelectorAll('.popup'); попробовать можно реальзоать открытие и закрытие у массива попапов, но потом, сейчас не могу сообразить
//переменные попап профиля
let popupProfile = document.querySelector('.popup-profile');
let formProfile = popupProfile.querySelector('.form');
let editButton = content.querySelector('.profile__button_type_edit');
let addButton = content.querySelector('.profile__button_type_add');
let name = content.querySelector('.profile__name');
let job = content.querySelector('.profile__subname');
let nameInput = formProfile.querySelector('.form__input_type_name');
let jobInput = formProfile.querySelector('.form__input_type_job');
let closeButtonProfile = popupProfile.querySelector('.form__button-close');

//переменные попап добавления фотографий
let popupAddPicture = document.querySelector('.popup-addPicture');
let formAddPicture = popupAddPicture.querySelector('.form');
let titleInput = popupAddPicture.querySelector('.form__input_type_title');
let urlInput = popupAddPicture.querySelector('.form__input_type_url');
let closeButtonAddPicture = popupAddPicture.querySelector('.form__button-close');

//переменные попап фотографии
let popupPicture = document.querySelector('.popup-picture');


//функция открытия попап профиля
function openPopupProfile() {
  jobInput.value = job.textContent;
  nameInput.value = name.textContent;

  popupProfile.classList.add('popup_opened');
}

// функция закрытия попап профиля
function closePopupProfile() {
  popupProfile.classList.remove('popup_opened');
}

//функция создания карточки
const createCard = (url, title) => {
  let cardTemplate = document.querySelector('#card-template').content;
  let cardsList = document.querySelector('.cards__list');

  let cardItem = cardTemplate.querySelector('li').cloneNode(true);

  cardItem.querySelector('.cards__picture').src = url;
  cardItem.querySelector('.cards__title').textContent = title;
  cardsList.append(cardItem);

  //вешаем слушатель для лайка
  let likeIcon = cardItem.querySelector('.cards__like-icon');
  likeIcon.addEventListener('click', function(){
    likeIcon.classList.toggle('cards__like-icon_active')
  });
}


//добавление фотографий из массива
initialCards.forEach(item=>createCard(item.link, item.name));

// функция внесения данных попап профиля
function editInfo(evt) {
  evt.preventDefault();

  job.textContent = jobInput.value;
  name.textContent = nameInput.value;

  closePopupProfile();
}

// функция открытия папап добавления фотографии
function openPopupAddPicture() {
  popupAddPicture.classList.add('popup_opened');
}

// функция закрытия папап добавления фотографии
function closePopupAddPicture() {
  popupAddPicture.classList.remove('popup_opened');
}

// функция добавления фотографии из попапа
function addPicture(evt) {
  evt.preventDefault();

  createCard(urlInput.value, titleInput.value);

  closePopupAddPicture();
}


// слушатели на попап-профиле

editButton.addEventListener('click', openPopupProfile);
closeButtonProfile.addEventListener('click', closePopupProfile);
formProfile.addEventListener('submit', editInfo);

// слушатели на попап-добавлении фотографий
addButton.addEventListener('click', openPopupAddPicture);
closeButtonAddPicture.addEventListener('click', closePopupAddPicture);
formAddPicture.addEventListener('submit', addPicture);

/*const button = document.querySelector('.cards__item');
console.log(button);

button.addEventListener('click', function (event) { // event доступен как параметр
    console.log(event.target); // его можно использовать в теле обработчика
});*/


//1.сделать добавление карточек из массива инитиал
//2. сделать добавление карточек пользоавтелем
//3.
