import React from 'react';
import { Users, Settings, Bell } from 'lucide-react';
import AdminStats from '../components/admin/AdminStats';
import UserManagement from '../components/admin/UserManagement';
import CategoryManagement from '../components/admin/CategoryManagement';
import WebhookSettings from '../components/admin/WebhookSettings';

const AdminPanel: React.FC = () => {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Painel Administrativo</h1>
        
        <div className="mt-8">
          <AdminStats />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <UserManagement />
          <CategoryManagement />
        </div>

        <div className="mt-8">
          <WebhookSettings />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;