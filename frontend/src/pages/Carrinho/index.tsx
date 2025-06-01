import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Alert,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { servicoTIService, solicitacaoService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { ServicoTI, SolicitacaoServico } from '../../types';
import Layout from '../../components/Layout';

const Carrinho: React.FC = () => {
  const navigate = useNavigate();
  const { cliente } = useAuth();
  const [servicos, setServicos] = useState<ServicoTI[]>([]);
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoServico[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!cliente) {
      navigate('/login');
      return;
    }

    carregarServicos();
    carregarSolicitacoes();
  }, [cliente, navigate]);

  const carregarServicos = async () => {
    try {
      const response = await servicoTIService.listar();
      if (response.success && response.data) {
        setServicos(response.data);
      }
    } catch (err) {
      setError('Erro ao carregar serviços');
    }
  };

  const carregarSolicitacoes = async () => {
    if (!cliente) return;

    try {
      const response = await solicitacaoService.listarPorCliente(cliente.login);
      if (response.success && response.data) {
        setSolicitacoes(response.data);
      }
    } catch (err) {
      setError('Erro ao carregar solicitações');
    }
  };

  const adicionarSolicitacao = (servico: ServicoTI) => {
    if (!cliente) return;

    const novaSolicitacao: SolicitacaoServico = {
      clienteId: cliente.id!,
      servicoId: servico.id!,
      dataSolicitacao: new Date().toISOString(),
      status: 'Pendente'
    };

    setSolicitacoes(prev => [...prev, novaSolicitacao]);
  };

  const removerSolicitacao = (index: number) => {
    setSolicitacoes(prev => prev.filter((_, i) => i !== index));
  };

  const salvarSolicitacoes = async () => {
    if (!cliente) return;

    try {
      const response = await solicitacaoService.atualizar(cliente.login, solicitacoes);
      
      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        setError(response.message || 'Erro ao salvar solicitações');
      }
    } catch (err) {
      setError('Erro ao salvar solicitações');
    }
  };

  return (
    <Layout>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Solicitação de Serviços de TI
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Solicitações salvas com sucesso!
          </Alert>
        )}

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Serviços Disponíveis
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Preço</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {servicos.map((servico) => (
                  <TableRow key={servico.id}>
                    <TableCell>{servico.nome}</TableCell>
                    <TableCell>{servico.descricao}</TableCell>
                    <TableCell>R$ {servico.preco.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => adicionarSolicitacao(servico)}
                      >
                        Adicionar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Minhas Solicitações
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Serviço</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {solicitacoes.map((solicitacao, index) => {
                  const servico = servicos.find(s => s.id === solicitacao.servicoId);
                  return (
                    <TableRow key={index}>
                      <TableCell>{servico?.nome}</TableCell>
                      <TableCell>
                        {new Date(solicitacao.dataSolicitacao).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{solicitacao.status}</TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          onClick={() => removerSolicitacao(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={salvarSolicitacoes}
            disabled={solicitacoes.length === 0}
          >
            Salvar Solicitações
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default Carrinho; 