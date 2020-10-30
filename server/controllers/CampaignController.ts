import { CampaignService } from '../services/CampaignService';
import { Request, Response } from 'express';
import moment from "moment";

export class CampaignController {
   constructor(private campaignService: CampaignService) { }
 
   allExistingCampaigns= async (req: Request, res:Response) => {
    try {
      const campaigns = await this.campaignService.allExistingCampaigns();
      if(!campaigns){
      res.status(401).json({msg: "No existing campaign"})
      }else {
      for(const campaign of campaigns){
        const totalVotes = await this.campaignService.totalVotesByCampaign(campaign.id);
        campaign["totalVotes"] = totalVotes[0].count
      }
 
       res.json(campaigns)
      }
    } catch(err) {
      console.log(err);
     res.status(500).json({msg: "internal server error"})
    }
   }

   allExpiredCampaigns = async (req: Request, res:Response) => {
    try {
      const campaigns = await this.campaignService.allExpiredCampaigns();
      if(!campaigns){
      res.status(401).json({msg: "No expired campaign"})
      }else {
        for(const campaign of campaigns){
          const totalVotes = await this.campaignService.totalVotesByCampaign(campaign.id);
          campaign["totalVotes"] = totalVotes[0].count
        }
       res.json(campaigns)
      }
    } catch(err) {
      console.log(err);
     res.status(500).json({msg: "internal server error"})
    }
   }

   newCampaign = async (req: Request, res: Response) => {
     try {
      const start_time = req.body.data.start_time;
      const end_time = req.body.data.end_time;
      console.log(typeof start_time)
      let now = new Date();
      console.log(moment(end_time).isBefore(now))
      
      
      if(moment(end_time).isBefore(moment(start_time))) {
        res.status(401).json({msg:"The end time should be after the start time"})
        return;
      }
      if(moment(start_time).isBefore(now)|| moment(end_time).isBefore(now)) {
        res.status(401).json({msg:"Both start and end time should be after current time"})
        return;
      }

      const campaign_name = req.body.data.campaignName
      let candidate_name = [(req.body.data.candidate_1), (req.body.data.candidate_2)]
      //temporary solution, need improvement
      if(req.body.data.candidate_3){candidate_name.push(req.body.data.candidate_3)}
      if(req.body.data.candidate_4){candidate_name.push(req.body.data.candidate_4)}
      if(req.body.data.candidate_5){candidate_name.push(req.body.data.candidate_5)}
      if(req.body.data.candidate_6){candidate_name.push(req.body.data.candidate_6)}

      
      const newCampaignId = await this.campaignService.newCampaign(campaign_name, candidate_name, start_time, end_time);
      res.status(200).json({msg: `Congrats! Your Campaign No.${newCampaignId} has been launched! Redirecting to MainPage`})
      return;
     } catch(err) {
      console.log(err);
     res.status(500).json({msg: "internal server error"})
    }
   }
   candidateBySingleCampaign = async (req: Request, res:Response) => {
    try {
      const campaign_id = req.params.campaign_id
      const candidates = await this.campaignService.candidateBySingleCampaign(campaign_id);
      for(const candidate of candidates) {
      const totalVotes = await this.campaignService.totalVotesByCandidate(candidate.id, campaign_id);
      candidate["totalVotes"] = totalVotes[0].count
      }
      res.json(candidates)
    } catch(err) {
     console.log(err);
     res.status(500).json({msg: "internal server error"})
    }
   }
   singleCampaign = async (req: Request, res: Response) => {
     try {
       const campaign_id = req.params.campaign_id;
       const singleCampaign = await this.campaignService.singleCampaign(campaign_id);
       res.json(singleCampaign)
      } catch(err) {
       console.log(err);
       res.status(500).json({msg: "internal server error"})
      }
   }
 }
 