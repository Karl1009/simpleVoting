import React from 'react'
import styles from '../css/CampaignPage.module.css'
import useReactRouter from "use-react-router"


function CampaignPage() {
  const router = useReactRouter<{ campaign_id: string }>();
  const campaign_id = router.match.params.campaign_id;
  const campaign = ["Trump", "Biden", "Hillary Clinton"]
  return (
    <div className={styles.main}>
      <div className={styles.container}>
      <h3>{`Voting Campaign ${campaign_id}`}</h3>
      <h4>Who will win the American Election of 2020?</h4>
      {campaign && 
        <div className={styles.main_campaign}>
          {campaign.map((item)=> (
            <div className={styles.campaign}>
              {item}
            </div>
          ))}
        </div>
      }
      </div>
    </div>
  )
}

export default CampaignPage
