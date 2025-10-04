import React from "react";
import "./Footer.css"; // separate CSS for footer

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} My Dashboard. All rights reserved.</p>
        <p>
          Built with React & Recharts | <a href="https://github.com/">GitHub</a>
        </p>
      </div>
    </footer>
  );
}
