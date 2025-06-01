import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { clienteService } from "../../services/api";

const Cadastro: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    login: "",
    senha: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await clienteService.cadastrar(formData);

      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(response.message || "Erro ao cadastrar cliente");
      }
    } catch (err) {
      setError("Erro ao cadastrar cliente. Tente novamente.");
    }
  };

  return (
    <Container maxWidth="sm" style={{ minHeight: "70vh" }}>
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Cadastro de Cliente
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Cliente cadastrado com sucesso! Redirecionando...
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Login"
              name="login"
              value={formData.login}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Senha"
              name="senha"
              type="password"
              value={formData.senha}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Cadastrar
            </Button>

            <Button
              fullWidth
              variant="text"
              onClick={() => navigate("/login")}
              sx={{ mt: 1 }}
            >
              Voltar para login
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Cadastro;
