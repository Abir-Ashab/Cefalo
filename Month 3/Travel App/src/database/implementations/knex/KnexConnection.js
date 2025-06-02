const knex = require('knex');
const IDatabaseConnection = require('../../interfaces/IDatabaseConnection');
const getKnexConfig = require('./knexConfig');
const dbConfig = require('../../../config/database');

class KnexConnection extends IDatabaseConnection {
  constructor() {
    super();
    this.client = null;
    this.connected = false;
    this.config = getKnexConfig();
  }

  async connect() {
    try {
      console.log(`Connecting to ${dbConfig.type} database using Knex...`);
      
      this.client = knex(this.config);
      
      // Test the connection
      await this.testConnection();
      
      this.connected = true;
      console.log(`Successfully connected to ${dbConfig.type} database using Knex`);
      
      return this.client;
    } catch (error) {
      this.connected = false;
      throw new Error(`Knex connection failed: ${error.message}`);
    }
  }

  async disconnect() {
    try {
      if (this.client) {
        await this.client.destroy();
        this.connected = false;
        console.log('Knex database connection closed');
      }
    } catch (error) {
      throw new Error(`Failed to disconnect Knex: ${error.message}`);
    }
  }

  getClient() {
    if (!this.client || !this.connected) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return this.client;
  }

  isConnected() {
    return this.connected && this.client !== null;
  }

  async testConnection() {
    try {
      if (!this.client) {
        throw new Error('Knex client not initialized');
      }

      // Test connection based on database type
      switch (dbConfig.type) {
        case 'postgresql':
          await this.client.raw('SELECT 1');
          break;
        case 'mysql':
          await this.client.raw('SELECT 1');
          break;
        case 'sqlite':
          await this.client.raw('SELECT 1');
          break;
        default:
          throw new Error(`Unsupported database type: ${dbConfig.type}`);
      }
      
      return true;
    } catch (error) {
      throw new Error(`Connection test failed: ${error.message}`);
    }
  }

  async runMigrations() {
    try {
      if (!this.client) {
        throw new Error('Database not connected');
      }

      console.log('Running migrations...');
      const [batch, migrations] = await this.client.migrate.latest();
      
      if (migrations.length === 0) {
        console.log('No migrations to run');
      } else {
        console.log(`Ran ${migrations.length} migrations in batch ${batch}`);
        migrations.forEach(migration => {
          console.log(`  - ${migration}`);
        });
      }
    } catch (error) {
      throw new Error(`Migration failed: ${error.message}`);
    }
  }

  async rollbackMigrations() {
    try {
      if (!this.client) {
        throw new Error('Database not connected');
      }

      console.log('Rolling back migrations...');
      const [batch, migrations] = await this.client.migrate.rollback();
      
      if (migrations.length === 0) {
        console.log('No migrations to rollback');
      } else {
        console.log(`Rolled back ${migrations.length} migrations from batch ${batch}`);
        migrations.forEach(migration => {
          console.log(`  - ${migration}`);
        });
      }
    } catch (error) {
      throw new Error(`Rollback failed: ${error.message}`);
    }
  }

  getConnectionInfo() {
    return {
      orm: 'knex',
      type: dbConfig.type,
      connected: this.connected,
      config: {
        client: this.config.client,
        database: this.config.connection.database || this.config.connection.filename,
        host: this.config.connection.host || 'file',
        port: this.config.connection.port || null
      }
    };
  }
}

module.exports = KnexConnection;