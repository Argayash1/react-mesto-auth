import { Routes, Route, NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

function Navbar({ loggedIn, onSignOut, userEmail, isOpen, onMobileMenu, onClose, isLoading }) {
  return (
    <nav className="navbar">
      <ul className="navbar__navlist">
        <Routes>
          {loggedIn && !isLoading && (
            <Route
              path="/"
              element={
                <li className="navbar__navlist-item">
                  <div className={`navbar__navlist-elements ${isOpen && "navbar__navlist-elements_is-active"}`}>
                    <span className="navbar__usermail">{userEmail}</span>
                    <button onClick={onSignOut} className="navbar__button">
                      Выйти
                    </button>
                  </div>
                  {!isOpen && <AiOutlineMenu className="navbar__navlist-button" size="30" onClick={onMobileMenu} />}
                  {isOpen && <AiOutlineClose className="navbar__navlist-button" size="30" onClick={onClose} />}
                </li>
              }
            />
          )}
          <Route
            path="/sign-in"
            element={
              <li className="navbar__navlist-item">
                <NavLink className="navbar__navlink" to="/sign-up">
                  Регистрация
                </NavLink>
              </li>
            }
          />
          <Route
            path="/sign-up"
            element={
              <li className="navbar__navlist-item">
                <NavLink className="navbar__navlink" to="/sign-in">
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
