exports.up = function(knex) {
    return knex.schema.createTable('projects', function(table){
        table.increments('id')
        table.text('title').notNullable();

        table.integer('user_id')
            .references('users.id')
            .notNullable()
            .onDelete('CASCADE')

  
        table.timestamps(true, true) // create time
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users')
  };
  