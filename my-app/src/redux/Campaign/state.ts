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

   singleCampaignById: {
      [campaignId: string]: ICampaign,
  },

   allCandidatesById: {
      [candidateId: string]: ICandidate;
   }
   candidateIdArray:  string[];

   // allCampaignsByTotalVotes: {
   //    [campaignId: number]: ICampaign;
   // }
   // campaignTotalVotesArray: number[];

}


export const initCampaignState: ICampaignState = {
   // campaign: [],
   allCampaignsById: {},
   singleCampaignById: {},
   campaignIdArray: [],

   allCandidatesById: {},
   candidateIdArray: [],
   // allCampaignsByTotalVotes: {},
   // campaignTotalVotesArray:[],
}