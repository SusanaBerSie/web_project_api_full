class Api {
  constructor(apiConfig) {
    this.url = apiConfig.baseUrl;
    this.token = apiConfig.headers.authorization;
  }

  getUserInfo() {
    return fetch(this.url + "users/me", {
      method: "GET",
      headers: {
        authorization: this.token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  editProfile(userName, userAbout) {
    return fetch(this.url + "users/me", {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        about: userAbout,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getInitialCards() {
    return fetch(this.url + "cards/", {
      method: "GET",
      headers: {
        authorization: this.token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  addNewCard(name, link) {
    return fetch(this.url + "cards/", {
      method: "POST",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(this.url + "cards/" + cardId + "/likes", {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  deleteCard(cardId) {
    return fetch(this.url + "cards/" + cardId, {
      method: "DELETE",
      headers: {
        authorization: this.token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  switchPhotoProfile(url) {
    return fetch(this.url + "users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: url,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

export const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1/",
  headers: {
    authorization: "55fccc8a-cf9c-4f13-a85d-ecd74e12c690",
    "Content-Type": "application/json",
  },
});
