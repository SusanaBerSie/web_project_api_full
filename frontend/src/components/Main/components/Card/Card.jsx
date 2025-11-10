import likeIcon from "../../../../images/heart.png";
import trashIcon from "../../../../images/trash.png";
import { useContext } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

export default function Card(props) {
  const { currentUser } = useContext(CurrentUserContext);
  const { name, link, likes = [], owner } = props.card;
  const { handleOpenPopup, onCardLike, onCardDelete } = props;

  const isLiked = likes.some((userId) => userId === currentUser._id);
  const isOwner = owner === currentUser._id;

  const cardLikeButtonClassName = `element__icon-like ${
    isLiked ? "element__icon-like_active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(props.card);
  }

  function handleDeleteClick() {
    onCardDelete(props.card);
  }

  return (
    <div className="element">
      <div className="element__image-box">
        <img
          src={link}
          alt=""
          className="element__image"
          onClick={() => {
            handleOpenPopup(null, name, link);
          }}
        />
        {isOwner && (
          <img
            src={trashIcon}
            alt="trash"
            className="element__icon-trash"
            onClick={handleDeleteClick}
          />
        )}
      </div>
      <div className="element-box">
        <h2 className="element__title">{name}</h2>
        <img
          src={likeIcon}
          alt="like"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        />
      </div>
    </div>
  );
}
