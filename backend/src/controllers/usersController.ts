import { Request, Response } from 'express';
import pool from '../database/db';

const obtenerUsuarios = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default {
  obtenerUsuarios,

};
