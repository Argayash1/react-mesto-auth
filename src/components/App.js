import { useState, useEffect } from "react";

import Header from "../components/Header.js";
import Main from "../components/Main.js";
import Footer from "../components/Footer.js";

import EditProfilePopup from "../components/EditProfilePopup.js";
import EditAvatarPopup from "../components/EditAvatarPopup.js";
import AddPlacePopup from "../components/AddPlacePopup.js";
import ConfirmDeletePopup from "../components/ConfirmDeletePopup.js";
import ImagePopup from "../components/ImagePopup.js";

import api from "../utils/api.js";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isEditProfilePopupLoading, setIsEditProfilePopupLoading] = useState(false);
  const [isAddPlacePopupLoading, setIsAddPlacePopupLoading] = useState(false);
  const [isEditAvatarPopupLoading, setIsEditAvatarPopupLoading] = useState(false);
  const [isDeletePopupLoading, setIsDeletePopupLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState({});

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, []);

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

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsDeletePopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header />

          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
            cards={cards}
          />

          <Footer />

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

          <ImagePopup card={selectedCard} onClose={closeAllPopups} name="image" />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
