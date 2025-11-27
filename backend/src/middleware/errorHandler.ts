// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Erro capturado:', err);

  const response: ApiResponse = {
    success: false,
    error: err.message || 'Erro interno do servidor',
  };

  res.status(500).json(response);
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response: ApiResponse = {
    success: false,
    error: `Rota ${req.method} ${req.path} não encontrada`,
  };

  res.status(404).json(response);
};