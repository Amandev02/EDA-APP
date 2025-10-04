import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./header.css"; // optional CSS for tabs

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // Map route paths to headings
  const headings = {
    "/trends": "Trends",
    "/csf": "Consumer Surplus Factor (CSF)",
    "/scenario": "Scenario Planning",
    "/": "Home", // default
  };

  const currentHeading = headings[location.pathname] || "Dashboard";

  return (
    <div className="header">
      <h1>{currentHeading}</h1>
      <div className="tabs">
        <button className="tab-button" onClick={() => navigate("/trends")}>
          Trends
        </button>
        <button className="tab-button" onClick={() => navigate("/csf")}>
          CSF Results
        </button>
        <button className="tab-button" onClick={() => navigate("/scenario")}>
          Scenario Planning
        </button>
      </div>
    </div>
  );
}
