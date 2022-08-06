let content = document.querySelector('.content');
let popup = content.querySelector('.popup');
let editButton = content.querySelector('.profile__button_type_edit');
let addButton = content.querySelector('.profile__button_type_add');
let name = content.querySelector('.profile__name');
let job = content.querySelector('.profile__subname');
let nameInput = popup.querySelector('.form__input_type_name');
let jobInput = popup.querySelector('.form__input_type_job');

function openPopup() {
  jobInput.value = job.textContent;
  nameInput.value = name.textContent;

  popup.classList.add('popup_opened');
}

function closePopup(evt) {
  evt.preventDefault();

  popup.classList.remove('popup_opened');
}

function editInfo(evt) {
  evt.preventDefault();

  job.textContent = jobInput.value;
  name.textContent = nameInput.value;

  closePopup(evt);
}

editButton.addEventListener('click', openPopup);
popup.addEventListener('reset', closePopup);
popup.addEventListener('submit', editInfo);
