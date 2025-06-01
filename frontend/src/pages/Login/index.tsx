import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert
} from '@mui/material';
import { authService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    login: '',
    senha: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await authService.login(formData.login, formData.senha);
      
      if (response.success) {
        login({ login: formData.login } as any);
        navigate('/carrinho');
      } else {
        setError('Login ou senha inválidos');
      }
    } catch (err) {
      setError('Erro ao realizar login. Tente novamente.');
    }
  };

  return (
    <Container maxWidth="sm" style={{ minHeight: '70vh' }}>
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Entrar
            </Button>

            <Button
              fullWidth
              variant="text"
              onClick={() => navigate('/cadastro')}
              sx={{ mt: 1 }}
            >
              Criar nova conta
            </Button>

            <Button
              fullWidth
              variant="text"
              onClick={() => navigate('/trocar-senha')}
              sx={{ mt: 1 }}
            >
              Trocar senha
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 