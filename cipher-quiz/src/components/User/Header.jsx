import React from "react";
import { useNavigate } from "react-router-dom";
import { FiHome, FiMoon, FiSun } from "react-icons/fi";

import { useAuth } from "../../context/AuthProvider";
import { useTheme } from "../../context/ThemeProvider";

import "../../StyleSheet/Header.css";

const Header = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-left">
        <p className="welcome-text">Welcome back,</p>

        <h2 className="username">{user?.displayName}</h2>
      </div>

      <div className="header-right">
        <button className="icon-btn" onClick={toggleTheme}>
          {theme === "light" ? <FiMoon /> : <FiSun />}
        </button>

        <button className="primary-btn" onClick={() => navigate("/home")}>
          <FiHome />
          Home
        </button>
      </div>
    </header>
  );
};

export default Header;
