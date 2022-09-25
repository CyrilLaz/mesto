export class Card {
  #title;
  #url;
  #item;
  #openPicture;

  constructor(title, url, selector, openPicture) {
    this.#title = title;
    this.#url = url;
    this.#openPicture = openPicture;
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
      .addEventListener("click", () => this.#openPicture(this.#title, this.#url));
  }

  #handleLikeButton() {
    this.#item
      .querySelector(".cards__like-icon")
      .classList.toggle("cards__like-icon_active");
  }

  #deleteCard() {
    this.#item.remove();
    this.#item = null;
  }
}
