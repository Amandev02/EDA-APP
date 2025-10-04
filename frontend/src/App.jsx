import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Filters from "./components/Filters";
import VolumeByYearChart from "./components/VolumeByYearChart";
import MonthlyTrendChart from "./components/MonthlyTrendChart";
import SalesByYearChart from "./components/SalesByYearChart";
import MarketShareDonut from "./components/MarketShareDonut";

import Navbar from "./components/Navbar";


// Page components
import CSF from "./pages/CSF";
import Trends from "./pages/Trends";
import ScenarioPlanning from "./pages/ScenarioPlanning";
import Footer from "./components/footer";
import Header from "./components/Header";

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Header/>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Trends />} /> {/* Default Home Page */}
            <Route path="/csf" element={<CSF />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/scenario" element={<ScenarioPlanning />} />
          </Routes>
        </div>

        <Footer/>
      </div>
    </Router>
  );
}
