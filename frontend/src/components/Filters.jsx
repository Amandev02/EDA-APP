import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFilterOptions } from "../api";
import "./Filters.css"; // import normal CSS

export default function Filters({ filters, setFilters }) {
  if (!filters || !setFilters) return null;

  const { data, isLoading } = useQuery({
    queryKey: ["filterOptions"],
    queryFn: fetchFilterOptions,
  });

  if (isLoading) return <div>Loading filters...</div>;

  // Helper function to clean CSV values
  const cleanOptions = (arr) =>
    (arr || [])
      .map((item) => String(item).trim()) // convert to string and trim spaces
      .filter((item) => item && item.toLowerCase() !== "nan" && item.toLowerCase()!="null"); // remove empty & NaN

  const brands = cleanOptions(data.brands);
  const packTypes = cleanOptions(data.pack_types);
  const ppgs = cleanOptions(data.ppgs);
  const channels = cleanOptions(data.channels);
  const years = cleanOptions(data.years);

  return (
    <div className="filters-container">
      <select
        value={filters.brand || ""}
        onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
        className="filters-select"
      >
        <option value="">All Brands</option>
        {brands.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>

      <select
        value={filters.pack_type || ""}
        onChange={(e) => setFilters({ ...filters, pack_type: e.target.value })}
        className="filters-select"
      >
        <option value="">All Pack Types</option>
        {packTypes.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <select
        value={filters.ppg || ""}
        onChange={(e) => setFilters({ ...filters, ppg: e.target.value })}
        className="filters-select"
      >
        <option value="">All PPG</option>
        {ppgs.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <select
        value={filters.channel || ""}
        onChange={(e) => setFilters({ ...filters, channel: e.target.value })}
        className="filters-select"
      >
        <option value="">All Channels</option>
        {channels.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        value={filters.year || ""}
        onChange={(e) => setFilters({ ...filters, year: e.target.value })}
        className="filters-select"
      >
        <option value="">All Years</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <button
        onClick={() => setFilters({})}
        className="filters-button"
      >
        Reset
      </button>
    </div>
  );
}
