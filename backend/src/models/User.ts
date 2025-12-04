import db from '../database/knex';
import { User } from '../types';

export const findByCpf = (cpf: string) =>
  db<User>('users').where({ cpf }).first();

export const create = (user: Omit<User, 'id' | 'created_at'>) =>
  db<User>('users').insert(user).returning('*');