import { useState } from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { registerUser } from "../../utils/auth";

export default function Register({ handleRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(data);
  };

  return (
    <div>
      <div className="register">
        <form noValidate onSubmit={handleSubmit}>
          <p className="register__title">Regístrate</p>
          <fieldset className="register__inputs">
            <input
              type="text"
              className="register__form register__input_type_error"
              id="emailInput"
              name="email"
              placeholder="Correo electrónico"
              required
              minLength="2"
              maxLength="40"
              value={data.email}
              onChange={(e) => handleChange(e)}
            />
            <span className="input__error emailInput-error"></span>
            <input
              type="password"
              className="register__form register__input_type_error"
              id="passwordInput"
              name="password"
              placeholder="Contraseña"
              required
              minLength="2"
              maxLength="200"
              value={data.password}
              onChange={(e) => handleChange(e)}
            />
            <span className="input__error passwordInput-error"> </span>
          </fieldset>
          <fieldset className="register__button">
            <button type="submit" className="register__button-item">
              Regístrate
            </button>
          </fieldset>
        </form>

        <div className="register__signup">
          <p className="register__signup-letter">¿Ya eres miembro?</p>
          <Link to="/signin" className="register__signup-link">
            Inicia sesión aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
