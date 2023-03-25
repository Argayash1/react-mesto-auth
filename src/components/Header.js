import logo from "../images/header-logo.svg";

function Header({ loggedIn, onSignOut }) {
  const navElement = loggedIn ? <button onClick={onSignOut}>Выйти</button> : <p>Войти</p>;
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <nav>{navElement}</nav>
    </header>
  );
}

export default Header;
