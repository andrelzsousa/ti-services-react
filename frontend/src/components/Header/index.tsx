import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./styles.css";

const Header: React.FC = () => {
  const { cliente, logout } = useAuth();

  return (
    <header className="main-header">
      <div className="container">
        <Link to="/">
          <img src="/images/logo.png" alt="Logo Nandeco" id="logo" />
        </Link>
        <h1>Transformando Negócios com Tecnologia</h1>
        <nav>
          {!cliente ? (
            <>
              <Link to="/login" id="login-link">
                Login
              </Link>
              <Link to="/cadastro" id="register-link">
                Cadastrar
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/carrinho"
                id="service-link"
                style={{
                  marginRight: "10px",
                  backgroundColor: "blue",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                Solicitar Serviço
              </Link>
              <button onClick={logout} id="logout-btn" className="logout-btn">
                Sair
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
