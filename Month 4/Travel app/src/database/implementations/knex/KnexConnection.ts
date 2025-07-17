import knex from 'knex';
import IDatabaseConnection from '../../interfaces/IDatabaseConnection';
import getKnexConfig from './knexConfig';
import dbConfig from '../../../config/database';

class KnexConnection extends IDatabaseConnection {
  client: any;
  connected: boolean;
  config: any;

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
      
      await this.testConnection();
      
      this.connected = true;
      console.log(`Successfully connected to ${dbConfig.type} database using Knex`);
      
      return this.client;
    } catch (error) {
      this.connected = false;
      if (error instanceof Error) {
        throw new Error(`Knex connection failed: ${error.message}`);
      } else {
        throw new Error('Knex connection failed: Unknown error');
      }
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
      if (error instanceof Error) {
        throw new Error(`Knex connection failed: ${error.message}`);
      } else {
        throw new Error('Knex connection failed: Unknown error');
      }
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

  async testConnection(): Promise<void> {
    try {
      if (!this.client) {
        throw new Error('Knex client not initialized');
      }
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
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Knex connection failed: ${error.message}`);
      } else {
        throw new Error('Knex connection failed: Unknown error');
      }
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
        migrations.forEach((migration: any) => {
          console.log(`  - ${migration}`);
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Knex connection failed: ${error.message}`);
      } else {
        throw new Error('Knex connection failed: Unknown error');
      }
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
        migrations.forEach((migration: any) => {
          console.log(`  - ${migration}`);
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Knex connection failed: ${error.message}`);
      } else {
        throw new Error('Knex connection failed: Unknown error');
      }
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

export default KnexConnection;