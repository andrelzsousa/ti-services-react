import { Request, Response } from 'express';
import { openDb } from '../database/database';
import { Client } from '../models/Client';
import bcrypt from 'bcrypt';

export class ClientController {
  async create(req: Request, res: Response) {
    try {
      const { nome, login, senha, email } = req.body as Client;
      const db = await openDb();

      // Verifica se o login já existe
      const existingClient = await db.get('SELECT * FROM clientes WHERE login = ?', [login]);
      if (existingClient) {
        return res.status(400).json({ 
          success: false,
          message: 'Login já existe'
        });
      }

      // Criptografa a senha
      const hashedPassword = await bcrypt.hash(senha, 10);
      
      const result = await db.run(
        'INSERT INTO clientes (nome, login, senha, email) VALUES (?, ?, ?, ?)',
        [nome, login, hashedPassword, email]
      );

      res.status(201).json({ 
        success: true,
        data: {
          id: result.lastID, 
          nome, 
          login, 
          email 
        }
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Erro ao criar cliente'
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const db = await openDb();
      const clients = await db.all('SELECT id, nome, login, email, created_at FROM clientes');
      res.json({
        success: true,
        data: clients
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Erro ao buscar clientes'
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const db = await openDb();
      const client = await db.get(
        'SELECT id, nome, login, email, created_at FROM clientes WHERE id = ?', 
        [id]
      );
      
      if (!client) {
        return res.status(404).json({ 
          success: false,
          message: 'Cliente não encontrado'
        });
      }

      res.json({
        success: true,
        data: client
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Erro ao buscar cliente'
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, login, senha, email } = req.body as Client;
      const db = await openDb();

      // Verifica se o login já existe para outro cliente
      const existingClient = await db.get(
        'SELECT * FROM clientes WHERE login = ? AND id != ?', 
        [login, id]
      );
      if (existingClient) {
        return res.status(400).json({ 
          success: false,
          message: 'Login já existe'
        });
      }

      let updateQuery = 'UPDATE clientes SET nome = ?, login = ?, email = ?';
      let params = [nome, login, email];

      // Se uma nova senha foi fornecida, atualiza ela também
      if (senha) {
        const hashedPassword = await bcrypt.hash(senha, 10);
        updateQuery += ', senha = ?';
        params.push(hashedPassword);
      }

      updateQuery += ' WHERE id = ?';
      params.push(id);

      const result = await db.run(updateQuery, params);

      if (result.changes === 0) {
        return res.status(404).json({ 
          success: false,
          message: 'Cliente não encontrado'
        });
      }

      res.json({
        success: true,
        data: { id, nome, login, email }
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Erro ao atualizar cliente'
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const db = await openDb();
      
      const result = await db.run('DELETE FROM clientes WHERE id = ?', [id]);

      if (result.changes === 0) {
        return res.status(404).json({ 
          success: false,
          message: 'Cliente não encontrado'
        });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Erro ao deletar cliente'
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { login, senha } = req.body;
      const db = await openDb();

      const client = await db.get('SELECT * FROM clientes WHERE login = ?', [login]);
      
      if (!client) {
        return res.status(401).json({ 
          success: false,
          message: 'Login ou senha inválidos'
        });
      }

      const passwordMatch = await bcrypt.compare(senha, client.senha);
      
      if (!passwordMatch) {
        return res.status(401).json({ 
          success: false,
          message: 'Login ou senha inválidos'
        });
      }

      // Remove a senha do objeto antes de enviar
      const { senha: _, ...clientWithoutPassword } = client;
      
      res.json({
        success: true,
        data: clientWithoutPassword
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Erro ao fazer login'
      });
    }
  }

  async trocarSenha(req: Request, res: Response) {
    try {
      const { login } = req.params;
      const { senhaAtual, novaSenha } = req.body;
      const db = await openDb();

      // Busca o cliente pelo login
      const client = await db.get('SELECT * FROM clientes WHERE login = ?', [login]);
      
      if (!client) {
        return res.status(404).json({ 
          success: false,
          message: 'Cliente não encontrado'
        });
      }

      // Verifica se a senha atual está correta
      const passwordMatch = await bcrypt.compare(senhaAtual, client.senha);
      
      if (!passwordMatch) {
        return res.status(401).json({ 
          success: false,
          message: 'Senha atual incorreta'
        });
      }

      // Criptografa a nova senha
      const hashedPassword = await bcrypt.hash(novaSenha, 10);

      // Atualiza a senha
      await db.run(
        'UPDATE clientes SET senha = ? WHERE login = ?',
        [hashedPassword, login]
      );

      res.json({
        success: true,
        message: 'Senha alterada com sucesso'
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Erro ao alterar senha'
      });
    }
  }
} 