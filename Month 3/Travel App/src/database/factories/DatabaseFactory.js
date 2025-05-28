const dbConfig = require('../../config/database');

// ORMs
const KnexConnection = require('../implementations/knex/KnexConnection');
// const PrismaConnection = require('../implementations/prisma/PrismaConnection');
// const TypeORMConnection = require('../implementations/typeorm/TypeORMConnection');
// const MongooseConnection = require('../implementations/mongoose/MongooseConnection');

class DatabaseFactory {
  static instance = null;
  static connection = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = new DatabaseFactory();
    }
    return this.instance;
  }

  static createConnection() {
    console.log(`Creating ${dbConfig.orm} connection for ${dbConfig.type} database...`);

    switch (dbConfig.orm.toLowerCase()) {
      case 'knex':
        return new KnexConnection();
      case 'prisma':
        return new PrismaConnection();
      case 'typeorm':
        return new TypeORMConnection();
      case 'mongoose':
        return new MongooseConnection();
      default:
        throw new Error(`Unsupported ORM: ${dbConfig.orm}`);
    }
  }

  static async initialize() {
    try {
      if (this.connection && this.connection.isConnected()) {
        console.log('Database already connected');
        return this.connection;
      }

      this.connection = this.createConnection();
      await this.connection.connect();
      
      console.log('Database initialization completed');
      return this.connection;
    } catch (error) {
      console.error('Database initialization failed:', error.message);
      throw error;
    }
  }

  static getConnection() {
    if (!this.connection) {
      throw new Error('Database not initialized. Call DatabaseFactory.initialize() first.');
    }
    
    if (!this.connection.isConnected()) {
      throw new Error('Database connection lost. Reinitialize the connection.');
    }
    
    return this.connection;
  }

  static async disconnect() {
    try {
      if (this.connection) {
        await this.connection.disconnect();
        this.connection = null;
        console.log('Database disconnected successfully');
      }
    } catch (error) {
      console.error('Database disconnection failed:', error.message);
      throw error;
    }
  }

  static getConnectionInfo() {
    if (!this.connection) {
      return {
        status: 'Not connected',
        orm: dbConfig.orm,
        type: dbConfig.type
      };
    }
    
    return this.connection.getConnectionInfo();
  }

  static async testConnection() {
    if (!this.connection) {
      throw new Error('No database connection available');
    }
    
    return await this.connection.testConnection();
  }

  static async runMigrations() {
    if (!this.connection) {
      throw new Error('No database connection available');
    }
    
    return await this.connection.runMigrations();
  }

  static async rollbackMigrations() {
    if (!this.connection) {
      throw new Error('No database connection available');
    }
    
    return await this.connection.rollbackMigrations();
  }
}

module.exports = DatabaseFactory;