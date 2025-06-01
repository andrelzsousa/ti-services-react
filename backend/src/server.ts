import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import clientRoutes from './routes/clientRoutes';
import serviceRoutes from './routes/serviceRoutes';
import requestRoutes from './routes/requestRoutes';
import { initializeDatabase } from './database/database';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Inicializa o banco de dados
initializeDatabase();

// Rotas
app.use('/api', clientRoutes);
app.use('/api', serviceRoutes);
app.use('/api', requestRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 