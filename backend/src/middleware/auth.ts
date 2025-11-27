import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthReq extends Request { user?: { id: number; cpf: string } }

export const auth = (req: AuthReq, res: Response, next: NextFunction) => {
  const hdr = req.headers.authorization;
  if (!hdr) return res.status(401).json({ error: 'Token não fornecido' });

  const [, token] = hdr.split(' ');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = { id: decoded.id, cpf: decoded.cpf };
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
};

