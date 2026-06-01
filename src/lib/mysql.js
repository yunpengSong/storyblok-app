import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

// MySQL 连接配置
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'storyblok',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// 创建连接池
let pool;
let initialized = false;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

// 初始化数据库表
export async function initDatabase() {
  if (initialized) return;

  const connection = await getPool().getConnection();
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(50),
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // 迁移：添加新字段（如果不存在）
    const [columns] = await connection.query("SHOW COLUMNS FROM users LIKE 'title'");
    if (columns.length === 0) {
      await connection.query('ALTER TABLE users ADD COLUMN title VARCHAR(50) AFTER id');
      await connection.query('ALTER TABLE users ADD COLUMN first_name VARCHAR(255) AFTER title');
      await connection.query('ALTER TABLE users ADD COLUMN last_name VARCHAR(255) AFTER first_name');
      console.log('Added new columns to users table');
    }

    // 添加测试用户
    const testEmail = 'test@test.com';
    const testPassword = '123456';
    const [existing] = await connection.query('SELECT id FROM users WHERE email = ?', [testEmail]);

    if (existing.length === 0) {
      const hashedPassword = await bcrypt.hash(testPassword, 10);
      await connection.query('INSERT INTO users (email, password, title, first_name, last_name) VALUES (?, ?, ?, ?, ?)', [testEmail, hashedPassword, 'Dr', 'Test', 'User']);
      console.log(`Test user created: ${testEmail} / ${testPassword}`);
    }

    console.log('Database initialized.');
    initialized = true;
  } finally {
    connection.release();
  }
}

// MySQL 版本的 db
export const mysqlDb = {
  users: {
    create: async (data) => {
      await initDatabase();
      const pool = getPool();
      const [result] = await pool.query(
        'INSERT INTO users (title, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)',
        [data.title, data.firstName, data.lastName, data.email, data.password]
      );
      return { id: result.insertId, email: data.email };
    },
    findUnique: async ({ where }) => {
      await initDatabase();
      const pool = getPool();
      if (where.email) {
        const [rows] = await pool.query(
          'SELECT * FROM users WHERE email = ?',
          [where.email]
        );
        return rows[0] || null;
      }
      if (where.id) {
        const [rows] = await pool.query(
          'SELECT * FROM users WHERE id = ?',
          [where.id]
        );
        return rows[0] || null;
      }
      return null;
    }
  }
};
