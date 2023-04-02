import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faUserCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import illiniLogo from "/src/assets/block-i.png";
import "./Header.css";

function Header({ isAuthenticated, setIsAuthenticated, user }) {
  return (
    <header className="header">
      <a href="/">
        <img src={illiniLogo} alt="Logo" className="header__logo" />
      </a>
      <nav className="header-nav">
        <a href="/about">
          <FontAwesomeIcon icon={faInfoCircle} className="header__about-icon" />
        </a>
        <a href={isAuthenticated ? "/profile" : "/login"}>
          <FontAwesomeIcon
            icon={faUserCircle}
            className="header__profile-icon"
          />
        </a>
        <a href="/settings">
          <FontAwesomeIcon icon={faCog} className="header__settings-icon" />
        </a>
      </nav>
    </header>
  );
}

export default Header;
