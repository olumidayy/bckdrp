
exports.up = function(knex) {
    return knex.schema.createTable('url', function (table) {
		table.string('id');
		table.string('url');
		table.timestamp('created_at').defaultTo(knex.fn.now());
	});
};

exports.down = function(knex) {
    return knex.schema.dropTable('url');
};
