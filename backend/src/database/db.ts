import { Pool, QueryResult } from 'pg'
import * as dotenv from 'dotenv'

dotenv.config()

export const FRONTEND_URL= process.env.FRONTEND_URL ?? "http://localhost:5173"

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  allowExitOnIdle: true,
}

const pool = new Pool(config)

const db = async (query: string, values: any[]): Promise<QueryResult<any>> => {
  try {
    const result: QueryResult = await pool.query(query, values)
    return result
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default db
