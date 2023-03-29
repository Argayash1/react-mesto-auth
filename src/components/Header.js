import { Routes, Route, NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import logo from "../images/header-logo.svg";

function Header({ loggedIn, onSignOut, userEmail, isOpen, onMobileMenu, onClose }) {
  return (
    <header className={`header ${isOpen && "header_is-enlarged"}`}>
      <img className="header__logo" src={logo} alt="Логотип" />
      <nav>
        <ul className="header__navlist">
          <Routes>
            {loggedIn && (
              <Route
                path="/"
                element={
                  <li className="header__navlist-item">
                    <div className={`header__navlist-elements ${isOpen && "header__navlist-elements_is-active"}`}>
                      <span className="header__usermail">{userEmail}</span>
                      <button onClick={onSignOut} className="header__button">
                        Выйти
                      </button>
                    </div>
                    {!isOpen && <AiOutlineMenu className="header__navlist-button" size="24" onClick={onMobileMenu} />}
                    {isOpen && <AiOutlineClose className="header__navlist-button" size="20" onClick={onClose} />}
                  </li>
                }
              />
            )}
            <Route
              path="/sign-in"
              element={
                <li>
                  <NavLink className="header__navlink" to="/sign-up">
                    Регистрация
                  </NavLink>
                </li>
              }
            />
            <Route
              path="/sign-up"
              element={
                <li>
                  <NavLink className="header__navlink" to="/sign-in">
                    Войти
                  </NavLink>
                </li>
              }
            />
          </Routes>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
