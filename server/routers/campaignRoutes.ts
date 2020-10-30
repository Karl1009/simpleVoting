import express from "express";
import { campaignController } from "../main";

export const campaignRoutes = express.Router();


campaignRoutes.get("/allExistingCampaigns", campaignController.allExistingCampaigns);
campaignRoutes.get("/allExpiredCampaigns", campaignController.allExpiredCampaigns);
// campaignRoutes.get("/allCampaigns"), campaignController.allCampaigns);
campaignRoutes.post("/newCampaign", campaignController.newCampaign);


campaignRoutes.get("/candidateBySingleCampaign/:campaign_id", campaignController.candidateBySingleCampaign);
campaignRoutes.get("/singleCampaign/:campaign_id", campaignController.singleCampaign);

