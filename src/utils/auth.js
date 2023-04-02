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

  //   // try {
  //   //   if (response.status === 200) {
  //   return response.json();
  //   // }
  //   // } catch (e) {
  //   //   return e;
  //   // }
  // })
  // .then((res) => {
  //   return res;
  // })
  // .catch((err) => console.log(err));
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
      return res.json().then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return data;
        }
        return res.json().then((data) => {
          return Promise.reject(res.status);
        });
      });
    }
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
