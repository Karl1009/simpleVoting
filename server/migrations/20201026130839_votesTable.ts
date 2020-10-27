import * as Knex from "knex";

const votesTable = "votes";
const usersTable = "users";
const campaignsTable = "campaigns";
const candidatesTable = "candidates";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(votesTable, (table)=> {
    table.increments();
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references(`${usersTable}.id`)
    table.integer("campaign_id").unsigned().notNullable();
    table.foreign("campaign_id").references(`${campaignsTable}.id`)
    table.integer("candidate_id").unsigned().notNullable();
    table.foreign("candidate_id").references(`${candidatesTable}.id`)
    table.string("PIN").notNullable();
    table.timestamps(false,true);
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(votesTable);
}

