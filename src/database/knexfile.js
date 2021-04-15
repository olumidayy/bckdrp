const { connectionString } = require("../config");

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'olumide',
      database : 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: connectionString,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
