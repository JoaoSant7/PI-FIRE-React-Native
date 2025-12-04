import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findByCpf } from '../models/User';

const SECRET = process.env.JWT_SECRET!;

export const authenticate = async (cpf: string, senha: string) => {
  const user = await findByCpf(cpf);
  if (!user) throw new Error('Credenciais inválidas');

  const ok = await bcrypt.compare(senha, user.senhaHash);
  if (!ok) throw new Error('Credenciais inválidas');

  const token = jwt.sign({ id: user.id, cpf: user.cpf }, SECRET, { expiresIn: '7d' });
  return { token, user: { id: user.id, nome: user.nome, posto: user.posto } };
};