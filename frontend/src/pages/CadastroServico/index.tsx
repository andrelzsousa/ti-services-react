import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert
} from '@mui/material';
import { servicoTIService } from '../../services/api';
import Layout from '../../components/Layout';

const CadastroServico: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: ''
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

    if (!formData.nome || !formData.descricao || !formData.preco) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    const preco = parseFloat(formData.preco);
    if (isNaN(preco) || preco <= 0) {
      setError('Preço inválido');
      return;
    }

    try {
      const response = await servicoTIService.cadastrar({
        nome: formData.nome,
        descricao: formData.descricao,
        preco
      });
      
      if (response.success) {
        setSuccess(true);
        setFormData({
          nome: '',
          descricao: '',
          preco: ''
        });
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        setError(response.message || 'Erro ao cadastrar serviço');
      }
    } catch (err) {
      setError('Erro ao cadastrar serviço. Tente novamente.');
    }
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Cadastro de Serviço de TI
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Serviço cadastrado com sucesso!
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
              label="Descrição"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              margin="normal"
              required
              multiline
              rows={4}
            />

            <TextField
              fullWidth
              label="Preço"
              name="preco"
              type="number"
              value={formData.preco}
              onChange={handleChange}
              margin="normal"
              required
              InputProps={{
                startAdornment: 'R$'
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Cadastrar Serviço
            </Button>
          </form>
        </Paper>
      </Box>
    </Layout>
  );
};

export default CadastroServico; 