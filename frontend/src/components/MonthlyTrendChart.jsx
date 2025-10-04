import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMonthlyTrend } from '../api';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';

export default function MonthlyTrendChart({ filters }) {
  const { data = [], isLoading } = useQuery({
  queryKey: ['monthlyTrend', filters],
  queryFn: () => fetchMonthlyTrend(filters),
  keepPreviousData: true,
});
  if (isLoading) return <div>Loading...</div>;

  // backend returns items with { year: 2023, month: 1, total_sales: 1234 }
  const chartData = (data || []).map(item => {
    const label = `${item.year}-${String(item.month).padStart(2,'0')}`; // "2023-01"
    return { name: dayjs(label + '-01').format('MMM YYYY'), sales: item.total_sales };
  });

  if (!chartData.length) {
    return <div>No market-share data available for the selected filters.</div>;
  }

  return (
    <div className="card">
      <h4>Monthly Sales Trend</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis
      tickFormatter={(value) => (value >= 1000 ? `${value / 1000}k` : value)}
    />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
