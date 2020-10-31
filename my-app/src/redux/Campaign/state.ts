export interface ICandidate {
   id : string;
   candidate_name : string;
   campaign_id : number;
   created_at : Date;
   totalVotes : string;
}


export interface ICampaign {
   id: string;
   campaign_name: string;
   start_time: any;
   end_time: any;
   created_at: Date;
   updated_at: Date;
   totalVotes: string;
}


export interface ICampaignState {
   allCampaignsById: {
      [campaignId: string]: ICampaign;
   }
   campaignIdArray:  string[];

   allCampaignsByIdExpired: {
      [campaignId: string]: ICampaign;
   }
   campaignIdArrayExpired:  string[];


   singleCampaignById: {
      [campaignId: string]: ICampaign,
  },
   allCandidatesById: {
      [candidateId: string]: ICandidate;
   }
   candidateIdArray:  string[];

  
}


export const initCampaignState: ICampaignState = {

   allCampaignsById: {},
   campaignIdArray: [],
   allCampaignsByIdExpired: {},
   campaignIdArrayExpired: [],
   singleCampaignById: {},
   allCandidatesById: {},
   candidateIdArray: [],

}