// import { useEffect } from "react";
import useValidation from "../hooks/useValidation.js";

function Login({ name, onLogin, isLoading }) {
  const { values, errors, formValid, onChange, resetValidation } = useValidation();
  const submitButtonDisable = (isLoading || !formValid) && true;
  const submitButtonClassName = `login__submit-button ${!formValid && "login__submit-button_disabled"}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
    resetValidation();
  };

  return (
    <div className="login">
      <h2 className="login___title">Вход</h2>
      <form name={`${name}`} className="login__form" onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          value={values.email || ""}
          onChange={onChange}
          className="login__input"
          name="email"
          id="email"
          placeholder="Email"
          autoComplete="off"
          required
        />
        <span className="login__error">{errors.email}</span>
        <input
          type="password"
          value={values.password || ""}
          onChange={onChange}
          className="login__input"
          name="password"
          id="password"
          placeholder="Пароль"
          autoComplete="off"
          minLength="8"
          required
        />
        <span className="login__error">{errors.password}</span>
        <button className={submitButtonClassName} type="submit" disabled={submitButtonDisable}>
          {isLoading ? "Вход..." : "Войти"}
        </button>
      </form>
    </div>
  );
}

export default Login;
