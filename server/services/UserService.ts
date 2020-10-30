import Knex from 'knex';


export class UserService {
  constructor(private knex: Knex) { }

  isCampaignVotedByHKID = async(HKID: string, campaign_id: string) => {
    const user = await this.knex("users")
    .select("users.*")
    .where("users.HKID", `=`, HKID)
    .andWhere("votes.campaign_id", `=`, campaign_id)
    .innerJoin("votes", "users.id", `=`, `votes.user_id`)
    .first()
    return user;
  }

  isUserAlreadyExisted = async (HKID: string) => {
    const user = await this.knex("users").select("users.*").where("users.HKID", `=`, HKID).first()
    return user;
  }

  voteByExistingUser = async (id: string, campaign_id: string, candidate_id:string,  PIN: string) => {
    await this.knex("votes")
      .insert({
        user_id: parseInt(id),
        campaign_id,
        candidate_id,
        PIN,
      })
  }

  vote = async(HKID: string, campaign_id: string, candidate_id:string,  PIN: string) => {
    const trx = await this.knex.transaction();
    try {
      const id :string = await trx("users")
      .insert({
        HKID
      }).returning("id")

      console.log(id)

      await trx("votes")
      .insert({
        user_id: parseInt(id),
        campaign_id,
        candidate_id,
        PIN,
      })
      await trx.commit();
    } catch(err) {
      console.log(err)
      await trx.rollback();
      throw err;
    }
  }
}