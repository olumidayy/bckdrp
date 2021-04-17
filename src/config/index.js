require('dotenv').config({ path: "../../.env" });

module.exports = {
    connectionString: process.env.DATABASE_URL,
    port: process.env.PORT || 4000,
    env: (process.env.NODE_ENV || 'development'),
    baseUrl: process.env.NODE_ENV == 'production' ? 'https://bckdrp.herokuapp.com' : 'http://localhost:4000'
}