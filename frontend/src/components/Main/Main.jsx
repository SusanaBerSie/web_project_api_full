import { useContext } from "react";
import NewCard from "../Form/NewCard/NewCard";
import EditAvatar from "../Form/EditAvatar/EditAvatar";
import EditProfile from "../Form/EditProfile/EditProfile";
import Card from "./components/Card/Card";
import ImagePopup from "../Form/ImagePopup/ImagePopup";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";

export default function Main(props) {
  const { currentUser } = useContext(CurrentUserContext);
  const { handleOpenPopup } = props;

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard />,
  };
  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  const imageComponent = { children: <ImagePopup /> };

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__box-info">
          <div
            className="profile__avatar"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          >
            <img className="profile__avatar-photo" src={currentUser.avatar} />
          </div>
          <div className="profile__box">
            <div className="profile__info">
              <h1 className="profile__info-name"> {currentUser.name} </h1>
              <h2 className="profile__info-subtitle">{currentUser.about}</h2>
            </div>
            <button
              className="profile__info-edit"
              id="open-edit-profile"
              aria-label="edit profile"
              type="button"
              onClick={() => handleOpenPopup(editProfilePopup)}
            ></button>
          </div>
        </div>
        <button
          className="profile__add-button"
          aria-label="Add card"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
        ></button>
      </section>
      <section className="elements">
        {props &&
          props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={() =>
                handleOpenPopup(imageComponent, card.name, card.link)
              }
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
      </section>
    </main>
  );
}
