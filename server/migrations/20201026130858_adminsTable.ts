import * as Knex from "knex";

const adminsTable = "admins";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(adminsTable, (table)=> {
    table.increments();
    table.string("admin_name").notNullable().unique();
    table.string("password").notNullable();
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(adminsTable);
}

