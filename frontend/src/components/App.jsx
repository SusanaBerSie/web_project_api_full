import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Popup from "./Popup/Popup";
import ImagePopup from "./Form/ImagePopup/ImagePopup";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";
import Login from "./Login/Login";
import Register from "./Register/Register";
import successLogo from "../images/success.png";
import failLogo from "../images/fail.png";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [, setName] = useState(null);
  const [, setLink] = useState();
  const [toolTip, setToolTip] = useState({
    isOpen: false,
    isSuccess: false,
    message: "",
    logo: "",
  });
  const [token, setToken] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser({ ...currentUser, email: res.data.email });
          navigate("/");
        })
        .catch(() => {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        });
    }
  }, [token]);

  useEffect(() => {
    if (isLoggedIn) {
      api.getUserInfo().then((res) => {
        setCurrentUser({
          ...currentUser,
          name: res.name,
          about: res.about,
          _id: res._id,
          avatar: res.avatar,
        });
        console.log(res);
      });
      api
        .getInitialCards()
        .then((res) => {
          console.log(res);
          setCards(res);
        })
        .catch((error) => {
          console.error("Error al cargar las tarjetas:", error);
        });
    }
  }, [isLoggedIn]);

  /*  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  },[]); */

  const handleLogin = async ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    try {
      const data = await auth.loginUser(email, password);
      if (data.token) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        setCurrentUser(data.user || {});
        navigate("/");
        setToolTip({
          isOpen: true,
          isSuccess: true,
          message: "¡Correcto! Ya estás registrado.",
          logo: successLogo,
        });
        setToken(data.token);
      }
    } catch (error) {
      console.error("Error en login", error);
      setToolTip({
        isOpen: true,
        isSuccess: false,
        message: "Uy, algo salió mal. Por favor, inténtalo de nuevo.",
        logo: failLogo,
      });
    }
  };

  const handleRegister = async ({ email, password }) => {
    console.log(email, password);
    if (!email || !password) {
      return;
    }
    try {
      await auth.registerUser(email, password);
      setToolTip({
        isOpen: true,
        isSuccess: true,
        message: "¡Correcto! Ya estás registrado.",
        logo: successLogo,
      });
    } catch (error) {
      console.error("Error en registro", error);
      setToolTip({
        isOpen: true,
        isSuccess: false,
        message: "Uy, algo salió mal. Por favor, inténtalo de nuevo.",
        logo: failLogo,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser({});
    setCards([]);
    navigate("/signin");
  };

  const handleUpdateAvatar = async function (avatar) {
    await api
      .switchPhotoProfile(avatar)
      .then((res) => {
        setCurrentUser(res);
        handleClosePopup();
      })
      .catch((error) => {
        console.error("Error al actualizar foto de perfil:", error);
      });
  };

  async function handleUpdateUser(name, description) {
    await api
      .editProfile(name, description)
      .then((res) => {
        setCurrentUser(res);
        handleClosePopup();
      })
      .catch((error) => {
        console.error("Error al actualizar el perfil:", error);
      });
  }

  async function handleCardLike(card) {
    const isLiked = card.isLiked;
    await api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
    await api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)
        );
      })
      .catch((error) => {
        console.error("Error al eliminar la tarjeta:", error);
      });
  }

  async function handleAddCard(name, link) {
    await api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards((prevCards) => [newCard, ...prevCards]);
        handleClosePopup();
      })
      .catch((error) => {
        console.error("Error al añadir tarjeta:", error);
      });
  }

  function handleOpenPopup(popup, imageName, imageLink) {
    console.log(popup);
    if (imageName && imageLink) {
      setName(imageName);
      setLink(imageLink);
      const updatedImageComponent = {
        children: <ImagePopup name={imageName} link={imageLink} />,
      };
      setPopup(updatedImageComponent);
    } else {
      setPopup(popup);
    }
  }

  function handleClosePopup() {
    setPopup(null);
    setName(null);
    setLink(null);
  }

  const handleCloseToolTip = () => {
    setToolTip({
      isOpen: false,
      isSuccess: false,
      message: "",
      logo: "",
    });
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddCard,
        handleLogout,
        isLoggedIn,
      }}
    >
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/signup"
          element={<Register handleRegister={handleRegister} />}
        />
        <Route
          exact
          path="/signin"
          element={<Login handleLogin={handleLogin} />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <>
                <Main
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onAddCard={handleAddCard}
                  handleOpenPopup={handleOpenPopup}
                />

                {popup && (
                  <Popup onClose={handleClosePopup} title={popup.title}>
                    {popup.children}
                  </Popup>
                )}
              </>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div>Página no encontrada</div>} />
      </Routes>
      {toolTip.isOpen && (
        <InfoTooltip
          message={toolTip.message}
          logo={toolTip.logo}
          onClose={handleCloseToolTip}
        />
      )}
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
