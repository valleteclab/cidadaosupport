import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { Ticket, TicketStatus, TicketPriority } from '../types';

// Mock data - in a real app, this would come from an API
const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Buraco na Rua Exemplo',
    description: 'Há um buraco grande na rua que está causando problemas para os motoristas',
    categoryId: 'roads',
    status: 'open',
    priority: 'high',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    userId: 'user1',
    history: [],
    comments: [],
    metadata: {}
  },
  {
    id: '2',
    title: 'Lâmpada queimada na Praça Central',
    description: 'A iluminação da praça está com problemas',
    categoryId: 'lighting',
    status: 'in_progress',
    priority: 'medium',
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-21'),
    userId: 'user2',
    assignedTo: 'operator1',
    history: [],
    comments: [],
    metadata: {}
  },
  {
    id: '3',
    title: 'Coleta de lixo atrasada',
    description: 'A coleta não passou na última semana',
    categoryId: 'garbage',
    status: 'resolved',
    priority: 'urgent',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-22'),
    userId: 'user3',
    assignedTo: 'operator2',
    history: [],
    comments: [],
    metadata: {}
  }
];

const TicketList: React.FC = () => {
  const [tickets] = useState<Ticket[]>(mockTickets);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | 'all'>('all');

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusIcon = (status: TicketStatus) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'closed':
        return <XCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: TicketStatus) => {
    switch (status) {
      case 'open': return 'Aberto';
      case 'in_progress': return 'Em Andamento';
      case 'resolved': return 'Resolvido';
      case 'closed': return 'Fechado';
    }
  };

  const getPriorityLabel = (priority: TicketPriority) => {
    switch (priority) {
      case 'low': return 'Baixa';
      case 'medium': return 'Média';
      case 'high': return 'Alta';
      case 'urgent': return 'Urgente';
    }
  };

  const getPriorityColor = (priority: TicketPriority) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-yellow-100 text-yellow-800';
      case 'urgent': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Chamados</h1>
        <Link
          to="/tickets/new"
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Novo Chamado
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg mb-6 p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="col-span-2">
            <label htmlFor="search" className="sr-only">Buscar</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Buscar chamados..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as TicketStatus | 'all')}
            >
              <option value="all">Todos os Status</option>
              <option value="open">Aberto</option>
              <option value="in_progress">Em Andamento</option>
              <option value="resolved">Resolvido</option>
              <option value="closed">Fechado</option>
            </select>
          </div>
          <div>
            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as TicketPriority | 'all')}
            >
              <option value="all">Todas as Prioridades</option>
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
              <option value="urgent">Urgente</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ticket List */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <ul className="divide-y divide-gray-200">
          {filteredTickets.map((ticket) => (
            <li key={ticket.id}>
              <Link to={`/tickets/${ticket.id}`} className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getStatusIcon(ticket.status)}
                      <p className="ml-2 text-sm font-medium text-blue-600 truncate">
                        #{ticket.id} - {ticket.title}
                      </p>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                        {getPriorityLabel(ticket.priority)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {ticket.description.substring(0, 100)}...
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        {getStatusLabel(ticket.status)} • 
                        Criado em {ticket.createdAt.toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        {filteredTickets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum chamado encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketList;