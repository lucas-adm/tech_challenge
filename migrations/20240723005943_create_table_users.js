export function up(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('username', 33).notNullable();
        table.string('email', 33).notNullable();
        table.string('password', 33).notNullable();
    })
}

export function down(knex) {
    return knex.schema.dropTable('users');
}