require("dotenv").config({ path: '../../.env' });
const { connectionString, env } = require("../config");
const parse = require("pg-connection-string");
let localConnectionVars = parse(connectionString);


module.exports = {

  development: {
    client: 'pg',
    connection: localConnectionVars,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  test: {
    client: 'pg',
    connection: localConnectionVars,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      connectionString,
      ssl: { rejectUnauthorized: false }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}[env];
