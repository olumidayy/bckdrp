require('dotenv').config();

module.exports = {
    connectionString: process.env.DATABASE_URL,
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    baseUrl: process.env.NODE_ENV 
}