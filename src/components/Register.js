import useValidation from "../hooks/useValidation.js";

function Register({ name }) {
  const { values, errors, formValid, onChange, resetValidation } = useValidation();
  const submitButtonDisable = formValid && true;

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form" name={`${name}`} noValidate>
        <input
          type="email"
          value={values.email || ""}
          onChange={onChange}
          className="register__input"
          name="email"
          id="email"
          placeholder="Email"
          autoComplete="off"
          required
        />
        <span className="register__error">{errors.email}</span>
        <input
          type="password"
          value={values.password || ""}
          onChange={onChange}
          className="register__input"
          name="password"
          id="password"
          placeholder="Пароль"
          autoComplete="off"
          minlength="8"
          required
        />
        <span className="register__error">{errors.password}</span>
        <button className="register__submit-button" type="submit" disabled={submitButtonDisable}>
          Зарегистрироваться
        </button>
      </form>
      <p className="register__registered">
        Уже зарегистрированы?{" "}
        <a href="#" className="register__sign-in">
          Войти
        </a>
      </p>
    </div>
  );
}

export default Register;
