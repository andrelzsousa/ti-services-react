import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import TrocarSenha from "./pages/TrocarSenha";
import Carrinho from "./pages/Carrinho";
import CadastroServico from "./pages/CadastroServico";
import Footer from "./components/Footer/Footer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
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
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
