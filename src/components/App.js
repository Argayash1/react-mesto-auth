import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"; // импортируем Routes, Route и Navigate

import ProtectedRouteElement from "../components/ProtectedRoute.js"; // импортируем HOC
import Register from "../components/Register.js";
import Login from "../components/Login.js";

import Header from "../components/Header.js";
import Page from "../components/Page.js";

import EditProfilePopup from "../components/EditProfilePopup.js";
import EditAvatarPopup from "../components/EditAvatarPopup.js";
import AddPlacePopup from "../components/AddPlacePopup.js";
import ConfirmDeletePopup from "../components/ConfirmDeletePopup.js";
import InfoTooltip from "./InfoTooltip.js";
import ImagePopup from "../components/ImagePopup.js";

import * as auth from "../utils/auth.js";
import api from "../utils/api.js";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditProfilePopupLoading, setIsEditProfilePopupLoading] = useState(false);
  const [isAddPlacePopupLoading, setIsAddPlacePopupLoading] = useState(false);
  const [isEditAvatarPopupLoading, setIsEditAvatarPopupLoading] = useState(false);
  const [isDeletePopupLoading, setIsDeletePopupLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    function handleAutoCloseMenu() {
      window.onresize = () => {
        setIsMobileMenuOpen(false);
      };
    }

    if (isMobileMenuOpen) {
      window.addEventListener("resize", handleAutoCloseMenu);
      return () => window.removeEventListener("resize", handleAutoCloseMenu);
    }
  }, [isMobileMenuOpen]);

  const tokenCheck = useCallback(
    function tokenCheck() {
      // если у пользователя есть токен в localStorage,
      // эта функция проверит валидность токена
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        // проверим токен
        auth.getContent(jwt).then((userData) => {
          if (userData) {
            // авторизуем пользователя
            setLoggedIn(true);
            setUserEmail(userData.data.email);
            navigate("/", { replace: true });
          }
        });
      }
    },
    [navigate]
  );

  useEffect(() => {
    tokenCheck();
    loggedIn &&
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
  }, [loggedIn, tokenCheck]);

  function handleRegister(values) {
    const { password, email } = values;
    return auth
      .register(password, email)
      .then((res) => {
        setIsRegisterSuccess(true);
        setIsInfoTooltipOpen(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setIsRegisterSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  const handleLogin = (values) => {
    if (!values.email || !values.password) {
      return;
    }
    auth
      .authorize(values.password, values.email)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          setUserEmail(values.email);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRegisterSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  };

  function signOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("sign-in", { replace: true });
    setUserEmail("");
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(setIsEditProfilePopupLoading, true);
    api
      .editProfile({ name, about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(setIsEditProfilePopupLoading, false);
        }, 1500);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(setIsEditAvatarPopupLoading, true);
    api
      .addNewAvatar({ avatar })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(setIsEditAvatarPopupLoading, false);
        }, 1500);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(setIsAddPlacePopupLoading, true);
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(setIsAddPlacePopupLoading, false);
        }, 1500);
      });
  }

  function handleCardDelete(card) {
    setIsLoading(setIsDeletePopupLoading, true);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(setIsDeletePopupLoading, false);
        }, 1500);
      });
  }

  function setIsLoading(setIsPopupLoading, isPopupLoading) {
    setIsPopupLoading(isPopupLoading);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setIsDeletePopupOpen(true);
    setCardToDelete(card);
  }

  function handleCardClick({ name, link }) {
    setSelectedCard({ name, link });
  }

  function handleMobileMenuClick() {
    setIsMobileMenuOpen(true);
  }

  function handleCloseMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header
            loggedIn={loggedIn}
            onSignOut={signOut}
            userEmail={userEmail}
            isOpen={isMobileMenuOpen}
            onMobileMenu={handleMobileMenuClick}
            onClose={handleCloseMobileMenu}
          />
          <Routes>
            <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
            <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  element={Page}
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteCardClick}
                  cards={cards}
                />
              }
            />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isEditProfilePopupLoading}
            name="profile"
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isAddPlacePopupLoading}
            name="card"
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isEditAvatarPopupLoading}
            name="new-avatar"
          />

          <ConfirmDeletePopup
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            card={cardToDelete}
            onCardDelete={handleCardDelete}
            isLoading={isDeletePopupLoading}
            name="delete-card"
          />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            name="register"
            isSuccess={isRegisterSuccess}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} name="image" />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
