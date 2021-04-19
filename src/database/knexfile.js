require("dotenv").config({ path: '../../.env' });
const { connectionString } = require("../config");
const parse = require("pg-connection-string").parse;
let dbConfig = parse(connectionString);
let ssl = { rejectUnauthorized: false };

module.exports = {

  production: {
    client: 'pg',
    connection: dbConfig,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  development: {
    client: 'pg',
    connection: {
      ...dbConfig,
      ssl
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};

console.log({
  ...dbConfig,
  ssl
})
