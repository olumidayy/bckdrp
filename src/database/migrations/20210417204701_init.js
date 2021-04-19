
exports.up = function(knex) {
    return knex.schema.createTable('urls', function (table) {
		table.string('id');
		table.string('url');
		table.timestamp('created_at').defaultTo(knex.fn.now());
	});
};

exports.down = function(knex) {
    return knex.schema.dropTable('urls');
};
