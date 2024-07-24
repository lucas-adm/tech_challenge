export function up(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('username', 33).notNullable().unique();
        table.string('email', 50).notNullable().unique();
        table.string('password', 33).notNullable();
    })
}

export function down(knex) {
    return knex.schema.dropTable('users');
}