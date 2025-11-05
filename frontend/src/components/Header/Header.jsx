import logo from "../../images/Vector-header.png";
import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import hamburguerIcon from "../../images/group-5.png";
import closeIcon from "../../images/close-icon.png";

function Header({ isLoggedIn, onLogout }) {
  const { currentUser } = useContext(CurrentUserContext);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    onLogout();
  };

  return (
    <>
      {isLoggedIn && isMenuOpen && (
        <div className="header__hamburguer-container">
          <span className="header__hamburguer-email">{currentUser.email}</span>
          <button className="header__hamburguer-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      )}
      <header className="header">
        <img src={logo} alt="Around the US" className="header__logo" />
        <nav className="header__nav">
          {!isLoggedIn ? (
            location.pathname === "/signin" ? (
              <Link to="/signup" className="header__link">
                Regístrate
              </Link>
            ) : (
              <Link to="/signin" className="header__link">
                Inicia sesión
              </Link>
            )
          ) : (
            <>
              <div className="header__user-info">
                <span className="header__email">{currentUser.email}</span>
                <button className="header__logout" onClick={onLogout}>
                  Cerrar sesión
                </button>
              </div>
              <button
                className="header__hamburguer-icon"
                onClick={toggleMenu}
                aria-label="Menú"
              >
                <img
                  src={isMenuOpen ? closeIcon : hamburguerIcon}
                  alt={isMenuOpen ? "Cerrar menú" : "Menú"}
                />
              </button>
            </>
          )}
        </nav>
      </header>
    </>
  );
}

export default Header;
