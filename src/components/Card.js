export class Card {
  #title;
  #url;
  // #cardId;
  #item;
  #openPicture;
  #changeLike;
  constructor(title, url, selector, openPicture, changeLike,deleteCard) {
    this.#title = title;
    this.#url = url;
    //this. #cardId = cardId
    this.#openPicture = openPicture;
    this.#changeLike = changeLike;
    this.#item = document
      .querySelector(selector)
      .content.querySelector('.card__item')
      .cloneNode(true);

    this.likeButton = this.#item.querySelector('.cards__like-icon');
  }

  getCard() {
    this.#createCard();
    this.#setListenersCard();

    return this.#item;
  }

  #createCard() {
    const cardPicture = this.#item.querySelector('.cards__picture');
    const cardTitle = this.#item.querySelector('.cards__title');

    cardPicture.src = this.#url;
    cardPicture.alt = `Картинка с названием "${this.#title}"`;

    cardTitle.textContent = this.#title;
  }

  #setListenersCard() {
    this.likeButton.addEventListener('click', () => this.#changeLike());
    this.#item
      .querySelector('.cards__button-delete')
      .addEventListener('click', () => this.#deleteCard());
    this.#item
      .querySelector('.cards__picture')
      .addEventListener('click', () =>
        this.#openPicture(this.#title, this.#url)
      );
  }

  handleLikeButton(isLike) {
    !!isLike
      ? this.likeButton.classList.add('cards__like-icon_active')
      : this.likeButton.classList.remove('cards__like-icon_active');
  }

  set setCountLike(number) {
    this.#item.querySelector('.cards__like-counter').textContent = number;
  }

  #deleteCard() {
    this.#item.remove();
    this.#item = null;
  }
}
