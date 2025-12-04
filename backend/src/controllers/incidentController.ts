import { Request, Response } from 'express';
import { listIncidents, addIncident, addManyIncidents } from '../services/incidentService';
import { AuthReq } from '../middleware/auth';

export const list = async (req: AuthReq, res: Response) => {
  const rows = await listIncidents(req.user!.id);
  res.json(rows);
};

export const create = async (req: AuthReq, res: Response) => {
  const occ = await addIncident(req.body, req.user!.id);
  res.status(201).json(occ);
};

export const batch = async (req: AuthReq, res: Response) => {
  const occs = await addManyIncidents(req.body, req.user!.id);
  res.status(201).json(occs);
};