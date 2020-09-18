import React from "react";

const NavbarCalendar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">César</span>
      <button className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt"></i>
        <span> Logout</span>
      </button>
    </div>
  );
};

export default NavbarCalendar;
