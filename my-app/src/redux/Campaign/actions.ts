import { ICampaign, ICandidate } from "./state"


export const setExistingCampaign = (campaigns: ICampaign[]) => {
   return {
      type: '@@campaign/SET_EXISTING_CAMPAIGN' as '@@campaign/SET_EXISTING_CAMPAIGN',
      campaigns,
  } 
}

export const setExpiredCampaign = (campaigns: ICampaign[]) => {
   return {
      type: '@@campaign/SET_EXPIRED_CAMPAIGN' as '@@campaign/SET_EXPIRED_CAMPAIGN',
      campaigns,
  } 
}

export const setAllCampaigns = (existingCampaigns: ICampaign[], expiredCampaigns:ICampaign[]) => {
   return {
      type: '@@campaign/SET_ALL_CAMPAIGNS' as '@@campaign/SET_ALL_CAMPAIGNS',
      existingCampaigns,
      expiredCampaigns,
  } 
}


export const setSingleCampaign = (candidates: ICandidate[], campaign: ICampaign) => {
   return { 
      type: "@@campaign/SET_CANDIDATE_BY_CAMPAIGN" as "@@campaign/SET_CANDIDATE_BY_CAMPAIGN",
      candidates,
      campaign,
   }
}

export type ICampaignActions = ReturnType<
typeof setExistingCampaign |
typeof setExpiredCampaign |
typeof setSingleCampaign |
typeof setAllCampaigns
>
