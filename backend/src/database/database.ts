import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

export async function openDb() {
  return open({
    filename: path.join(__dirname, '../../database.sqlite'),
    driver: sqlite3.Database
  });
}

export async function initializeDatabase() {
  const db = await openDb();
  
  await db.exec(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      login TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL,
      email TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS servicos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT NOT NULL,
      preco REAL NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS solicitacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clienteId INTEGER NOT NULL,
      servicoId INTEGER NOT NULL,
      dataSolicitacao TEXT NOT NULL,
      status TEXT NOT NULL,
      FOREIGN KEY (clienteId) REFERENCES clientes (id),
      FOREIGN KEY (servicoId) REFERENCES servicos (id)
    );
  `);

  return db;
} 