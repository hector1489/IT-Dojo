import { Pool } from 'pg';

const pool = new Pool({
  user: 'tu_usuario',
  host: 'localhost',
  database: 'itdojo',
  password: 'tu_contraseña',
  port: 5432,
});

class UsuarioModel {

  async obtenerUsuarios() {
    try {
      const result = await pool.query('SELECT * FROM usuarios');
      return result.rows;
    } catch (error) {
      console.error(error);
      throw new Error('Error al obtener usuarios');
    }
  }
}

export default new UsuarioModel();
