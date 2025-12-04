import { Request, Response } from 'express';
import { authenticate } from '../services/authService';

export const login = async (req: Request, res: Response) => {
  try {
    const { cpf, senha } = req.body;
    const data = await authenticate(cpf, senha);
    res.json(data);
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};