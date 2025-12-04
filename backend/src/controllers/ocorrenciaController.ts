// src/controllers/ocorrenciaController.ts
import { Request, Response } from 'express';
import { OcorrenciaModel } from '../models/OcorrenciaModel';
import { CreateOcorrenciaDTO, UpdateOcorrenciaDTO, ApiResponse } from '../types';

export class OcorrenciaController {
  // GET /api/ocorrencias - Listar todas com filtros
  static async listarTodas(req: Request, res: Response) {
    try {
      const { situacao, natureza, municipio, dataInicio, dataFim } = req.query;

      const ocorrencias = await OcorrenciaModel.findAll({
        situacao: situacao as string,
        natureza: natureza as string,
        municipio: municipio as string,
        dataInicio: dataInicio as string,
        dataFim: dataFim as string,
      });

      const response: ApiResponse = {
        success: true,
        data: ocorrencias,
        message: `${ocorrencias.length} ocorrências encontradas`,
      };

      res.json(response);
    } catch (error) {
      console.error('Erro ao listar ocorrências:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Erro ao listar ocorrências',
      };
      res.status(500).json(response);
    }
  }

  // GET /api/ocorrencias/:id - Buscar por ID
  static async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const ocorrencia = await OcorrenciaModel.findById(id);

      if (!ocorrencia) {
        const response: ApiResponse = {
          success: false,
          error: 'Ocorrência não encontrada',
        };
        return res.status(404).json(response);
      }

      const response: ApiResponse = {
        success: true,
        data: ocorrencia,
      };

      res.json(response);
    } catch (error) {
      console.error('Erro ao buscar ocorrência:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Erro ao buscar ocorrência',
      };
      res.status(500).json(response);
    }
  }

  // POST /api/ocorrencias - Criar nova
  static async criar(req: Request, res: Response) {
    try {
      const dadosOcorrencia: CreateOcorrenciaDTO = req.body;

      // Validação básica
      const camposObrigatorios = [
        'numeroAviso',
        'municipio',
        'natureza',
        'situacao',
        'diretoria',
        'grupamento',
        'pontoBase'
      ];

      const camposFaltando = camposObrigatorios.filter(campo => !dadosOcorrencia[campo as keyof CreateOcorrenciaDTO]);

      if (camposFaltando.length > 0) {
        const response: ApiResponse = {
          success: false,
          error: `Campos obrigatórios faltando: ${camposFaltando.join(', ')}`,
        };
        return res.status(400).json(response);
      }

      const novaOcorrencia = await OcorrenciaModel.create(dadosOcorrencia);

      const response: ApiResponse = {
        success: true,
        data: novaOcorrencia,
        message: 'Ocorrência criada com sucesso',
      };

      res.status(201).json(response);
    } catch (error: any) {
      console.error('Erro ao criar ocorrência:', error);
      
      // Tratar erro de duplicação (unique constraint)
      if (error.code === 'SQLITE_CONSTRAINT') {
        const response: ApiResponse = {
          success: false,
          error: 'Número de aviso já existe',
        };
        return res.status(409).json(response);
      }

      const response: ApiResponse = {
        success: false,
        error: 'Erro ao criar ocorrência',
      };
      res.status(500).json(response);
    }
  }

  // PUT /api/ocorrencias/:id - Atualizar
  static async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dadosAtualizacao: UpdateOcorrenciaDTO = req.body;

      const ocorrenciaAtualizada = await OcorrenciaModel.update(id, dadosAtualizacao);

      if (!ocorrenciaAtualizada) {
        const response: ApiResponse = {
          success: false,
          error: 'Ocorrência não encontrada',
        };
        return res.status(404).json(response);
      }

      const response: ApiResponse = {
        success: true,
        data: ocorrenciaAtualizada,
        message: 'Ocorrência atualizada com sucesso',
      };

      res.json(response);
    } catch (error) {
      console.error('Erro ao atualizar ocorrência:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Erro ao atualizar ocorrência',
      };
      res.status(500).json(response);
    }
  }

  // DELETE /api/ocorrencias/:id - Deletar
  static async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletado = await OcorrenciaModel.delete(id);

      if (!deletado) {
        const response: ApiResponse = {
          success: false,
          error: 'Ocorrência não encontrada',
        };
        return res.status(404).json(response);
      }

      const response: ApiResponse = {
        success: true,
        message: 'Ocorrência deletada com sucesso',
      };

      res.json(response);
    } catch (error) {
      console.error('Erro ao deletar ocorrência:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Erro ao deletar ocorrência',
      };
      res.status(500).json(response);
    }
  }

  // GET /api/ocorrencias/estatisticas - Estatísticas
  static async obterEstatisticas(req: Request, res: Response) {
    try {
      const estatisticas = await OcorrenciaModel.getStatistics();

      const response: ApiResponse = {
        success: true,
        data: estatisticas,
      };

      res.json(response);
    } catch (error) {
      console.error('Erro ao obter estatísticas:', error);
      const response: ApiResponse = {
        success: false,
        error: 'Erro ao obter estatísticas',
      };
      res.status(500).json(response);
    }
  }
}

export default OcorrenciaController;