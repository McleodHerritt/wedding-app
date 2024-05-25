import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Header.css";
import image from "../../assets/engagment-1.jpg";

const Header = () => {
  const navigate = useNavigate();

  const handleRsvpClick = () => {
    navigate("/rsvp");
  };
  const headerStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    zIndex: 1,
    position: "relative",
  };

  return (
    <header className="header" style={headerStyle}>
      <div className="header__left">
        <h1 className="title">Randy & Nicole's Wedding</h1>
        <button className="RSVP" onClick={handleRsvpClick}>
          RSVP
        </button>
      </div>
      <div className="header__right">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/rsvp">RSVP</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/invitation">Invitation</Link>
            </li>
            <li>
              <Link to="/couples-info">Couples Info</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
