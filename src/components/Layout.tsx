import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, User as UserIcon, Ticket, Settings, LogOut, Home, Plus, Shield } from 'lucide-react';
import { User } from '../types';

interface LayoutProps {
  user: User | null;
}

const Layout: React.FC<LayoutProps> = ({ user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, this would clear auth tokens, etc.
    window.location.href = '/login';
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Chamados', href: '/tickets', icon: Ticket },
    { name: 'Novo Chamado', href: '/tickets/new', icon: Plus },
    ...(user?.role === 'admin' ? [{ name: 'Administração', href: '/admin', icon: Shield }] : []),
    { name: 'Configurações', href: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-400 lg:hidden hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
              <Link to="/" className="flex-shrink-0 flex items-center">
                <Ticket className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">CidadãoSupport</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <UserIcon className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm text-gray-700">{user?.name || 'Usuário'}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-gray-100"
                title="Sair"
              >
                <LogOut className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-gray-600 bg-opacity-75" onClick={() => setMobileMenuOpen(false)}>
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="pt-20 pb-4">
              <nav className="px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      location.pathname === item.href
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar & Main Content */}
      <div className="flex pt-16">
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 bg-white border-r">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    location.pathname === item.href
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 lg:pl-64">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;