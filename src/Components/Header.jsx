import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import illiniLogo from "/src/assets/block-i.png";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <a href="/">
        <img src={illiniLogo} alt="Logo" className="header__logo" />
      </a>
      <a href="/settings">
        <FontAwesomeIcon icon={faCog} className="header__settings-icon" />
      </a>
    </header>
  );
}

export default Header;
