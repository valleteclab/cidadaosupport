import React from 'react';
import { Menu, User as UserIcon, Ticket, Settings, LogOut, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
}

const Layout: React.FC<LayoutProps> = ({ children, user }) => {
  const location = useLocation();
  const { logout } = useApp();

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button className="p-2 rounded-md text-gray-400 lg:hidden">
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex-shrink-0 flex items-center">
                <Ticket className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">CidadãoSupport</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {user?.name || 'Usuário'}
              </span>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <UserIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar & Main Content */}
      <div className="flex">
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 bg-white border-r">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="flex-1 px-2 space-y-1">
              <Link 
                to="/dashboard" 
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  location.pathname === '/dashboard' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Ticket className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
              <Link 
                to="/tickets" 
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  location.pathname.startsWith('/tickets') 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Ticket className="mr-3 h-5 w-5" />
                Chamados
              </Link>
              <Link 
                to="/tickets/new" 
                className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
              >
                <Plus className="mr-3 h-5 w-5" />
                Novo Chamado
              </Link>
              {user?.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    location.pathname === '/admin' 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Settings className="mr-3 h-5 w-5" />
                  Admin
                </Link>
              )}
              <Link 
                to="/settings" 
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  location.pathname === '/settings' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Settings className="mr-3 h-5 w-5" />
                Configurações
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 w-full text-left"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sair
              </button>
            </nav>
          </div>
        </aside>

        <main className="flex-1 lg:pl-64">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;