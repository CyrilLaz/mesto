export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  changeUserInfo(values) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: values.userName,
        about: values.userJob,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addNewCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  removeLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  removeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  changeAvatar(url) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: url,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

}
