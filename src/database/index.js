const knex = require("knex");
const { env } = require("../config");
const variables = require('./knexfile');

let db = knex(variables[env]);

module.exports = db;
