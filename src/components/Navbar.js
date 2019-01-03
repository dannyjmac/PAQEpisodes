import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <img src={require("../logo.png")} width="150px" />
      </div>
      <div className="navbar__links">
        <NavLink to="/">EPISODES</NavLink>
      </div>
      <div className="navbar__links">
        <NavLink to="/stats">STATS</NavLink>
      </div>
    </div>
  );
};
