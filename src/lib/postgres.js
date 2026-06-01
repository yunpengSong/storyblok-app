import pg from 'pg';
import bcrypt from 'bcryptjs';

const { Pool } = pg;

// PostgreSQL 连接配置
const isLocalhost = process.env.MYSQL_HOST === 'localhost' || !process.env.MYSQL_HOST;
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '5432'),
  user: process.env.MYSQL_USER || 'postgres',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'postgres',
  max: 10,
  ssl: !isLocalhost ? { rejectUnauthorized: false } : false
};

// 创建连接池
let pool;
let initialized = false;

export function getPool() {
  if (!pool) {
    pool = new Pool(dbConfig);
  }
  return pool;
}

// 初始化数据库表
export async function initDatabase() {
  if (initialized) return;

  const client = await getPool().connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        title VARCHAR(50),
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 添加测试用户
    const testEmail = 'test@test.com';
    const testPassword = '123456';
    const result = await client.query('SELECT id FROM users WHERE email = $1', [testEmail]);

    if (result.rows.length === 0) {
      const hashedPassword = await bcrypt.hash(testPassword, 10);
      await client.query(
        'INSERT INTO users (email, password, title, first_name, last_name) VALUES ($1, $2, $3, $4, $5)',
        [testEmail, hashedPassword, 'Dr', 'Test', 'User']
      );
      console.log(`Test user created: ${testEmail} / ${testPassword}`);
    }

    console.log('Database initialized.');
    initialized = true;
  } finally {
    client.release();
  }
}

// PostgreSQL 版本的 db
export const postgresDb = {
  users: {
    create: async (data) => {
      await initDatabase();
      const pool = getPool();
      const result = await pool.query(
        'INSERT INTO users (title, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [data.title, data.firstName, data.lastName, data.email, data.password]
      );
      return { id: result.rows[0].id, email: data.email };
    },
    findUnique: async ({ where }) => {
      await initDatabase();
      const pool = getPool();
      if (where.email) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [where.email]);
        return result.rows[0] || null;
      }
      if (where.id) {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [where.id]);
        return result.rows[0] || null;
      }
      return null;
    }
  }
};
