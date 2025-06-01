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

const TrocarSenha: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    login: '',
    senhaAtual: '',
    novaSenha: '',
    confirmarNovaSenha: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
    setSuccess(false);

    if (formData.novaSenha !== formData.confirmarNovaSenha) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      const response = await authService.trocarSenha(
        formData.login,
        formData.senhaAtual,
        formData.novaSenha
      );

      console.log(response)
      
      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(response.message || 'Erro ao trocar senha');
      }
    } catch (err) {
      setError('Erro ao trocar senha. Tente novamente.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Trocar Senha
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Senha alterada com sucesso! Redirecionando...
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="login"
              value={formData.login}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Senha Atual"
              name="senhaAtual"
              type="password"
              value={formData.senhaAtual}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Nova Senha"
              name="novaSenha"
              type="password"
              value={formData.novaSenha}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Confirmar Nova Senha"
              name="confirmarNovaSenha"
              type="password"
              value={formData.confirmarNovaSenha}
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
              Trocar Senha
            </Button>

            <Button
              fullWidth
              variant="text"
              onClick={() => navigate('/login')}
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

export default TrocarSenha; 