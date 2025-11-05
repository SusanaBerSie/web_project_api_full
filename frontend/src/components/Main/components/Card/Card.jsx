import likeIcon from "../../../../images/heart.png";
import trashIcon from "../../../../images/trash.png";

export default function Card(props) {
  const { name, link, isLiked } = props.card;
  const { handleOpenPopup, onCardLike, onCardDelete } = props;

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
        <img
          src={trashIcon}
          alt="trash"
          className="element__icon-trash"
          onClick={handleDeleteClick}
        />
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
