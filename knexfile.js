import dotenv from 'dotenv';
dotenv.config();

/* eslint-disable no-undef */

export default {
  client: 'pg',
  connection: {
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};