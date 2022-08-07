let content = document.querySelector('.content');
let popup = document.querySelector('.popup');
let form = popup.querySelector('.form');
let editButton = content.querySelector('.profile__button_type_edit');
let addButton = content.querySelector('.profile__button_type_add');
let name = content.querySelector('.profile__name');
let job = content.querySelector('.profile__subname');
let nameInput = form.querySelector('.form__input_type_name');
let jobInput = form.querySelector('.form__input_type_job');
let closeButton = form.querySelector('.form__button-close');

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
