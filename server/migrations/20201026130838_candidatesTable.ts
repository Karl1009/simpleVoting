import * as Knex from "knex";

const candidatesTable = "candidates";
const campaignsTable = "campaigns";
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(candidatesTable, (table)=> {
    table.increments();
    table.string("candidate_name").notNullable();
    table.integer("campaign_id").unsigned().notNullable();
    table.foreign("campaign_id").references(`${campaignsTable}.id`)
    table.timestamps(false,true);
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(candidatesTable);
}

