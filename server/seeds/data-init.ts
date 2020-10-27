import * as Knex from "knex";
import { hashPassword } from "../hash";


const usersTable = "users";
const campaignsTable = "campaigns";
const candidatesTable = "candidates";
const votesTable = "votes";
const adminsTable = "admins";



export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(adminsTable).del();
    await knex(votesTable).del();
    await knex(candidatesTable).del();
    await knex(campaignsTable).del();
    await knex(usersTable).del();
   

    // Inserts user's HKID template
    const userId = await knex(usersTable)
        .insert([
            {  HKID: "G4716247" },
        ]).returning("id");

    // Inserts campaign template
    const campaignId = await knex(campaignsTable)
        .insert([
            {
                campaign_name: "Who is the best NBA player in the history",
                start_time: "2020-10-15",
                end_time: "2020-11-15"
            },
            {
                campaign_name: "Which HK CEO candidate you are preferred",
                start_time: "2020-10-15",
                end_time: "2020-11-15"
            },
            {
                campaign_name: "Who will win the American Election of 2020?",
                start_time: "2020-10-15",
                end_time: "2020-11-15"
            },
            {
                campaign_name: "What drink do you like the most?",
                start_time: "2020-10-15",
                end_time: "2020-11-15"
            },
        ]).returning("id");

    // Inserts candidates for each campaign
    const candidateId_of_campaign_1 = await knex(candidatesTable)
        .insert([
            {candidate_name: "Michael Jordan", campaign_id: campaignId[0], total_vote: 193839},
            {candidate_name: "Kobe Byant", campaign_id: campaignId[0], total_vote: 30402},
            {candidate_name: "Lebron James", campaign_id: campaignId[0], total_vote: 50023},
            {candidate_name: "Stephen Curry", campaign_id: campaignId[0], total_vote: 60022}
        ]).returning("id");

    const candidateId_of_campaign_2 = await knex(candidatesTable)
        .insert([
            {candidate_name: "Carrie Lam", campaign_id: campaignId[1], total_vote: 1383902},
            {candidate_name: "John Tsang", campaign_id: campaignId[1], total_vote: 4040300},
            {candidate_name: "Rebecca Ip", campaign_id: campaignId[1], total_vote: 230030},
        ]).returning("id");

    const candidateId_of_campaign_3 = await knex(candidatesTable)
        .insert([
            {candidate_name: "Donald Trump", campaign_id: campaignId[2], total_vote: 2000000},
            {candidate_name: "Joe Biden", campaign_id: campaignId[2], total_vote: 200000},
            {candidate_name: "Hillary Clinton", campaign_id: campaignId[2], total_vote: 19990},
        ]).returning("id");

    const candidateId_of_campaign_4 = await knex(candidatesTable)
        .insert([
            {candidate_name: "Coke", campaign_id: campaignId[3], total_vote: 30000},
            {candidate_name: "Orange juice", campaign_id: campaignId[3], total_vote: 20000},
            {candidate_name: "Beer", campaign_id: campaignId[3], total_vote: 50000},
        ]).returning("id");

    // Inserts votes

    await knex(votesTable)
        .insert([
            {user_id: userId[0], campaign_id: campaignId[0], candidate_id: candidateId_of_campaign_1[0], PIN: "1111"}, //voted Kobe Byant
            {user_id: userId[0], campaign_id: campaignId[1], candidate_id: candidateId_of_campaign_2[2], PIN: "1112"}, //voted Rebecca Ip
            {user_id: userId[0], campaign_id: campaignId[2], candidate_id: candidateId_of_campaign_3[0], PIN: "1113"}, //voted Donald Trump
            {user_id: userId[0], campaign_id: campaignId[3], candidate_id: candidateId_of_campaign_4[2], PIN: "1114"} //voted Beer
        ])

    const hashedPassword = await hashPassword("1234");

    await knex(adminsTable)
        .insert([
            {admin_name: "admin", password: hashedPassword},
        ])
};
