import React from 'react';
import { useState } from 'react';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TicketCreate from './pages/TicketCreate';
import TicketList from './pages/TicketList';
import AdminPanel from './pages/AdminPanel';
import Settings from './pages/Settings';
import { User } from './types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  if (!isAuthenticated) {
    return <Login onLogin={(userData) => {
      setUser(userData);
      setIsAuthenticated(true);
    }} />;
  }

  return (
    <Layout user={user}>
      <div className="min-h-screen bg-gray-50">
        {/* Main content will be rendered here based on routing */}
        <Dashboard />
      </div>
    </Layout>
  );
}

export default App;