import React from 'react';
import { Users, Settings, Bell, Activity } from 'lucide-react';

const stats = [
  { name: 'Usuários Ativos', value: '2,543', icon: Users },
  { name: 'Categorias', value: '12', icon: Settings },
  { name: 'Webhooks Ativos', value: '8', icon: Bell },
  { name: 'Taxa de Resolução', value: '94%', icon: Activity },
];

const AdminStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;