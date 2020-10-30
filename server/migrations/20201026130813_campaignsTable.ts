import * as Knex from "knex";

const campaignsTable = 'campaigns';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(campaignsTable, (table)=> {
    table.increments();
    table.string("campaign_name").notNullable();
    table.integer("total_votes").unsigned().notNullable();
    table.timestamp("start_time").notNullable();
    table.timestamp("end_time").notNullable();
    table.timestamps(false,true);
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(campaignsTable);
}

