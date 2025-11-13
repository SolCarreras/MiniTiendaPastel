require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,      // sin \instancia
    dialect: 'mssql',
    port: parseInt(process.env.DB_PORT || '1433', 10),
    dialectOptions: {
      options: {
        instanceName: process.env.DB_INSTANCE || undefined,
        encrypt: false,
        trustServerCertificate: true
      }
    },
    define: {
      timestamps: true,
      underscored: false
    }
  },
  test: { /* similar si lo necesitás */ },
  production: { /* similar con vars de producción */ }
};
