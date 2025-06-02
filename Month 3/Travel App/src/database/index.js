const DatabaseFactory = require('./factories/DatabaseFactory');

module.exports = {
  DatabaseFactory,
  initialize: () => DatabaseFactory.initialize(),
  getConnection: () => DatabaseFactory.getConnection(),
  disconnect: () => DatabaseFactory.disconnect(),
  testConnection: () => DatabaseFactory.testConnection(),
  runMigrations: () => DatabaseFactory.runMigrations(),
  rollbackMigrations: () => DatabaseFactory.rollbackMigrations(),
  getConnectionInfo: () => DatabaseFactory.getConnectionInfo()
};

