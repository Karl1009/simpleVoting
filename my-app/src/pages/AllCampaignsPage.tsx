import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from '../css/AllCampaignPage.module.css'
import { IRootState } from '../redux/store';
import { setAllCampaignsThunk } from "../redux/Campaign/thunks"
import { Paper } from '@material-ui/core';
import { push } from 'connected-react-router';

function AllCampaignsPage() {
    const dispatch = useDispatch();

    const campaignIdArray = useSelector((state: IRootState) => state.campaign.campaignIdArray);
    const allCampaigns = useSelector((state: IRootState) => campaignIdArray?.map(id => state.campaign.allCampaignsById[id]));

    useEffect(() => {
      dispatch(setAllCampaignsThunk());
      }, [dispatch]);
  

  return (
    <div className={styles.main}>
      <Paper className={styles.container}>
        <div className={styles.title}>
          <div className={styles.topVotingCampaign}>All Campaigns</div>
        </div>
      
      {allCampaigns && 
        <div className={styles.main_campaign}>
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
        </div>
      }
      </Paper>
    </div>
  )
}

export default AllCampaignsPage
