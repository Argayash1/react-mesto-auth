import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth.js";
import useValidation from "../hooks/useValidation.js";

const Register = ({ name }) => {
  const navigate = useNavigate();
  const { values, errors, formValid, onChange } = useValidation();
  const submitButtonDisable = !formValid && true;

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = values;
    auth.register(password, email).then((res) => {
      navigate("/sign-in", { replace: true });
    });
  };

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form" name={`${name}`} onSubmit={handleSubmit} noValidate>
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
      <div className="register__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__signin-link">
          Войти
        </Link>
      </div>
    </div>
  );
};

export default Register;
