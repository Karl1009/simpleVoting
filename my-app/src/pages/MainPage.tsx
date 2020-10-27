import React from "react"
import styles from '../css/MainPage.module.css'
import { useDispatch } from "react-redux"
import { push } from "connected-react-router"


function MainPage() {
  const campaign = [1, 2, 3, 4, 5]
  const dispatch = useDispatch();
  return (
    <div >
      {campaign && 
        <div className={styles.main_campaign}>
          {campaign.map((item, idx)=> (
            <div className={styles.campaign} onClick={()=> {dispatch(push(`/campaign/${item}`))}}>
              {item}
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default MainPage
