import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import type { Ticket } from '../types';

const statusColors = {
  open: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-blue-100 text-blue-800',
  resolved: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-800'
};

const priorityIcons = {
  low: '●',
  medium: '●●',
  high: '●●●',
  urgent: '●●●●'
};

const priorityColors = {
  low: 'text-green-500',
  medium: 'text-yellow-500',
  high: 'text-orange-500',
  urgent: 'text-red-500'
};

const TicketList: React.FC<{ tickets: Ticket[] }> = ({ tickets }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <p className="text-sm font-medium text-blue-600 truncate">{ticket.title}</p>
                  <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[ticket.status]}`}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className={`mr-2 text-sm ${priorityColors[ticket.priority]}`}>
                    {priorityIcons[ticket.priority]}
                  </span>
                  <Clock className="h-5 w-5 text-gray-400" />
                  <p className="ml-1 text-sm text-gray-500">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-600 line-clamp-2">{ticket.description}</p>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100">
                    {ticket.category}
                  </span>
                </div>
                {ticket.priority === 'urgent' && (
                  <div className="flex items-center text-sm text-red-500">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Prioridade Urgente
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;