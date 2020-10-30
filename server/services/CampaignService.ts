import Knex from 'knex';


export class CampaignService {
  constructor(private knex: Knex) { }

  allExistingCampaigns = async()=> {
   const campaign = await this.knex("campaigns")
   .select("campaigns.*")
   .where("end_time", ">" , new Date())
   .orderBy("total_votes", "desc")

   return campaign
  }

  allExpiredCampaigns = async()=> {
   const campaign = await this.knex("campaigns")
   .select("campaigns.*")
   .where("end_time", "<" , new Date())
   .orderBy("end_time", "asc")

   return campaign

  }



  newCampaign = async(campaign_name: string, candidates_name: any[], start_time: string, end_time: string)=> {
    const trx = await this.knex.transaction()
    try{
      const campaign_id:string = await trx("campaigns")
      .insert({
      campaign_name,
      total_votes: 0,
      start_time,
      end_time,
      }).returning("id")

      for (let candidate_name of candidates_name) {
        await trx("candidates")
        .insert({
        candidate_name,
        campaign_id: parseInt(campaign_id),
        })
      }
      await trx.commit();
      return campaign_id;
    } catch(err) {
      await trx.rollback();
      throw err;
    }
  }

  candidateBySingleCampaign = async(campaign_id: string)=> {
    const candidate = await this.knex("candidates")
    .select("candidates.*")
    .where("candidates.campaign_id", "=" , campaign_id)
    .orderBy("id", "asc")
 
    return candidate
   }

   singleCampaign = async(campaign_id:string)=> {
    const campaign = await this.knex("campaigns")
    .select("campaigns.*")
    .where("campaigns.id" , "=", campaign_id)
    .first();
    return campaign
   }

   totalVotesByCampaign = async(campaign_id:string)=> {
     const totalVotes = await this.knex("votes")
     .count("id")
     .where("votes.campaign_id", `=` , campaign_id)

     await this.knex("campaigns")
     .update("total_votes", totalVotes[0].count)
     .where("campaigns.id", "=" , campaign_id)
    return totalVotes;
   }

   totalVotesByCandidate = async(candidate_id:string, campaign_id:string)=> {
    const totalVotes = await this.knex("votes")
    .count("id")
    .where("votes.candidate_id", `=` , candidate_id)
    .andWhere("votes.campaign_id", `=`, campaign_id)
   return totalVotes;
  }

}
