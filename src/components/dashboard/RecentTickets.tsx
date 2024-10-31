import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';

const tickets = [
  {
    id: '1',
    title: 'Buraco na Rua Principal',
    category: 'Infraestrutura',
    status: 'open',
    priority: 'high',
    createdAt: '2024-03-10T10:00:00',
  },
  {
    id: '2',
    title: 'Falta de Iluminação',
    category: 'Serviços Públicos',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2024-03-09T15:30:00',
  },
  {
    id: '3',
    title: 'Lixo não Coletado',
    category: 'Serviços Públicos',
    status: 'resolved',
    priority: 'low',
    createdAt: '2024-03-08T09:15:00',
  },
];

const statusStyles = {
  open: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-blue-100 text-blue-800',
  resolved: 'bg-green-100 text-green-800',
};

const RecentTickets: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900">Chamados Recentes</h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {tickets.map((ticket) => (
            <li key={ticket.id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-blue-600 truncate">{ticket.title}</p>
                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      statusStyles[ticket.status as keyof typeof statusStyles]
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <p className="ml-1 text-sm text-gray-500">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100">
                      {ticket.category}
                    </span>
                  </div>
                  {ticket.priority === 'high' && (
                    <div className="flex items-center text-sm text-red-500">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Alta Prioridade
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentTickets;