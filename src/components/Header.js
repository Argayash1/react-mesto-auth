import { Routes, Route, NavLink } from "react-router-dom";
import logo from "../images/header-logo.svg";

function Header({ loggedIn, onSignOut, userEmail }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <nav>
        <Routes>
          {loggedIn && (
            <Route
              path="/"
              element={
                <>
                  <span className="header__usermail">{userEmail}</span>
                  <button onClick={onSignOut} className="header__button">
                    Выйти
                  </button>
                </>
              }
            />
          )}
          <Route
            path="/sign-in"
            element={
              <NavLink className="header__navlink" to="/sign-up">
                Регистрация
              </NavLink>
            }
          />
          <Route
            path="/sign-up"
            element={
              <NavLink className="header__navlink" to="/sign-in">
                Войти
              </NavLink>
            }
          />
        </Routes>
      </nav>
    </header>
  );
}

export default Header;
