import { mysqlDb } from './mysql';
import { postgresDb } from './postgres';

// 根据环境变量选择数据库类型，默认 postgres
const dbType = process.env.DB_TYPE || 'postgres';

export const db = dbType === 'mysql' ? mysqlDb : postgresDb;
