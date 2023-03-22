import { useRef, useEffect } from "react";
import useValidation from "../hooks/useValidation.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading, name }) {
  const ref = useRef(); // записываем объект, возвращаемый хуком, в переменную
  const { values, errors, formValid, onChange, resetValidation } = useValidation(); // данные для валидации

  useEffect(() => {
    resetValidation();
    ref.current.value = "";
  }, [isOpen, resetValidation]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: ref.current.value,
    });
  }

  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <PopupWithForm
        title="Обновить аватар"
        name={name}
        onClose={onClose}
        onSubmit={handleSubmit}
        submitButtonText={isLoading ? "Сохранение..." : "Сохранить"}
        isLoading={isLoading}
        isValid={!formValid}
      >
        <input
          type="url"
          ref={ref}
          value={values.url || ""}
          onChange={onChange}
          id="image-url"
          className={`popup__input ${errors.url && "popup__input_type_error"}`}
          name="url"
          placeholder="Ссылка на картинку"
          autoComplete="off"
          required
        />
        <span className={`popup__error ${errors.url && "popup__error_visible"}`} id="image-url-error">
          {errors.url}
        </span>
      </PopupWithForm>
    </Popup>
  );
}

export default EditAvatarPopup;
