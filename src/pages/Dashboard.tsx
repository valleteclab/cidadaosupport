import React from 'react';
import { BarChart, Users, Clock, CheckCircle } from 'lucide-react';
import TicketStats from '../components/dashboard/TicketStats';
import RecentTickets from '../components/dashboard/RecentTickets';
import CategoryDistribution from '../components/dashboard/CategoryDistribution';

const Dashboard: React.FC = () => {
  const stats = [
    { name: 'Total de Chamados', value: '148', icon: BarChart, change: '+12.5%', changeType: 'increase' },
    { name: 'Em Andamento', value: '32', icon: Clock, change: '-4.1%', changeType: 'decrease' },
    { name: 'Resolvidos', value: '112', icon: CheckCircle, change: '+28.3%', changeType: 'increase' },
    { name: 'Média de Satisfação', value: '4.8', icon: Users, change: '+3.2%', changeType: 'increase' },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                          <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                            stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stat.change}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TicketStats />
          <CategoryDistribution />
        </div>

        <div className="mt-8">
          <RecentTickets />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;