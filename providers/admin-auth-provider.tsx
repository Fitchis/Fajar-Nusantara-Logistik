'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminSession {
  id: string;
  email: string;
}

interface AdminAuthContextType {
  session: AdminSession | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

export function AdminAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedSession = localStorage.getItem('adminSession');
    if (storedSession) {
      try {
        setSession(JSON.parse(storedSession));
      } catch (error) {
        console.error('Failed to parse stored session:', error);
        localStorage.removeItem('adminSession');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        const newSession = { id: userData.id, email: userData.email };
        setSession(newSession);
        localStorage.setItem('adminSession', JSON.stringify(newSession));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem('adminSession');
  };

  return (
    <AdminAuthContext.Provider value={{ session, login, logout, isLoading }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
