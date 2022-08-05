let content = document.querySelector('.content');
let popup = content.querySelector('.popup');
let form = content.querySelector('.form');
let editButton = content.querySelector('.profile__info-button');
let addButton = content.querySelector('.profile__add-button');
let name = content.querySelector('.profile__name');
let job = content.querySelector('.profile__subname');
let closeButton = popup.querySelector('.form__button-close');
let nameInput = popup.querySelector('.form__input_type_name');
let jobInput = popup.querySelector('.form__input_type_job');

function openPopup() {
  jobInput.value = job.textContent;
  nameInput.value = name.textContent;

  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function editInfo(evt) {
  evt.preventDefault();

  job.textContent = jobInput.value;
  name.textContent = nameInput.value;

  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', editInfo);
