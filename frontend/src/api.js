import axios from 'axios';

const BASE = 'http://127.0.0.1:8000/api';

function buildParams(filters) {
  const params = new URLSearchParams();
  if(!filters) return params;
  Object.keys(filters).forEach(k => {
    if (filters[k] !== undefined && filters[k] !== '') params.append(k, filters[k]);
  });
  return params;
}

export const fetchVolumeByYear = async (filters) => {
  const params = buildParams(filters);
  const res = await axios.get(`${BASE}/volume-by-year/?${params.toString()}`);
  return res.data;
};

export const fetchSalesByYear = async (filters) => {
  const params = buildParams(filters);
  const res = await axios.get(`${BASE}/sales-by-year/?${params.toString()}`);
  return res.data;
};

export const fetchMonthlyTrend = async (filters) => {
  const params = buildParams(filters);
  const res = await axios.get(`${BASE}/monthly-trend/?${params.toString()}`);
  return res.data;
};

export const fetchFilterOptions = async () => {
  const res = await axios.get(`${BASE}/filter-options/`);
  return res.data;
};

export const fetchMarketShare = async (filters, measure='sales') => {
  const params = buildParams(filters);
  params.append('measure', measure);
  const res = await axios.get(`${BASE}/market-share/?${params.toString()}`);
  return res.data;
};

// Brand trend (pivoted per-month objects)
export const fetchBrandTrend = async (filters) => {
  const params = buildParams(filters);
  const res = await axios.get(`${BASE}/brand-trend/?${params.toString()}`);
  return res.data;
};

// Market share trend — Trends.jsx expects "marketShareData" shape similar to brandData
// We support measure param (sales or volume). Defaults to 'sales'.
export const fetchMarketShareTrend = async (filters, measure = 'sales') => {
  const params = buildParams(filters);
  params.append('measure', measure);
  // your existing endpoint looked like /market-share/ — keep that
  const res = await axios.get(`${BASE}/market-share/?${params.toString()}`);
  return res.data;
};

// Year-over-year growth
export const fetchYoYGrowth = async (filters) => {
  const params = buildParams(filters);
  // backend endpoint: /yoy-growth/
  const res = await axios.get(`${BASE}/yoy-growth/?${params.toString()}`);
  return res.data;
};