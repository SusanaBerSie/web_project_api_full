import { useRef, useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

export default function EditAvatar(props) {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const avatar = avatarRef.current.value;
    handleUpdateAvatar(avatar);
  }
  return (
    <>
      <form
        className="popup__form popup__form-newPhotoProfile"
        name="form-newPhotoProfile"
        noValidate
        onSubmit={handleSubmit}
      >
        <fieldset className="popup__confirm-fieldset">
          <input
            required
            type="url"
            className="popup__input popup__input_type_error"
            id="photoProfileUrlInput"
            name="url"
            placeholder="URL de la foto"
            ref={avatarRef}
          />
          <span className="input__error photoUrlInput-error"></span>
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
