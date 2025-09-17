
'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Competitor {
  name: string;
  services: string[];
}

interface ServicesChartProps {
  data: Competitor[];
}

export default function ServicesChart({ data }: ServicesChartProps) {
  const chartData = data.map(competitor => ({
    name: competitor.name,
    services: competitor.services.length,
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="services" fill="#8884d8" name="Number of Services" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
