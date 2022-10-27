export class Card {
  #title;
  #url;
  #deleteCard;
  #item;
  #openPicture;
  #changeLike;
  constructor(title, url, selector, { openPicture, changeLike, deleteCard }) {
    this.#title = title;
    this.#url = url;
    this.#deleteCard = deleteCard;
    this.#openPicture = openPicture;
    this.#changeLike = changeLike;
    this.#item = document
      .querySelector(selector)
      .content.querySelector('.card__item')
      .cloneNode(true);

    this.likeButton = this.#item.querySelector('.cards__like-icon');
    this.deleteButton = this.#item.querySelector('.cards__button-delete');
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
    this.deleteButton.addEventListener('click', () => {
      this.#deleteCard();
    });
    this.#item
      .querySelector('.cards__picture')
      .addEventListener('click', () =>
        this.#openPicture(this.#title, this.#url)
      );
  }

  deleteCardFromDom() {
    this.#item.remove();
    this.#item = null;
  }

  handleLikeButton(isLiked) {
    isLiked
      ? this.likeButton.classList.add('cards__like-icon_active')
      : this.likeButton.classList.remove('cards__like-icon_active');
  }

  set setLikes(likesArray) {

    this.likesArray = likesArray;
    this.#item.querySelector('.cards__like-counter').textContent = this.likesArray.length;
  }

  get getLikes(){
    return this.likesArray;
  }

  showDeleteIcon(isShowed) {
    isShowed
      ? this.deleteButton.classList.add('cards__button-delete_active')
      : this.deleteButton.classList.remove('cards__button-delete_active');
  }
}
