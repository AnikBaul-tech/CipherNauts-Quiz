import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider.jsx";
import "../../StyleSheet/Header.css";

const Header = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  return (
    <header className="header">
      <div className="header-left">
        <h2>
          Welcome,
          <span className="username">
            {" "}
            {user?.displayName || user?.name || "User"}
          </span>
        </h2>
      </div>

      <div className="header-right">
        <button
          className="home-btn"
          onClick={() => navigate("/home")}
        >
          Home
        </button>
      </div>
    </header>
  );
};

export default Header;