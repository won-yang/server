import { Pool } from 'pg';
import { config } from 'dotenv';

config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASS,
  port: 5432,
  max: 20,
});

export default pool;
