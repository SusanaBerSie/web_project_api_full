import { useState } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { loginUser } from "../../utils/auth";

export default function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email: email, password: password });
  };

  return (
    <div>
      <div className="login">
        <form noValidate onSubmit={handleSubmit}>
          <p className="login__title">Inicia sesión</p>
          <fieldset className="login__inputs">
            <input
              type="text"
              className="login__form login__input_type_error"
              id="emailInput"
              name="email"
              placeholder="Correo electrónico"
              required
              minLength="2"
              maxLength="40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="input__error emailInput-error"></span>
            <input
              type="password"
              className="login__form login__input_type_error"
              id="passwordInput"
              name="password"
              placeholder="Contraseña"
              required
              minLength="2"
              maxLength="200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="input__error passwordInput-error"> </span>
          </fieldset>
          <fieldset className="login__button">
            <button type="submit" className="login__button-item">
              Inicia sesión
            </button>
          </fieldset>
        </form>

        <div className="login__signin">
          <p className="login__signin-letter">¿Aún no eres miembro?</p>
          <Link to="/signup" className="login__signin-link">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
