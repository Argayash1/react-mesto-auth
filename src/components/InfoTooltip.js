import Popup from "../components/Popup.js";

function InfoTooltip({ isOpen, onClose, name }) {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose}></button>
        <img />
        <h3></h3>
      </div>
    </Popup>
  );
}

export default InfoTooltip;
