import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Cliente } from '../types';

interface AuthContextData {
  cliente: Cliente | null;
  login: (cliente: Cliente) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [cliente, setCliente] = useState<Cliente | null>(() => {
    const storedCliente = localStorage.getItem('@TIServices:cliente');
    return storedCliente ? JSON.parse(storedCliente) : null;
  });

  const login = (cliente: Cliente) => {
    setCliente(cliente);
    localStorage.setItem('@TIServices:cliente', JSON.stringify(cliente));
  };

  const logout = () => {
    setCliente(null);
    localStorage.removeItem('@TIServices:cliente');
  };

  return (
    <AuthContext.Provider value={{ cliente, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 