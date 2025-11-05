export default function ImagePopup(props) {
  const { name, link } = props;
  return (
    <>
      <div className="popup__image">
        <img className="popup__photo" src={link} alt={name || "Imagen"} />
        <p className="popup__photo-title">{name}</p>
      </div>
    </>
  );
}
