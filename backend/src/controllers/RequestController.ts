import { Request, Response } from 'express';
import { openDb } from '../database/database';

export class RequestController {
  async getByClient(req: Request, res: Response) {
    try {
      const { login } = req.params;
      const db = await openDb();

      // Primeiro, busca o cliente pelo login
      const client = await db.get('SELECT id FROM clientes WHERE login = ?', [login]);
      
      if (!client) {
        return res.status(404).json({ 
          success: false,
          message: 'Cliente não encontrado'
        });
      }

      // Busca as solicitações do cliente
      const requests = await db.all(`
        SELECT s.*, sr.nome as servico_nome, sr.descricao as servico_descricao, sr.preco as servico_preco
        FROM solicitacoes s
        JOIN servicos sr ON s.servicoId = sr.id
        WHERE s.clienteId = ?
      `, [client.id]);

      res.json({
        success: true,
        data: requests
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Erro ao buscar solicitações'
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { login } = req.params;
      const { solicitacoes } = req.body;
      const db = await openDb();

      // Primeiro, busca o cliente pelo login
      const client = await db.get('SELECT id FROM clientes WHERE login = ?', [login]);
      
      if (!client) {
        return res.status(404).json({ 
          success: false,
          message: 'Cliente não encontrado'
        });
      }

      // Inicia uma transação
      await db.run('BEGIN TRANSACTION');

      try {
        // Remove todas as solicitações antigas do cliente
        await db.run('DELETE FROM solicitacoes WHERE clienteId = ?', [client.id]);

        // Insere as novas solicitações
        for (const solicitacao of solicitacoes) {
          await db.run(
            'INSERT INTO solicitacoes (clienteId, servicoId, dataSolicitacao, status) VALUES (?, ?, ?, ?)',
            [client.id, solicitacao.servicoId, solicitacao.dataSolicitacao, solicitacao.status]
          );
        }

        // Commit da transação
        await db.run('COMMIT');

        res.json({
          success: true,
          message: 'Solicitações atualizadas com sucesso'
        });
      } catch (error) {
        // Rollback em caso de erro
        await db.run('ROLLBACK');
        throw error;
      }
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Erro ao atualizar solicitações'
      });
    }
  }
} 