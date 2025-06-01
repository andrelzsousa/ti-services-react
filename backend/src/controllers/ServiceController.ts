import { Request, Response } from 'express';
import { openDb } from '../database/database';
import { Service } from '../models/Service';

export class ServiceController {
  async create(req: Request, res: Response) {
    try {
      const { nome, descricao, preco } = req.body as Service;
      const db = await openDb();
      
      const result = await db.run(
        'INSERT INTO servicos (nome, descricao, preco) VALUES (?, ?, ?)',
        [nome, descricao, preco]
      );

      res.status(201).json({ 
        success: true,
        data: {
          id: result.lastID,
          nome,
          descricao,
          preco
        }
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Erro ao criar serviço'
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const db = await openDb();
      const services = await db.all('SELECT * FROM servicos');
      res.json({
        success: true,
        data: services
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Erro ao buscar serviços'
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const db = await openDb();
      const service = await db.get('SELECT * FROM servicos WHERE id = ?', [id]);
      
      if (!service) {
        return res.status(404).json({ 
          success: false,
          message: 'Serviço não encontrado'
        });
      }

      res.json({
        success: true,
        data: service
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Erro ao buscar serviço'
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, descricao, preco } = req.body as Service;
      const db = await openDb();

      const result = await db.run(
        'UPDATE servicos SET nome = ?, descricao = ?, preco = ? WHERE id = ?',
        [nome, descricao, preco, id]
      );

      if (result.changes === 0) {
        return res.status(404).json({ 
          success: false,
          message: 'Serviço não encontrado'
        });
      }

      res.json({
        success: true,
        data: { id, nome, descricao, preco }
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Erro ao atualizar serviço'
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const db = await openDb();
      
      const result = await db.run('DELETE FROM servicos WHERE id = ?', [id]);

      if (result.changes === 0) {
        return res.status(404).json({ 
          success: false,
          message: 'Serviço não encontrado'
        });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Erro ao deletar serviço'
      });
    }
  }
} 