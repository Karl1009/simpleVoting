import * as Knex from "knex";


const usersTable = "users";
const campaignsTable = "campaigns";
const candidatesTable = "candidates";
const votesTable = "votes";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(votesTable).del();
    await knex(candidatesTable).del();
    await knex(campaignsTable).del();
    await knex(usersTable).del();
   

    // Inserts user's HKID template
    const userId = await knex(usersTable)
        .insert([
            {  HKID: "G4716247" },
            { HKID: "P2107698"},
        ]).returning("id");

    // Inserts campaign template
    const campaignId = await knex(campaignsTable)
        .insert([
            {
                campaign_name: "Who is the best NBA player in the history?",
                total_votes: 0,
                start_time: "2020-10-15",
                end_time: "2020-11-15"
            },
            {
                campaign_name: "Which HK CEO candidate you are preferred?",
                total_votes: 0,
                start_time: "2020-10-15",
                end_time: "2020-11-15"
            },
            {
                campaign_name: "Who will win the American Election of 2020?",
                total_votes: 0,
                start_time: "2020-10-15",
                end_time: "2020-11-15"
            },
            {
                campaign_name: "What drink do you like the most?",
                total_votes: 0,
                start_time: "2020-10-15",
                end_time: "2020-11-15"
            },
            {
                campaign_name: "What sport do you like the most?",
                total_votes: 0,
                start_time: "2020-10-15",
                end_time: "2020-10-16"
            },
            {
                campaign_name: "What is your favorite superstar?",
                total_votes: 0,
                start_time: "2020-10-13",
                end_time: "2020-10-16"
            },
        ]).returning("id");

    // Inserts candidates for each campaign
    const candidateId_of_campaign_1 = await knex(candidatesTable)
        .insert([
            {candidate_name: "Michael Jordan", campaign_id: campaignId[0]},
            {candidate_name: "Kobe Byant", campaign_id: campaignId[0]},
            {candidate_name: "Lebron James", campaign_id: campaignId[0]},
            {candidate_name: "Stephen Curry", campaign_id: campaignId[0]}
        ]).returning("id");

    const candidateId_of_campaign_2 = await knex(candidatesTable)
        .insert([
            {candidate_name: "Carrie Lam", campaign_id: campaignId[1]},
            {candidate_name: "John Tsang", campaign_id: campaignId[1]},
            {candidate_name: "Rebecca Ip", campaign_id: campaignId[1]},
        ]).returning("id");

    const candidateId_of_campaign_3 = await knex(candidatesTable)
        .insert([
            {candidate_name: "Donald Trump", campaign_id: campaignId[2]},
            {candidate_name: "Joe Biden", campaign_id: campaignId[2]},
            {candidate_name: "Hillary Clinton", campaign_id: campaignId[2]},
        ]).returning("id");

    const candidateId_of_campaign_4 = await knex(candidatesTable)
        .insert([
            {candidate_name: "Coke", campaign_id: campaignId[3]},
            {candidate_name: "Orange juice", campaign_id: campaignId[3]},
            {candidate_name: "Beer", campaign_id: campaignId[3]},
        ]).returning("id");

    const candidateId_of_campaign_5 = await knex(candidatesTable)
    .insert([
        {candidate_name: "Football", campaign_id: campaignId[4]},
        {candidate_name: "Brasketball", campaign_id: campaignId[4]},
        {candidate_name: "Tennis", campaign_id: campaignId[4]},
    ]).returning("id");

    const candidateId_of_campaign_6 = await knex(candidatesTable)
        .insert([
            {candidate_name: "Michael Jackson", campaign_id: campaignId[5]},
            {candidate_name: "Bruno Mars", campaign_id: campaignId[5]},
            {candidate_name: "Justin Bieber", campaign_id: campaignId[5]},
        ]).returning("id");

    // Inserts votes

    await knex(votesTable)
        .insert([
            {user_id: userId[0], campaign_id: campaignId[0], candidate_id: candidateId_of_campaign_1[0], PIN: "1111"}, //voted Michael Jordan
            {user_id: userId[0], campaign_id: campaignId[1], candidate_id: candidateId_of_campaign_2[2], PIN: "1112"}, //voted Rebecca Ip
            {user_id: userId[0], campaign_id: campaignId[2], candidate_id: candidateId_of_campaign_3[0], PIN: "1113"}, //voted Donald Trump
            {user_id: userId[0], campaign_id: campaignId[3], candidate_id: candidateId_of_campaign_4[2], PIN: "1114"}, //voted Beer
            {user_id: userId[1], campaign_id: campaignId[0], candidate_id: candidateId_of_campaign_1[0], PIN: "1115"}, //voted Michael Jordan
            {user_id: userId[1], campaign_id: campaignId[4], candidate_id: candidateId_of_campaign_5[1], PIN: "1116"}, //voted BrasketBall
            {user_id: userId[1], campaign_id: campaignId[5], candidate_id: candidateId_of_campaign_6[0], PIN: "1117"}, //voted MJ
            {user_id: userId[1], campaign_id: campaignId[3], candidate_id: candidateId_of_campaign_4[2], PIN: "1116"}, //voted Beer
        ])

    
};
