import React from 'react'
import styles from '../css/AllCampaignPage.module.css'

function AllCampaignsPage() {
  const campaign = ["Who is the best NBA player in the history?", "Which HK CEO candidate you are preferred", "Who will win the American Election of 2020?", "What drink do you like the most?" ]
  const totalVotes = [3450000, 3440000, 3430000, 3420000]
  return (
    <div className={styles.main}>
      <div className={styles.container}>
 
      {campaign && 
        <div className={styles.main_campaign}>
          {campaign.map((item, idx)=> (
            <div className={styles.campaign}>
              <div>{`Voting Campaign ${idx+1} :`}{item}</div>
              <div>
                <div>Total Votes</div>
                <div>{totalVotes[idx]}</div>
              </div>
            </div>
          ))}
        </div>
      }
      </div>
    </div>
  )
}

export default AllCampaignsPage
