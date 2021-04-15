require('dotenv').config();

module.exports = {
    connectionString: process.env.DATABASE_URL,
    port: process.env.PORT || 8080,
    env: process.env.NODE_ENV || 'development',
    baseUrl: process.env.NODE_ENV ? 'https://bckdrp.herokuapp.com' : 'http://localhost:4000'
}