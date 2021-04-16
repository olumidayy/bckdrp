const knex = require("knex");
const config = require('./knexfile');

let db = knex(config);

async function destroyClient() {
  await db.destroy();
}

module.exports = {
  db,
  destroyClient
};
