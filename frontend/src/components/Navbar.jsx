import React from "react";
import { EnvelopeIcon, BellIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/logo.svg"; // adjust path if needed
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
//   const navigate = useNavigate();

  return (
    <div className="navbar">
      {/* Left side: Logo */}
      <div className="navbar-left">
        <img src={Logo} alt="Logo" className="logo" />
      </div>

      {/* Center: Tabs for navigation */}
      {/* <div className="navbar-center">
        <button className="tab-button" onClick={() => navigate("/trends")}>
          Trends
        </button>
        <button className="tab-button" onClick={() => navigate("/csf")}>
          CSF Results
        </button>
        <button className="tab-button" onClick={() => navigate("/scenario")}>
          Scenario Planning
        </button>
      </div> */}

      {/* Right side: Dashboard + Icons + Avatar */}
      <div className="navbar-right">
        <span>Dashboard</span>
        <EnvelopeIcon className="icon" />
        <BellIcon className="icon" />
        <img src="https://i.pravatar.cc/40" alt="avatar" className="avatar" />
      </div>
    </div>
  );
}
