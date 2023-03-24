import logo from "../images/header-logo.svg";

function Header({ loggedIn }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <p>Войти</p>
    </header>
  );
}

export default Header;
