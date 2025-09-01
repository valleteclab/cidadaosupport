import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TicketCreate from './pages/TicketCreate';
import TicketList from './pages/TicketList';
import AdminPanel from './pages/AdminPanel';
import Settings from './pages/Settings';
import { User } from './types';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; isAuthenticated: boolean }> = ({ 
  children, 
  isAuthenticated 
}) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
              <Navigate to="/" replace /> : 
              <Login onLogin={handleLogin} />
          } 
        />
        
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout user={user} />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="tickets" element={<TicketList />} />
          <Route path="tickets/new" element={<TicketCreate />} />
          <Route path="tickets/:id" element={<div>Ticket Detail (Em construção)</div>} />
          <Route 
            path="admin" 
            element={
              user?.role === 'admin' ? 
                <AdminPanel /> : 
                <Navigate to="/" replace />
            } 
          />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;