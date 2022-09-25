export default class {
  #inputList;
  #submitButton;
  #config;
  #form;
  constructor(config, form) {
    this.#config = config;
    this.#form = form;
    this.#inputList =
      Array.from(this.#form.querySelectorAll(`${this.#config.inputSelector}`));
    this.#submitButton =
      this.#form.querySelector(this.#config.submitButtonSelector);
  }

  enableValidation() {

    this.#toggleButtonState();

    this.#inputList.forEach((inputElement) => {
      this.#setEventListeners(inputElement);
    });
  }

  #setEventListeners(inputElement) {
    inputElement.addEventListener('input', () => {
      this.#checkInputValidity(inputElement);
      this.#toggleButtonState();
    });
  }

  #checkInputValidity(inputElement) {
    !inputElement.validity.valid
      ? this.#showInputError(inputElement, inputElement.validationMessage)
      : this.#hideInputError(inputElement);
  }

  #showInputError(inputElement, messedge) {
    const inputError = this.#form.querySelector(`.${inputElement.name}-error`);
    inputError.classList.add(this.#config.errorClass);
    inputElement.classList.add(this.#config.inputErrorClass);
    inputError.textContent = messedge;
  }

  #hideInputError(inputElement) {
    const inputError = this.#form.querySelector(`.${inputElement.name}-error`);
    inputError.classList.remove(this.#config.errorClass);
    inputElement.classList.remove(this.#config.inputErrorClass);
  }

  #toggleButtonState() {
    if (this.#hasInvalid()) {
      this.#submitButton.classList.add(this.#config.inactiveButtonClass);
      this.#submitButton.disabled = true;
    } else {
      this.#submitButton.classList.remove(this.#config.inactiveButtonClass);
      this.#submitButton.disabled = false;
    }
  }

  #hasInvalid() {
    return this.#inputList.some((inputElement) => inputElement.validity.valid === false);
  }

  makeButtonDisabled() {
    this.#submitButton.disabled = true;
    this.#submitButton.classList.add(this.#config.inactiveButtonClass);
  }

  clearInputErrors() {
    this.#inputList.forEach(inputElement =>
      this.#hideInputError(inputElement));
  }
}


