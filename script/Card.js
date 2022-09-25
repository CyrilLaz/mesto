export class Card {
  #title;
  #url;
  #item;
  #popup;
  #openPopup;

  constructor(title, url, selector, popup, openPopup) {
    this.#title = title;
    this.#url = url;
    this.#popup = popup;
    this.#openPopup = openPopup;
    this.#item = document
      .querySelector(selector)
      .content.querySelector(".card__item")
      .cloneNode(true);
  }

  renderCard() {

    this.#createCard();
    this.#setListenersCard();

    return this.#item;
  }

  #createCard() {
    const cardPicture = this.#item.querySelector(".cards__picture");
    const cardTitle = this.#item.querySelector(".cards__title");

    cardPicture.src = this.#url;
    cardPicture.alt = `Картинка с названием "${this.#title}"`;

    cardTitle.textContent = this.#title;
  }

  #setListenersCard() {
    this.#item
      .querySelector(".cards__like-icon")
      .addEventListener("click", () => this.#handleLikeButton());
    this.#item
      .querySelector(".cards__button-delete")
      .addEventListener("click", () => this.#deleteCard());
    this.#item
      .querySelector(".cards__picture")
      .addEventListener("click", () => this.#openPicture());
  }

  #handleLikeButton() {
    this.#item
      .querySelector(".cards__like-icon")
      .classList.toggle("cards__like-icon_active");
  }

  #deleteCard() {
    this.#item.remove();
  }

  #openPicture() {
    const imgPopupPicture = this.#popup.querySelector('.popup-picture__picture');
    const titlePopupPicture = this.#popup.querySelector('.popup-picture__title');

    imgPopupPicture.src = '';
    imgPopupPicture.src = this.#url;
    imgPopupPicture.alt = `Тут находится картинка ${this.#title}`;

    titlePopupPicture.textContent = this.#title;

    this.#openPopup(this.#popup);
  }
}
