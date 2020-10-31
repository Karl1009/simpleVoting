import { ICampaignState , initCampaignState}  from "./state";
import {ICampaignActions} from "./actions"


import produce from "immer";

export function campaignReducers(state: ICampaignState = initCampaignState, action: ICampaignActions):ICampaignState {
   return produce(state, state => {
      switch(action.type){
         case "@@campaign/SET_EXISTING_CAMPAIGN":
            state.campaignIdArray= []
            for (const campaign of action.campaigns) {
            state.allCampaignsById[campaign.id] = campaign
            state.campaignIdArray.push(campaign.id)
         }
            break;

         case "@@campaign/SET_EXPIRED_CAMPAIGN":
            state.campaignIdArray= []
            for (const campaign of action.campaigns) {
            state.allCampaignsById[campaign.id] = campaign
            state.campaignIdArray.push(campaign.id)
         }
            break;
         case "@@campaign/SET_ALL_CAMPAIGNS":
           //existingCampaignsOrderedByTotalVotes
           state.campaignIdArray= []
            for (const campaign of action.existingCampaigns) {
            state.allCampaignsById[campaign.id] = campaign
            state.campaignIdArray.push(campaign.id)
         }
         // expiredCampaignOrderedByEndTime
            state.campaignIdArrayExpired = []
         for (const campaign of action.expiredCampaigns) {
            state.allCampaignsByIdExpired[campaign.id] = campaign
            state.campaignIdArrayExpired.push(campaign.id)
         }
            
            break;

         case "@@campaign/SET_CANDIDATE_BY_CAMPAIGN":
            state.candidateIdArray= []
            for (const candidate of action.candidates) {
               state.allCandidatesById[candidate.id] = candidate
               state.candidateIdArray.push(candidate.id)
            }
            state.singleCampaignById[action.campaign.id] = action.campaign
            
            break;
         default: 
         return state;
      }
   })
}
