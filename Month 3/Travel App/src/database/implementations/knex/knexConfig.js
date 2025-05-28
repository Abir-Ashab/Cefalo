const dbConfig = require('../../../config/database');

const getKnexConfig = () => {
  const baseConfig = {
    pool: dbConfig.pool,
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds'
    }
  };

  switch (dbConfig.type) {
    case 'postgresql':
      return {
        ...baseConfig,
        client: 'pg',
        connection: {
          host: dbConfig.postgresql.host,
          port: dbConfig.postgresql.port,
          database: dbConfig.postgresql.database,
          user: dbConfig.postgresql.user,
          password: dbConfig.postgresql.password,
          ssl: dbConfig.postgresql.ssl
        }
      };

    case 'mysql':
      return {
        ...baseConfig,
        client: 'mysql2',
        connection: {
          host: dbConfig.mysql.host,
          port: dbConfig.mysql.port,
          database: dbConfig.mysql.database,
          user: dbConfig.mysql.user,
          password: dbConfig.mysql.password
        }
      };

    case 'sqlite':
      return {
        ...baseConfig,
        client: 'sqlite3',
        connection: {
          filename: dbConfig.sqlite.filename
        },
        useNullAsDefault: true
      };

    default:
      throw new Error(`Unsupported database type for Knex: ${dbConfig.type}`);
  }
};

module.exports = getKnexConfig;