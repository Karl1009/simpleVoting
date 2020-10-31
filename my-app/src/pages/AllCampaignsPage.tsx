import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from '../css/AllCampaignPage.module.css'
import { IRootState } from '../redux/store';
import { setAllCampaignsThunk } from "../redux/Campaign/thunks"
import { Paper } from '@material-ui/core';
import { push } from 'connected-react-router';
import sleep from "../sleep";
import { Spinner } from "react-bootstrap";

function AllCampaignsPage() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const wait = async (milliseconds = 2000) => {
      await sleep(milliseconds);
      setLoading(false);
    }
    const campaignIdArray = useSelector((state: IRootState) => state.campaign.campaignIdArray);
    const allCampaigns = useSelector((state: IRootState) => campaignIdArray?.map(id => state.campaign.allCampaignsById[id]));
    const campaignIdArrayExpired = useSelector((state: IRootState) => state.campaign.campaignIdArrayExpired);
    const allCampaignsExpired = useSelector((state: IRootState) => campaignIdArrayExpired?.map(id => state.campaign.allCampaignsByIdExpired[id]));

    useEffect(() => {
      wait(500)
      dispatch(setAllCampaignsThunk());
      }, [dispatch]);
  

  return (
  <>
    {loading && <Spinner className="center" animation="border" variant="info" />}
    {!loading && <div>
    {(allCampaigns || allCampaignsExpired) && 
    <div className={`allcampaigns ${styles.main}`}>
      <Paper className={styles.container}>
        <div className={styles.title}>
          <div className={styles.topVotingCampaign}>All Campaigns</div>
        </div>
        <div className={styles.main_campaign}>
          <div className={styles.subtitle}>Existing Campaigns ordered by TOTAL VOTES</div>
          {allCampaigns.map((item)=> (
            <div>
            {item.end_time && <div className={styles.allCampaign} onClick={()=> {dispatch(push(`/campaign/${item.id}`))}} >
              <div>
              <div className={styles.Text}>{`Voting Campaign ${item.id}: `}</div>
              <div>{item.campaign_name}</div>
              </div>
              <div>
                <div  className={styles.Text}>Total Votes</div>
                <div className={styles.totalVotes}>{item.totalVotes}</div>
              </div>
            </div>}
            </div>
          ))}
          <div className={styles.subtitle}>Finished Campaigns ordered by ENDING TIME</div>
          {allCampaignsExpired && allCampaignsExpired.map((item)=> (
            <div>
            {item.end_time && <div className={styles.allCampaignExpired} onClick={()=> {dispatch(push(`/campaign/${item.id}`))}} >
              <div>
              <div className={styles.Text}>{`Voting Campaign ${item.id}: `}</div>
              <div>{item.campaign_name}</div>
              </div>
              <div>
                <div  className={styles.Text}>Total Votes</div>
                <div className={styles.totalVotes}>{item.totalVotes}</div>
              </div>
            </div>}
            </div>
          ))}
        </div>
      </Paper>
    </div>
    }
  </div>}
  </>
  )
}

export default AllCampaignsPage
