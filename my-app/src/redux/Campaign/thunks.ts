import { Dispatch } from "redux";
   
import { setSingleCampaign, setExistingCampaign, setExpiredCampaign, setAllCampaigns } from "./actions"


const {REACT_APP_API_SERVER} = process.env;


export const setExistingCampaignsThunk =()=> {
   return async (dispatch: Dispatch) => {
         const res = await fetch(`${REACT_APP_API_SERVER}/campaign/allExistingCampaigns`);
         if(res.status === 200) {
            const result = await res.json();
            console.log(result)
     
            dispatch(setExistingCampaign(result))
         }
   }
}

export const setExpiredCampaignThunk =()=> {
   return async (dispatch: Dispatch) => {
         const res = await fetch(`${REACT_APP_API_SERVER}/campaign/allExpiredCampaigns`);
         if(res.status === 200) {
            const result = await res.json();
            console.log(result)
     
            dispatch(setExpiredCampaign(result))
         }
   }
}

export const setAllCampaignsThunk =()=> {
   return async (dispatch: Dispatch) => {
      const res1 = await fetch(`${REACT_APP_API_SERVER}/campaign/allExistingCampaigns`);
            const existingCampaigns = await res1.json();
            console.log(existingCampaigns)
      const res2 = await fetch(`${REACT_APP_API_SERVER}/campaign/allExpiredCampaigns`);
         const expiredCampaigns = await res2.json();
         console.log(expiredCampaigns)
      dispatch(setAllCampaigns(existingCampaigns, expiredCampaigns))
   }
}


export const setSingleCampaignThunk =(campaign_id : string)=> {
   return async (dispatch: Dispatch) => {
         const res_1 = await fetch(`${REACT_APP_API_SERVER}/campaign/candidateBySingleCampaign/${campaign_id}`);
            
         const res_2 = await fetch(`${REACT_APP_API_SERVER}/campaign/singleCampaign/${campaign_id}`);
         if(res_1.status === 200 && res_2.status ===200) {
            const candidates = await res_1.json();
            const singleCampaign = await res_2.json();
            dispatch(setSingleCampaign(candidates, singleCampaign))
         }
   }
}