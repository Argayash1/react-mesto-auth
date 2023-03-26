import logo from "../images/header-logo.svg";

function Header({ loggedIn, onSignOut, userEmail }) {
  const navElement = loggedIn ? (
    <button onClick={onSignOut} className="header__button">
      Выйти
    </button>
  ) : (
    <p>Войти</p>
  );
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <nav>
        <span>{userEmail}</span>
        {navElement}
      </nav>
    </header>
  );
}

export default Header;
