require('dotenv').config();

module.exports = {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'postgres',
    define: {
      timestamps: true,
      underscored: false,
      underscoredAll: false
    },
    dialectOptions: {
      ssl: process.env.DB_SSL == "true"
    }
  };