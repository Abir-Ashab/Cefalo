/**
 * Database Connection Interface
 * All database implementations must implement this interface
 */
class IDatabaseConnection {
  /**
   * Initialize and establish database connection
   * @returns {Promise<void>}
   */
  async connect() {
    throw new Error('Method connect() must be implemented');
  }

  /**
   * Close database connection
   * @returns {Promise<void>}
   */
  async disconnect() {
    throw new Error('Method disconnect() must be implemented');
  }

  /**
   * Get the database client/instance
   * @returns {Object} Database client
   */
  getClient() {
    throw new Error('Method getClient() must be implemented');
  }

  /**
   * Check if database is connected
   * @returns {Boolean}
   */
  isConnected() {
    throw new Error('Method isConnected() must be implemented');
  }

  /**
   * Test database connection
   * @returns {Promise<Boolean>}
   */
  async testConnection() {
    throw new Error('Method testConnection() must be implemented');
  }

  /**
   * Run database migrations (if supported)
   * @returns {Promise<void>}
   */
  async runMigrations() {
    throw new Error('Method runMigrations() must be implemented');
  }

  /**
   * Rollback migrations (if supported)
   * @returns {Promise<void>}
   */
  async rollbackMigrations() {
    throw new Error('Method rollbackMigrations() must be implemented');
  }

  /**
   * Get database connection info
   * @returns {Object}
   */
  getConnectionInfo() {
    throw new Error('Method getConnectionInfo() must be implemented');
  }
}

module.exports = IDatabaseConnection;
