import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSalesByYear } from '../api';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function SalesByYearChart({ filters }) {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ['salesByYear', filters],
    queryFn: () => fetchSalesByYear(filters),
    keepPreviousData: true,
  });

  if (isLoading) return <div>Loading Sales by Year...</div>;
  if (error) return <div>Error loading sales data</div>;

  // Expect backend items like { year: 2023, total_sales: 12345 }
  const chartData = (data || []).map((row) => ({
    year: row.year,
    total_sales: row.total_sales ?? row.sales_value ?? 0,
  }));

   if (!chartData.length) {
    return <div>No market-share data available for the selected filters.</div>;
  }


  return (
    <div className="card">
      <h4>Sales By Year</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
           <YAxis
      tickFormatter={(value) => (value >= 1000000 ? `${value / 1000000}M` : value)}
    />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_sales" name="Total Sales" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
