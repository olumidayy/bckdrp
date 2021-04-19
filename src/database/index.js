const knex = require("knex");
const { env } = require("../config");
const config = require('./knexfile');

let db = knex(config[env]);

async function destroyClient() {
  await db.destroy();
}

module.exports = {
  db,
  destroyClient
};
