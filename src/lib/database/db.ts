import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { promisify } from 'util';
import { FieldPacket } from 'mysql2';

dotenv.config()

// Create a pool with proper configuration
const pool = mysql.createPool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000,
  timezone: '+08:00',
  supportBigNumbers: true,
  // bigNumberStrings: true, // important!
})

export const getConnection = promisify(pool.getConnection).bind(pool)

export const query = async (sql: string, params: unknown[]) =>
{
    let connection
    try
    {
        connection = await pool.getConnection()
        const [rows]: [unknown[], FieldPacket[]] = await connection.query(sql, params) as [unknown[], FieldPacket[]]

        return rows
    } catch (error) {
        console.error('Database query error:', error)
    } finally {

      if (connection)
          connection.release()
    }
}

export default pool