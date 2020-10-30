import { UserService } from '../services/UserService';
import { Request, Response } from 'express';
import { isHKID_valid } from "../HKID_validation";
import { generatePin } from "../generatePin";


export class UserController {
  constructor(private userService: UserService) { }

  vote = async (req: Request, res: Response) => {
    try {
      console.log(req.body)
      if (!isHKID_valid(req.body.data.HKID)){
        res.status(401).json({msg: "Your HKID input is invalid, please try again!"})
        return;
      }
      const PIN = generatePin()
      const HKID = req.body.data.HKID.toUpperCase()
      const campaign_id = req.params.campaign_id
      const candidate_id = req.params.candidate_id

      const isCampaignVoted = await this.userService.isCampaignVotedByHKID(HKID, campaign_id);
      if (isCampaignVoted) {
        res.status(401).json({ msg: "Your input HKID has been used for voting in this campaign"})
        return;
      } 
      const user = await this.userService.isUserAlreadyExisted(HKID);
      if (user) {
        await this.userService.voteByExistingUser(user.id, campaign_id, candidate_id, PIN);
      }else {
        await this.userService.vote(HKID, campaign_id, candidate_id, PIN);
      }
      res.status(200).json({msg: `Vote Success!!! Please remember your PIN number to check your choice in this campaign ${PIN}`})
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json({msg: "internal server error"})
    }
  }

  getVoteInfo = async (req: Request, res: Response) => {
      try {
        console.log("getVoteInfo!")
      } catch (err) {
        console.log(err.msg);
        res.status(500).json({msg: "internal server error"})
      }
}

}




