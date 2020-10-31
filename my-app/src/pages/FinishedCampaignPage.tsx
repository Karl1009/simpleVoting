import React, { useEffect, useState } from "react"
import styles from '../css/FinishedCampaignPage.module.css'
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router"
import { setExpiredCampaignThunk } from "../redux/Campaign/thunks"
import { IRootState } from "../redux/store";
import { Paper } from '@material-ui/core';
import moment from "moment";
import sleep from "../sleep";
import { Spinner } from "react-bootstrap";


function FinishedCampaignPage() {
  const [loading, setLoading] = useState(true)
  const wait = async (milliseconds = 2000) => {
    await sleep(milliseconds);
    setLoading(false);
  }
  const dispatch = useDispatch();
    const campaignIdArray = useSelector((state: IRootState) => state.campaign.campaignIdArray);
    const campaigns = useSelector((state: IRootState) => campaignIdArray?.map(id => state.campaign.allCampaignsById[id]));
    console.log(campaigns)
    useEffect(() => {
      wait(500)
      dispatch(setExpiredCampaignThunk());
      }, [dispatch]);
  
  return (
    <div >
    {loading && <Spinner className="center" animation="border" variant="danger" />}
      {!loading && campaigns && 
        <Paper className={styles.main_campaign}>
          {campaigns.map((item)=> (
            <Paper className={styles.campaign} onClick={()=> {dispatch(push(`/campaign/${item.id}`))}}>
              <h5 className={styles.votingCampaign}>Voting Campaign {item.id}</h5>
              <div className={styles.campaignName}>{item.campaign_name}</div>
              <div className={styles.campaignInfo}>
                <div>
                  <div>Start: {moment(item.start_time).format('YYYY-MM-DD, h:mma')}</div>
                  <div>End: {moment(item.end_time).format('YYYY-MM-DD, h:mma')}</div>
                </div>
                <div>
                  <div>Finish {moment(item.end_time).endOf('second').fromNow()}</div>
                  <div>Total Votes: {item.totalVotes}</div>
                </div>
              </div>
            </Paper>
          ))}
        </Paper>
      }

    </div>
  )
}

export default FinishedCampaignPage




