require('dotenv').config();

const path = require('path');

module.exports = {
  development: {
    client: getClient(),
    connection: getConnection(),
    migrations: {
      directory: path.join(__dirname, 'migrations'),
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: path.join(__dirname, 'seeds')
    },
    useNullAsDefault: process.env.DB_TYPE === 'sqlite'
  }
}

function getClient() {
  switch (process.env.DB_TYPE) {
    case 'postgresql':
      return 'pg';
    case 'mysql':
      return 'mysql2';
    case 'sqlite':
      return 'sqlite3';
    default:
      return 'sqlite3'; // Default fallback
  }
}

function getConnection() {
  switch (process.env.DB_TYPE) {
    case 'postgresql':
      return {
        host: process.env.PG_HOST || 'localhost',
        port: parseInt(process.env.PG_PORT) || 5432,
        database: process.env.PG_DATABASE || 'travel app',
        user: process.env.PG_USER || 'postgres',
        password: process.env.PG_PASSWORD || '312889',
        ssl: process.env.PG_SSL === 'true' ? { rejectUnauthorized: false } : false
      };

    case 'mysql':
      return {
        host: process.env.MYSQL_HOST || 'localhost',
        port: parseInt(process.env.MYSQL_PORT) || 3306,
        database: process.env.MYSQL_DATABASE || 'myapp_dev',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'password'
      };

    case 'sqlite':
    default:
      return {
        filename: process.env.SQLITE_PATH || path.join(__dirname, 'database.sqlite')
      };
  }
}
