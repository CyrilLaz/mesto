const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible',
};

//функция включения валидации: активация слушателей по полям и
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      config.submitButtonSelector
    );

    //resetValidation(formElement, inputList, buttonElement);
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      setEventListeners(formElement, inputElement, inputList, buttonElement);
    });
  });
}

//установка слуашетлей на поля ввода
function setEventListeners(formElement, inputElement, inputList, buttonElement) {

  //checkInputValidity(formElement, inputElement);

  inputElement.addEventListener('input', () => {
    checkInputValidity(formElement, inputElement);
    toggleButtonState(inputList, buttonElement);
  });
}

//првоерка на валидность поля
function checkInputValidity(formElement, inputElement) {
  !inputElement.validity.valid
    ? showInputError(formElement, inputElement, inputElement.validationMessage)
    : hideInputError(formElement, inputElement);
}

//функция показа ошибки
function showInputError(formElement, inputElement, messedge) {
  const inputError = formElement.querySelector(`.${inputElement.name}-error`);
  inputError.classList.add(validationConfig.errorClass);
  inputElement.classList.add(validationConfig.inputErrorClass);
  inputError.textContent = messedge;
}

//функция скрытия ошибки
function hideInputError(formElement, inputElement) {
  const inputError = formElement.querySelector(`.${inputElement.name}-error`);
  inputError.classList.remove(validationConfig.errorClass);
  inputElement.classList.remove(validationConfig.inputErrorClass);
}

//функция переключения состояния кнопки submit
function toggleButtonState(inputList, buttonElement) {
  hasInvalid(inputList)
    ? buttonElement.classList.add(validationConfig.inactiveButtonClass)
    : buttonElement.classList.remove(validationConfig.inactiveButtonClass);
}

//проверка на наличие ошибок среди полей
function hasInvalid(inputList) {
  return inputList.some((inputElement) => inputElement.validity.valid === false);
}

//функция  для  перепроверки формы , иначе
function resetValidation(formElement, inputList, buttonElement) {
  formElement.addEventListener('submit',() => toggleButtonState(inputList, buttonElement));
} //после удачного сабмита можно создавать пустые карточки

enableValidation(validationConfig);
