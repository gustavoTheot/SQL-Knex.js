exports.up = function(knex) {
  return knex.schema.createTable('users', function(table){
      table.increments('id')
      table.text('username').unique().notNullable();

      table.timestamp('created_at').defaultTo(knex.fn.now()) // creation time
      table.timestamp('update_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
