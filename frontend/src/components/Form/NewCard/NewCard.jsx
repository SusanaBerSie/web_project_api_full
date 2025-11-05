import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

export default function NewCard({ onAddCard }) {
  const { handleAddCard } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !link) {
      alert("Campo requerido");
      return;
    }
    const urlRegex =
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    if (!urlRegex.test(link)) {
      alert("La URL no es válida");
      return;
    }
    handleAddCard(name, link);
  }

  return (
    <>
      <form
        className="popup__form"
        name="form-card"
        id="new-card-form"
        onSubmit={handleSubmit}
      >
        <fieldset className="popup__fieldset">
          <input
            required
            type="text"
            className="popup__input popup__input_type_error"
            id="photoTitleInput"
            name="title"
            placeholder="Title"
            minLength="2"
            maxLength="30"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className="input__error" id="card-name-error"></span>
        </fieldset>
        <fieldset className="popup__fieldset">
          <input
            required
            type="url"
            className="popup__input popup__input_type_error"
            id="photoUrlInput"
            name="url"
            placeholder="URL de la foto"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <span className="input__error" id="card-link-error"></span>
        </fieldset>
        <fieldset className="popup__button">
          <button type="submit" className="button popup__button-item">
            Guardar
          </button>
        </fieldset>
      </form>
    </>
  );
}
