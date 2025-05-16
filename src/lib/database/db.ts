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
  charset: "utf8mb4",
  // bigNumberStrings: true, // important!
})

export const getConnection = promisify(pool.getConnection).bind(pool)

export default pool