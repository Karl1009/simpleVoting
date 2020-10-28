import { UserService } from "../services/AllService";
import {Request, Response} from "express";
import { checkPassword, hashPassword } from "../hash";

function generatePin () {
  const min = 0;
  const max = 9999;
  return ("0" + (Math.floor(Math.random() * (max - min + 1)) + min)).substr(-4);
}


export class UserController {
  constructor(private userService: UserService) { }

  vote = async (req: Request, res: Response) => {
    try {
      const isHKIDexist = await this.userService.checkHKID(req.body.data.HKID);
      if (isHKIDexist) {
        res.status(401).json({ msg: "Sorry! Your inpput HKID has been used for voting"})
        return;
      }
      const PIN = generatePin()
      const vote = await this.userService.saveVote(req.body.data.HKID, PIN);
      
      res.status(200).json({msg: `Congratulation! You have vote candidate ${vote.candidate_name}. Please remember your PIN number to check for your vote for this campaign ${PIN}`})
    } catch (err) {
      console.log(err.msg);
      res.status(500).json({msg: "internal server error"})
    }
  }

}

export class CandidateController {
  constructor(private candidateService: CandidateService) { }

  getAllCandidate = async (req: Request, res:Response) => {
   try {
     const candidates = await this.candidateService.getAllCandidate(req.body.data.candidate);
     if(!candidates){
     res.status(401).json({msg: "No candidates"})
     }else {
      res.json(candidates)
     }
   } catch(err) {
    console.log(err.msg);
    res.status(500).json({msg: "internal server error"})
   }
  }
}


export class CampaignController {
  constructor(private candidateService: CampaignController) { }

  getAllCandidate = async (req: Request, res:Response) => {
   try {
     const campaign = await this.candidateService.getAllCampaign(req.body.data.candidate);
     if(!campaign){
     res.status(401).json({msg: "No campaigns"})
     }else {
      res.json(campaign)
     }
   } catch(err) {
    console.log(err.msg);
    res.status(500).json({msg: "internal server error"})
   }
  }
}

export class CampaignController {
  constructor(private candidateService: CampaignController) { }

  getAllCandidate = async (req: Request, res:Response) => {
   try {
     const campaign = await this.candidateService.getAllCampaign(req.body.data.candidate);
     if(!campaign){
     res.status(401).json({msg: "No campaigns"})
     }else {
      res.json(campaign)
     }
   } catch(err) {
    console.log(err.msg);
    res.status(500).json({msg: "internal server error"})
   }
  }
}