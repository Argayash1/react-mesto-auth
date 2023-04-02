export const BASE_URL = "https://auth.nomoreparties.co";

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return res.text().then((err) => {
      const error = JSON.parse(err);
      return Promise.reject(`Ошибка ${res.status}: ${error.message || error.error}`);
    });
  });
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return res.text().then((err) => {
      const error = JSON.parse(err);
      return Promise.reject(`Ошибка ${res.status}: ${error.message || error.error}`);
    });
  });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};
