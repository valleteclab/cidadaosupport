import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', tickets: 65 },
  { name: 'Fev', tickets: 59 },
  { name: 'Mar', tickets: 80 },
  { name: 'Abr', tickets: 81 },
  { name: 'Mai', tickets: 56 },
  { name: 'Jun', tickets: 55 },
  { name: 'Jul', tickets: 40 },
];

const TicketStats: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900">Evolução de Chamados</h3>
      <div className="mt-6" style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="tickets" stroke="#3B82F6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TicketStats;