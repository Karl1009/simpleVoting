import React from 'react'
import styles from '../css/campaign.module.css'

function Campaign() {
  const campaign = [1, 2, 3, 4, 5]
  return (
    <div >
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
  )
}

export default Campaign
