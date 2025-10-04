import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Filters from "../components/Filters";
import SalesByYearChart from "../components/SalesByYearChart";
import VolumeByYearChart from "../components/VolumeByYearChart";
import MonthlyTrendChart from "../components/MonthlyTrendChart";
import MarketShareDonut from "../components/MarketShareDonut";
import './csf.css';

export default function CSF() {
  const [filters, setFilters] = useState({});
 // const navigate = useNavigate();

  return (
    <>

      {/* Filters and Charts */}
      <div className="csf-container">
        <Filters filters={filters} setFilters={setFilters} />
        <div className="charts-grid">
                 <div className="chart-card">
                   <SalesByYearChart filters={filters} />
                 </div>
                 <div className="chart-card">
                   <VolumeByYearChart filters={filters} />
                 </div>
                 <div className="chart-card">
                   <MonthlyTrendChart filters={filters} />
                 </div>
                 <div className="chart-card">
                   <MarketShareDonut filters={filters} />
                 </div>
               </div>
      </div>
    </>
  );
}
