class IDatabaseConnection {
  async connect() {
    throw new Error('Method connect() must be implemented');
  }

  async disconnect() {
    throw new Error('Method disconnect() must be implemented');
  }

  getClient() {
    throw new Error('Method getClient() must be implemented');
  }

  isConnected() {
    throw new Error('Method isConnected() must be implemented');
  }

  async testConnection() {
    throw new Error('Method testConnection() must be implemented');
  }

  async runMigrations() {
    throw new Error('Method runMigrations() must be implemented');
  }

  async rollbackMigrations() {
    throw new Error('Method rollbackMigrations() must be implemented');
  }

  getConnectionInfo() {
    throw new Error('Method getConnectionInfo() must be implemented');
  }
}

module.exports = IDatabaseConnection;