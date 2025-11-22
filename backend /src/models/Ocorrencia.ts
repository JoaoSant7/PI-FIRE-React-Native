import db from '../database/knex';
import { Ocorrencia } from '../types';

export const listByUser = (userId: number) =>
  db<Ocorrencia>('ocorrencias').where({ userId }).orderBy('dataCriacao', 'desc');

export const create = (occ: Omit<Ocorrencia, 'id'>) =>
  db<Ocorrencia>('ocorrencias').insert(occ).returning('*');

export const batchCreate = (occ: Omit<Ocorrencia, 'id'>[]) =>
  db<Ocorrencia>('ocorrencias').insert(occ).returning('*');