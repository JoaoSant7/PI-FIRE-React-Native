import { listByUser, create, batchCreate } from '../models/Ocorrencia';
import { Ocorrencia } from '../types';

export const listIncidents = (userId: number) => listByUser(userId);

export const addIncident = (occ: Omit<Ocorrencia, 'id'>, userId: number) =>
  create({ ...occ, userId });

export const addManyIncidents = (occ: Omit<Ocorrencia, 'id'>[], userId: number) =>
  batchCreate(occ.map(o => ({ ...o, userId })));