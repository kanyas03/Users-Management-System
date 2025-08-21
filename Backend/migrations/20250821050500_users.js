export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();   // auto id
    table.string('name');               // name
    table.string('email').unique();     // unique email
    table.string('gender');             // Male/Female
    table.boolean('deleted').defaultTo(false); // soft delete
    table.timestamps(true, true);       // created_at, updated_at
  });
}

export async function down(knex) {
  await knex.schema.dropTable('users');
}
