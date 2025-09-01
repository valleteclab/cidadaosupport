import React, { useState } from 'react';
import { Bell, Mail, Smartphone, Shield, Globe } from 'lucide-react';
import { User, NotificationPreference } from '../types';

interface SettingsProps {
  user?: User | null;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const [notifications, setNotifications] = useState<NotificationPreference[]>([
    { type: 'email', enabled: true, events: ['ticket.created', 'ticket.statusChanged'] },
    { type: 'push', enabled: false, events: [] },
    { type: 'sms', enabled: false, events: [] },
  ]);

  const [language, setLanguage] = useState('pt-BR');
  const [theme, setTheme] = useState('light');

  const handleNotificationToggle = (type: NotificationPreference['type']) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.type === type ? { ...notif, enabled: !notif.enabled } : notif
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Configurações</h1>

      {/* Profile Section */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Perfil</h2>
        </div>
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                defaultValue={user?.name || ''}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                defaultValue={user?.email || ''}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Departamento</label>
              <input
                type="text"
                defaultValue={user?.department || ''}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cargo</label>
              <input
                type="text"
                value={user?.role === 'admin' ? 'Administrador' : user?.role === 'operator' ? 'Operador' : 'Cidadão'}
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notificações
          </h2>
        </div>
        <div className="px-6 py-4 space-y-4">
          {notifications.map((notif) => (
            <div key={notif.type} className="flex items-center justify-between">
              <div className="flex items-center">
                {notif.type === 'email' && <Mail className="h-5 w-5 text-gray-400 mr-3" />}
                {notif.type === 'push' && <Bell className="h-5 w-5 text-gray-400 mr-3" />}
                {notif.type === 'sms' && <Smartphone className="h-5 w-5 text-gray-400 mr-3" />}
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {notif.type === 'email' && 'Email'}
                    {notif.type === 'push' && 'Notificações Push'}
                    {notif.type === 'sms' && 'SMS'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Receba atualizações sobre seus chamados
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleNotificationToggle(notif.type)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notif.enabled ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notif.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Preferências
          </h2>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Idioma</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tema</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="light">Claro</option>
              <option value="dark">Escuro</option>
              <option value="system">Sistema</option>
            </select>
          </div>
        </div>
      </div>

      {/* Security Section */}
      {user?.role === 'admin' && (
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Segurança
            </h2>
          </div>
          <div className="px-6 py-4">
            <button className="text-sm text-blue-600 hover:text-blue-500">
              Alterar senha
            </button>
            <div className="mt-4">
              <button className="text-sm text-blue-600 hover:text-blue-500">
                Configurar autenticação de dois fatores
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Salvar Alterações
        </button>
      </div>
    </div>
  );
};

export default Settings;