import React, { useEffect, useState } from 'react'
import styles from '../css/CampaignPage.module.css'
import useReactRouter from "use-react-router"
import { useDispatch, useSelector } from 'react-redux';
import { setSingleCampaignThunk } from "../redux/Campaign/thunks"
import { IRootState } from '../redux/store';
import {  ICandidate } from "../redux/Campaign/state"
import { useForm } from "react-hook-form";
import { Alert } from 'reactstrap';
import { Button, Paper, TextField } from '@material-ui/core';
import moment from 'moment';
import sleep from "../sleep";
import { Spinner } from "react-bootstrap";
import { createBrowserHistory } from 'history';
import { RiArrowGoBackLine } from 'react-icons/ri';

const {REACT_APP_API_SERVER} = process.env
const history = createBrowserHistory();

function CampaignPage() {
  const { register, handleSubmit, reset, errors, formState, clearErrors } = useForm();
  const [loading, setLoading] = useState(true)
  const wait = async (milliseconds = 2000) => {
    await sleep(milliseconds);
    setLoading(false);
  }
  const onSubmit = async (data: any)=> {
    console.log(data)
      const res = await fetch(`${REACT_APP_API_SERVER}/user/vote/${campaign_id}/${chosenCandidate?.id}`,{
          method: 'POST',
          headers:{
              "Content-Type":"application/json"
          },
          body: JSON.stringify({data})
      })
      const result = await res.json();
      if(res.status !==200) {
        setFailMessage(result.msg)
        setTimeout( () => ( 
          setFailMessage(""))
          , 3000)
    } else {
      setSuccessMessage(result.msg)
      setTimeout( () => ( 
        setSuccessMessage(""))
        , 6000)
        reset();
      clearErrors();
      dispatch(setSingleCampaignThunk(campaign_id))
    }
    
  }
  const dispatch = useDispatch();
  const router = useReactRouter<{ campaign_id: string }>();
  const campaign_id = router.match.params.campaign_id;
  const singleCampaign = useSelector((state: IRootState) => state.campaign.singleCampaignById[campaign_id])
  const candidateIdArray = useSelector((state: IRootState) => state.campaign.candidateIdArray);
  const candidates = useSelector((state: IRootState) => candidateIdArray?.map(id => state.campaign.allCandidatesById[id]));
  const [toggle, setToggle] = useState(false);
  const [chosenCandidate, setChosenCandidate] = useState<ICandidate|null>(null);
  const [failMessage, setFailMessage] =useState("")
  const [successMessage, setSuccessMessage] =useState("")
 

  useEffect(() => {
    wait(800)
    dispatch(setSingleCampaignThunk(campaign_id));
    }, [dispatch, campaign_id]);
  

  return (
    <>
    <div className="centerSmall">
    {loading &&  <Spinner animation="grow" size="sm" variant="warning"/>}
    {loading &&  <Spinner animation="grow" size="sm" variant="danger"/>}
    {loading &&  <Spinner animation="grow" size="sm" variant="info"/>}
    </div>
    {!loading &&
    <div className={styles.main}>
      <Paper className={styles.paper}>
      <button onClick={()=> {history.goBack()}}className={styles.returnButton}><RiArrowGoBackLine className={styles.arrow}/></button>
      {singleCampaign && 
      <>
      <h3>{`Voting Campaign ${singleCampaign.id}`} </h3>
       <h5>{singleCampaign.campaign_name}</h5> 
       { moment(singleCampaign?.end_time).isAfter(new Date()) &&
         <div className={styles.guide}>Please choose one of the candidate below for voting</div>}
        { moment(singleCampaign?.end_time).isBefore(new Date()) &&
        <h2 className={styles.finishedStatement}>This Campaign has been finished! Please see the result as below!</h2>}
       </>
      }
      {candidates && 
        <div className={styles.main_campaign}>
          {candidates.map((item, idx)=> (
            // eslint-disable-next-line
            <div className={styles.campaign} onClick={()=> (setToggle(true), setChosenCandidate(item))}>
            <div>
            <div className={styles.candidateFontStyles}>{`Candidate ${idx+1}`}</div>
            <div>{item.candidate_name}</div>
            </div>
            <div>
              <div className={styles.candidateFontStyles}>Total Votes</div>
              <div className={styles.voteNumStyle}>{item.totalVotes}</div>
            </div>
            </div>
          ))}
      
          {(toggle && moment(singleCampaign?.end_time).isAfter(new Date())) && 
          <div>
            <div>You have chosen </div>
            <Alert color="warning" className={styles.chosenCandidate}>{chosenCandidate?.candidate_name}</Alert>
            <div>Please enter your HKID below to proceed voting</div>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
            className='title'
            name="HKID"
            label="HKID"
            color="secondary"
            variant="outlined"
            inputRef={register({
                  
              pattern: {value: /^[A-Za-z0-9]/,
                message: "invalid input, should be A-Za-z0-9" },
              maxLength: {value: 9,
                message: "maxLength = 9" },
              minLength: {value: 8,
                message: "minLength = 8" },
              })}
            // inputRef={register({ required: true, minLength: 1 })}
              />  
              <Button
                  className="submitButton"
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={formState.isSubmitting}
                  >
                  Submit
              </Button>
            </form>
            <div className={styles.errors}>
            {errors.HKID &&  <Alert color="danger">{errors.HKID.message}</Alert>}
            {failMessage !== "" && <Alert color="danger">{failMessage}</Alert>}
            {successMessage !== "" && <Alert color="success">{successMessage}</Alert>}
            </div>
          </div>}
        </div>
      }
      </Paper>
    </div>
  }
  </>
  )
}

export default CampaignPage
