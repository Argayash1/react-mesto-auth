// import { useEffect } from "react";
import { useEffect } from "react";
import useValidation from "../hooks/useForm.js";

function Login({ name, onLogin, isLoading }) {
  const { values, errors, formValid, onChange, resetValidation } = useValidation();
  const submitButtonDisable = (isLoading || !formValid) && true;
  const submitButtonClassName = `login__submit-button ${!formValid && "login__submit-button_disabled"}`;

  // Спасибо Вам большое за замечание про кнопку - с удовольствием с ней поработал! Единственное, что -
  // не понимаю, почему этот код работает только внутри хука useEffect7 Пробовал помещать его в функцию
  // handleSubmit, но тогда класс к кнопке добавляется сразу после нажатия на неё, при этом текст меняется
  // так, как надо. Буду очень Вам благодарен, если чуть-чуть поясните этот момент :)
  useEffect(() => {
    if (!isLoading) {
      resetValidation();
    }
  }, [isLoading, resetValidation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  return (
    <div className="login">
      <h2 className="login___title">Вход</h2>
      <form name={`${name}`} className="login__form" onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          value={values.email || ""}
          onChange={onChange}
          className={`login__input ${errors.email && "login__input_type_error"}`}
          name="email"
          id="email"
          placeholder="Email"
          autoComplete="off"
          required
        />
        <span className={`login__error ${errors.email && "login__error_visible"}`}>{errors.email}</span>
        <input
          type="password"
          value={values.password || ""}
          onChange={onChange}
          className={`login__input ${errors.password && "login__input_type_error"}`}
          name="password"
          id="password"
          placeholder="Пароль"
          autoComplete="off"
          minLength="8"
          required
        />
        <span className={`login__error ${errors.password && "login__error_visible"}`}>{errors.password}</span>
        <button className={submitButtonClassName} type="submit" disabled={submitButtonDisable}>
          {isLoading ? "Вход..." : "Войти"}
        </button>
      </form>
    </div>
  );
}

export default Login;
