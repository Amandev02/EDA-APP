import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Filters from "../components/Filters";
import {
  fetchBrandTrend,
  fetchYoYGrowth,
} from "../api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function Trends() {
  const [filters, setFilters] = useState({});

  // Fetch Brand Trend Data
  const { data: brandData = [], isLoading: loadingBrand } = useQuery({
    queryKey: ["brandTrend", filters],
    queryFn: () => fetchBrandTrend(filters),
  });

  // Fetch YoY Growth Data
  const { data: yoyData = [], isLoading: loadingYoY } = useQuery({
    queryKey: ["yoyGrowth", filters],
    queryFn: () => fetchYoYGrowth(filters),
  });

  if (loadingBrand || loadingYoY) return <div>Loading Trends...</div>;

  // Prepare pie chart data — sum up brand totals for a clean pie
  const brandTotals = {};
  brandData.forEach((entry) => {
    Object.entries(entry).forEach(([key, value]) => {
      if (key !== "month") brandTotals[key] = (brandTotals[key] || 0) + value;
    });
  });
  const pieData = Object.entries(brandTotals).map(([brand, total]) => ({
    name: brand,
    value: total,
  }));

  return (
    <div className="trends-container">
      <div className="header">
        <h1>Trends</h1>
      </div>

      <Filters filters={filters} setFilters={setFilters} />

      <div className="charts-grid">
        {/* Brand Performance (Pie Chart) */}
        <div className="chart-card">
          <h4>Brand Performance Over Time</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((_, idx) => (
                  <Cell key={idx} fill={getColor(idx)} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Year-over-Year Growth (Line Chart) */}
        <div className="chart-card">
          <h4>Year-over-Year Growth</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={yoyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="growth" stroke="#10B981" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// Chart color palette
const colors = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
  "#F97316",
];

function getColor(index) {
  return colors[index % colors.length];
}
