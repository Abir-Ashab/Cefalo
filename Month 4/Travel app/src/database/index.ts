import DatabaseFactory from './factories/DatabaseFactory';

export { DatabaseFactory };
export const initialize = () => DatabaseFactory.initialize();
export const getConnection = () => DatabaseFactory.getConnection();
export const disconnect = () => DatabaseFactory.disconnect();
export const testConnection = () => DatabaseFactory.testConnection();
export const runMigrations = () => DatabaseFactory.runMigrations();
export const rollbackMigrations = () => DatabaseFactory.rollbackMigrations();
export const getConnectionInfo = () => DatabaseFactory.getConnectionInfo();

