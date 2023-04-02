import { Routes, Route, NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

function Navbar({ loggedIn, onSignOut, userEmail, isOpen, onMobileMenu, onClose, isLoading }) {
  return (
    <nav className="navbar">
      <ul className="header__navlist">
        <Routes>
          {loggedIn && !isLoading && (
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
                  {!isOpen && <AiOutlineMenu className="header__navlist-button" size="30" onClick={onMobileMenu} />}
                  {isOpen && <AiOutlineClose className="header__navlist-button" size="30" onClick={onClose} />}
                </li>
              }
            />
          )}
          <Route
            path="/sign-in"
            element={
              <li className="header__navlist-item">
                <NavLink className="header__navlink" to="/sign-up">
                  Регистрация
                </NavLink>
              </li>
            }
          />
          <Route
            path="/sign-up"
            element={
              <li className="header__navlist-item">
                <NavLink className="header__navlink" to="/sign-in">
                  Войти
                </NavLink>
              </li>
            }
          />
        </Routes>
      </ul>
    </nav>
  );
}

export default Navbar;
