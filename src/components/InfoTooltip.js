import Popup from "../components/Popup.js";
import success from "../images/InfoTooltip-success.svg";
import fail from "../images/InfoTooltip-fail.svg";

function InfoTooltip({ isOpen, onClose, name }) {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose}></button>
        <img className="popup__register-icon" />
        <h3 className="popup__register-title"></h3>
      </div>
    </Popup>
  );
}

export default InfoTooltip;
