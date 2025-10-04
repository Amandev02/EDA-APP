import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchVolumeByYear } from '../api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function VolumeByYearChart({ filters }) {
  const { data = [], isLoading, error } = useQuery({
  queryKey: ['volumeByYear', filters],
  queryFn: () => fetchVolumeByYear(filters),
  keepPreviousData: true,
});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  // Data format from backend: [{ year:2021, total_volume: 1234 }, ...]
  const chartData = (data || []).map(r => ({ year: r.year, volume: r.total_volume }));
   
   if (!chartData.length) {
    return <div>No market-share data available for the selected filters.</div>;
  }

  return (
    <div className="card">
      <h4>Volume (kg)</h4>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart layout="vertical" data={chartData}>
          <XAxis type="number" />
          <YAxis dataKey="year" type="category"  />
          
          <Tooltip formatter={(value) => `${value ? value.toLocaleString() : value} kg`} />
          <Legend />
          <Bar dataKey="volume" name="Volume" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
