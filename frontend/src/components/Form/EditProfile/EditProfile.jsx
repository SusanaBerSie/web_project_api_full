import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

export default function EditProfile(props) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUser(name, description);
  }

  return (
    <>
      <form
        className="popup__form popup__form-profile"
        name="form-profile"
        noValidate
        onSubmit={handleSubmit}
      >
        <fieldset className="popup__fieldset">
          <input
            type="text"
            className="popup__input popup__input_type_error"
            id="nameInput"
            name="name"
            placeholder="Nombre"
            required
            minLength="2"
            maxLength="40"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className="input__error nameInput-error"></span>
          <input
            type="text"
            className="popup__input popup__input_type_error"
            id="aboutmeInput"
            name="aboutme"
            placeholder="Acerca de mí"
            required
            minLength="2"
            maxLength="200"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <span className="input__error aboutmeInput-error"> </span>
        </fieldset>
        <fieldset className="popup__button">
          <button type="submit" className="popup__button-item">
            Guardar
          </button>
        </fieldset>
      </form>
    </>
  );
}
