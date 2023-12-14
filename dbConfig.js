// dbConfig.js
require('dotenv').config(); // Load environment variables from a .env file
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const dbConfig = {
  host: DB_HOST, 
  user: DB_USER, 
  password: DB_PASSWORD, 
  database: DB_DATABASE 
};

module.exports = dbConfig;
