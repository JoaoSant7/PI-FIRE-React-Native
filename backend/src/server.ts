// src/server.ts
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import db from './database/connection';
import ocorrenciaRoutes from './routes/ocorrenciaRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// Carregar variáveis de ambiente
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8081;

// ===== SEGURANÇA =====
// Helmet - Headers de segurança
app.use(helmet());

// Rate Limiting - Prevenir abuso
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requisições por IP
  message: {
    success: false,
    error: 'Muitas requisições. Tente novamente mais tarde.'
  }
});
app.use('/api/', limiter);

// CORS - Configuração flexível
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// ===== MIDDLEWARES =====
// Compressão de respostas
app.use(compression());

// Body parser com limite para fotos
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Log de requisições (apenas em desenvolvimento)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

// ===== ROTAS =====
// Health check
app.get('/health', async (req, res) => {
  try {
    // Testar conexão com o banco
    await db.raw('SELECT 1');
    
    res.json({
      success: true,
      message: 'API FIRE está funcionando',
      timestamp: new Date().toISOString(),
      database: 'connected',
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro na conexão com o banco de dados',
      timestamp: new Date().toISOString()
    });
  }
});

// Rota inicial
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🔥 FIRE Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      ocorrencias: '/api/ocorrencias',
      estatisticas: '/api/ocorrencias/estatisticas'
    }
  });
});

// Rotas da API
app.use('/api/ocorrencias', ocorrenciaRoutes);

// ===== TRATAMENTO DE ERROS =====
// 404 - Rota não encontrada
app.use(notFoundHandler);

// Tratamento global de erros
app.use(errorHandler);

// ===== INICIALIZAÇÃO =====
const startServer = async () => {
  try {
    // Testar conexão com banco
    await db.raw('SELECT 1');
    console.log('✅ Conexão com banco de dados estabelecida');

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log('\n🔥 ======================================');
      console.log('🔥 FIRE Backend - Sistema de Ocorrências');
      console.log('🔥 ======================================');
      console.log(`🚀 Servidor: http://localhost:${PORT}`);
      console.log(`📊 Health: http://localhost:${PORT}/health`);
      console.log(`📝 API: http://localhost:${PORT}/api/ocorrencias`);
      console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
      console.log(`💾 Banco: SQLite + Knex`);
      console.log('🔥 ======================================\n');
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

// Tratamento de erros não capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('\n⏹️  SIGTERM recebido. Encerrando gracefully...');
  await db.destroy();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('\n⏹️  SIGINT recebido. Encerrando gracefully...');
  await db.destroy();
  process.exit(0);
});

// Iniciar
startServer();

export default app;