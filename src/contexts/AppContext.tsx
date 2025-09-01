import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Ticket, Category } from '../types';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  tickets: Ticket[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}

type AppAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TICKETS'; payload: Ticket[] }
  | { type: 'ADD_TICKET'; payload: Ticket }
  | { type: 'UPDATE_TICKET'; payload: { id: string; updates: Partial<Ticket> } }
  | { type: 'SET_CATEGORIES'; payload: Category[] };

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  tickets: [],
  categories: [],
  loading: false,
  error: null,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        tickets: [],
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'SET_TICKETS':
      return {
        ...state,
        tickets: action.payload,
        loading: false,
      };
    case 'ADD_TICKET':
      return {
        ...state,
        tickets: [action.payload, ...state.tickets],
      };
    case 'UPDATE_TICKET':
      return {
        ...state,
        tickets: state.tickets.map(ticket =>
          ticket.id === action.payload.id
            ? { ...ticket, ...action.payload.updates }
            : ticket
        ),
      };
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  login: (userData: User) => void;
  logout: () => void;
  addTicket: (ticket: Ticket) => void;
  updateTicket: (id: string, updates: Partial<Ticket>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const login = (userData: User) => {
    dispatch({ type: 'LOGIN', payload: userData });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const addTicket = (ticket: Ticket) => {
    dispatch({ type: 'ADD_TICKET', payload: ticket });
  };

  const updateTicket = (id: string, updates: Partial<Ticket>) => {
    dispatch({ type: 'UPDATE_TICKET', payload: { id, updates } });
  };

  const value: AppContextType = {
    state,
    dispatch,
    login,
    logout,
    addTicket,
    updateTicket,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};