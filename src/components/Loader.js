import logo from "../images/header-logo.svg";
import CircleLoader from "react-spinners/CircleLoader";
import Footer from "./Footer.js";

function Loader() {
  return (
    <div className="loader">
      <div className="loader__container">
        <img className="loader__logo" src={logo} alt="Логотип" />
        <CircleLoader
          color="#ffffff"
          className="loader__spinner"
          size={600}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <p className="loader__text">Loading...</p>
        <Footer />
      </div>
    </div>
  );
}

export default Loader;
