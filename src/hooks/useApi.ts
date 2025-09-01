import { useState, useCallback } from 'react';
import { useApp } from '../contexts/AppContext';
import { Ticket, User, Category } from '../types';

// Mock API service - replace with real API calls
class ApiService {
  private static delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  static async login(email: string, password: string): Promise<User> {
    await this.delay(1000); // Simulate network delay
    
    // Mock authentication
    if (email && password) {
      return {
        id: '1',
        name: 'Cidadão Example',
        email: email,
        role: email.includes('admin') ? 'admin' : 'citizen',
        permissions: ['ticket.create', 'ticket.view'],
        notificationPreferences: [
          { type: 'email', enabled: true, events: ['ticket.created', 'ticket.updated'] }
        ]
      };
    }
    throw new Error('Credenciais inválidas');
  }

  static async getTickets(): Promise<Ticket[]> {
    await this.delay(800);
    
    // Mock tickets data
    return [
      {
        id: '1',
        title: 'Buraco na Rua Principal',
        description: 'Há um buraco grande na rua principal que está causando problemas para os veículos.',
        categoryId: 'roads',
        status: 'open',
        priority: 'high',
        createdAt: new Date('2024-03-10T10:00:00'),
        updatedAt: new Date('2024-03-10T10:00:00'),
        userId: '1',
        history: [],
        comments: [],
        metadata: {}
      },
      {
        id: '2',
        title: 'Falta de Iluminação',
        description: 'A iluminação pública está com defeito na Rua das Flores.',
        categoryId: 'lighting',
        status: 'in_progress',
        priority: 'medium',
        createdAt: new Date('2024-03-09T15:30:00'),
        updatedAt: new Date('2024-03-09T15:30:00'),
        userId: '1',
        assignedTo: 'operator1',
        history: [],
        comments: [],
        metadata: {}
      },
      {
        id: '3',
        title: 'Lixo não Coletado',
        description: 'O lixo não foi coletado na minha rua há 3 dias.',
        categoryId: 'garbage',
        status: 'resolved',
        priority: 'low',
        createdAt: new Date('2024-03-08T09:15:00'),
        updatedAt: new Date('2024-03-08T09:15:00'),
        userId: '1',
        history: [],
        comments: [],
        metadata: {}
      }
    ];
  }

  static async createTicket(ticketData: Partial<Ticket>): Promise<Ticket> {
    await this.delay(1000);
    
    const newTicket: Ticket = {
      id: Date.now().toString(),
      title: ticketData.title || '',
      description: ticketData.description || '',
      categoryId: ticketData.categoryId || '',
      status: 'open',
      priority: ticketData.priority || 'medium',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: ticketData.userId || '1',
      history: [],
      comments: [],
      metadata: {}
    };
    
    return newTicket;
  }

  static async getCategories(): Promise<Category[]> {
    await this.delay(500);
    
    // Convert DEFAULT_CATEGORIES to proper Category format
    return [
      {
        id: 'roads',
        name: 'Vias Públicas',
        slug: 'roads',
        description: 'Manutenção e reparo de ruas e calçadas',
        parentId: 'infrastructure',
        sla: 72
      },
      {
        id: 'lighting',
        name: 'Iluminação',
        slug: 'lighting',
        description: 'Problemas com iluminação pública',
        parentId: 'infrastructure',
        sla: 24
      },
      {
        id: 'garbage',
        name: 'Coleta de Lixo',
        slug: 'garbage',
        description: 'Problemas com coleta de lixo e limpeza urbana',
        parentId: 'public_services',
        sla: 24
      },
      {
        id: 'water',
        name: 'Água e Esgoto',
        slug: 'water',
        description: 'Questões relacionadas ao abastecimento de água e rede de esgoto',
        parentId: 'public_services',
        sla: 12
      }
    ];
  }
}

export const useApi = () => {
  const { dispatch } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiCall = useCallback(async <T>(
    apiCall: () => Promise<T>,
    onSuccess?: (data: T) => void
  ): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const result = await apiCall();
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return null;
    } finally {
      setLoading(false);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [dispatch]);

  const loginUser = useCallback(async (email: string, password: string) => {
    return handleApiCall(
      () => ApiService.login(email, password),
      (user) => dispatch({ type: 'LOGIN', payload: user })
    );
  }, [handleApiCall, dispatch]);

  const fetchTickets = useCallback(async () => {
    return handleApiCall(
      () => ApiService.getTickets(),
      (tickets) => dispatch({ type: 'SET_TICKETS', payload: tickets })
    );
  }, [handleApiCall, dispatch]);

  const createTicket = useCallback(async (ticketData: Partial<Ticket>) => {
    return handleApiCall(
      () => ApiService.createTicket(ticketData),
      (ticket) => dispatch({ type: 'ADD_TICKET', payload: ticket })
    );
  }, [handleApiCall, dispatch]);

  const fetchCategories = useCallback(async () => {
    return handleApiCall(
      () => ApiService.getCategories(),
      (categories) => dispatch({ type: 'SET_CATEGORIES', payload: categories })
    );
  }, [handleApiCall, dispatch]);

  return {
    loading,
    error,
    loginUser,
    fetchTickets,
    createTicket,
    fetchCategories,
  };
};