import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import TrocarSenha from './pages/TrocarSenha';
import Carrinho from './pages/Carrinho';
import CadastroServico from './pages/CadastroServico';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/trocar-senha" element={<TrocarSenha />} />
            <Route
              path="/carrinho"
              element={
                <PrivateRoute>
                  <Carrinho />
                </PrivateRoute>
              }
            />
            <Route
              path="/cadastro-servico"
              element={
                <PrivateRoute>
                  <CadastroServico />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
