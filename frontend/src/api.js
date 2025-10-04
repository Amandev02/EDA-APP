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
