// ./components/MarketShareDonut.jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMarketShare } from '../api';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7f7f', '#a28bd4',
  '#4bc0c0', '#f67019', '#c9c9ff', '#7bd389', '#ffb6c1'
];

const TOP_N = 8; // show top N slices, rest -> "Other"

export default function MarketShareDonut({ filters = {} }) {
  const { data: raw = [], isLoading, error } = useQuery({
    queryKey: ['marketShare', filters],
    queryFn: () => fetchMarketShare(filters),
    keepPreviousData: true,
  });

  // Debug output — open DevTools Console to inspect
  React.useEffect(() => {
    console.debug('MarketShare raw response:', raw);
  }, [raw]);

  if (isLoading) return <div>Loading Market Share...</div>;
  if (error) return <div>Error loading market share: {error?.message ?? String(error)}</div>;

  // Normalize backend rows. Handles shapes like:
  // { brand: 'A', value: 123 } or { brand: 'A', total_sales: 123 } or { name: 'A', sales_value: 123 }
  const normalized = (Array.isArray(raw) ? raw : []).map(row => {
    const name = (row.brand ?? row.name ?? row.label ?? 'Unknown');
    const value = Number(row.value ?? row.total_sales ?? row.sales_value ?? row.volume ?? 0) || 0;
    return { name: String(name).trim() || 'Unknown', value };
  })
  .filter(r => r.value > 0)
  .sort((a, b) => b.value - a.value);

  if (!normalized.length) {
    return <div>No market-share data available for the selected filters.</div>;
  }

  // collapse into top N + "Other" if needed
  let displayData = normalized;
  if (normalized.length > TOP_N) {
    const top = normalized.slice(0, TOP_N);
    const othersSum = normalized.slice(TOP_N).reduce((s, x) => s + x.value, 0);
    displayData = [...top, { name: 'Other', value: othersSum }];
  }

  return (
    <div className="card">
      <h4>Market Share (by Brand)</h4>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={displayData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          >
            {displayData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => (typeof value === 'number' ? value.toLocaleString() : value)} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
