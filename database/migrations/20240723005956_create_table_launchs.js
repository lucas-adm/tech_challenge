export function up(knex) {
    return knex.schema.createTable('launchs', (table) => {
        table.increments('id').primary();
        table.date('date');
        table.string('description', 77).notNullable();
        table.decimal('value', 10, 2).notNullable().unsigned();
        table.string('type', 33).notNullable();
    })
}

export function down(knex) {
    return knex.schema.dropTable('launchs');
}