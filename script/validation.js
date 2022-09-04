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

    inputList.forEach((inputElement) => {
      setEventListeners(formElement, inputElement, inputList, buttonElement);
    });
  });
}

function setEventListeners(
  formElement,
  inputElement,
  inputList,
  buttonElement
) {
  checkInputValidity(formElement, inputElement); //дает возможность после повторного отрытия попапа перепроверить наличие ошибки

  inputElement.addEventListener('input', () => {
    checkInputValidity(formElement, inputElement);
    toggleButtonState(inputList, buttonElement);
  });
}

function checkInputValidity(formElement, inputElement) {
  !inputElement.validity.valid
    ? showInputError(formElement, inputElement, inputElement.validationMessage)
    : hideInputError(formElement, inputElement);
}

function showInputError(formElement, inputElement, messedge) {
  const inputError = formElement.querySelector(`.${inputElement.name}-error`);
  inputError.classList.add(validationConfig.errorClass);
  inputElement.classList.add(validationConfig.inputErrorClass);
  inputError.textContent = messedge;
}

function hideInputError(formElement, inputElement) {
  const inputError = formElement.querySelector(`.${inputElement.name}-error`);
  inputError.classList.remove(validationConfig.errorClass);
  inputElement.classList.remove(validationConfig.inputErrorClass);
}

function toggleButtonState(inputList, buttonElement) {
  hasInvalid(inputList)
    ? buttonElement.classList.add(validationConfig.inactiveButtonClass)
    : buttonElement.classList.remove(validationConfig.inactiveButtonClass);
}

function hasInvalid(inputList) {
  return inputList.some((inputElement) => {
    return inputElement.validity.valid === false;
  });
}

enableValidation(validationConfig);
