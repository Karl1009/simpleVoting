import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from "moment";
import styles from "../css/AddNewCampaignPage.module.css"
// import { Button } from 'reactstrap';
import Button from "@material-ui/core/Button/Button";
import { Paper } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Alert } from 'reactstrap';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }),
);

const {REACT_APP_API_SERVER} = process.env

const AddNewCampaignPage : React.FC = ()=> {
  const classes = useStyles();
  const [failMessage, setFailMessage] = useState("");
  const [successMessage, setSuccessMessage] =useState("");
  const { register, handleSubmit, reset, errors, clearErrors } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (data: any) => {
    for(const key in data) {
      if (data[key] === ""){
        delete data[key];
      }
    }
    console.log(data)
    const res = await fetch(`${REACT_APP_API_SERVER}/campaign/newCampaign`,{
      method: 'POST',
      headers:{
          "Content-Type":"application/json"
      },
      body: JSON.stringify({data})
    })
      const result = await res.json();
      console.log(result)
      console.log(res.status)
      if(res.status === 200) {
        setSuccessMessage(result.msg)
        clearErrors();
        setTimeout(() => (dispatch(push("/"))), 5000)
      } else {
        setFailMessage(result.msg)
        setTimeout( () => ( setFailMessage("")), 5000)
      }
  }
  return (
     <div className={styles.main}>
      <Paper className={styles.paper}>
        <h4>What campaign would you like to launch?</h4>
    <form onSubmit={handleSubmit(onSubmit)} className={classes.container + " " + styles.form} noValidate>
       <TextField
         className='title'
         name="campaignName"
         label="Campaign Name e.g: What is your breakfast today?"
         color="secondary"
         required={true}
         variant="outlined"
         inputRef={register({ required: true, minLength: 3 })}
      />
      <TextField
         className='title'
         name="candidate_1"
         label="Candidate 1"
         color="secondary"
         required={true}
         variant="outlined"
         inputRef={register({ required: true, minLength: 1 })}
      />
      <TextField
         className='title'
         name="candidate_2"
         label="Candidate 2"
         color="secondary"
         required={true}
         variant="outlined"
         inputRef={register({ required: true, minLength: 1 })}
      />
      <TextField
         className='title'
         name="candidate_3"
         label="Candidate 3 (Optional)"
 
         color="secondary"
         variant="outlined"
         inputRef={register}
      />
      
      <TextField
         className='title'
         name="candidate_4"
         label="Candidate 4 (Optional)"
    
         color="secondary"
         variant="outlined"
         inputRef={register}
      />
      
      <TextField
         className='title'
         name="candidate_5"
         label="Candidate 5 (Optional)"
     
         color="secondary"
         variant="outlined"
         inputRef={register}
      />
      <TextField
         className='title'
         name="candidate_6"
         label="Candidate 6 (Optional)"
         color="secondary"
         variant="outlined"
         inputRef={register}
      />
      <div className={styles.dateInput}>
      <TextField
        id="datetime-local"
        label="Start Time"
        type="datetime-local"
        name="start_time"
        required={true}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputRef={register({ required: true})}
      />
      <TextField
        id="datetime-local"
        label="End Time"
        type="datetime-local"
        name="end_time"
        required={true}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputRef={register({ required: true})}
      />
      </div>
      <Button
         className="submitButton"
         variant="contained"
         color="secondary"
         type="submit"
      >
         Submit
            </Button>
    </form>
    {failMessage !== "" && <Alert color="danger">{failMessage}</Alert>}
    {successMessage !== "" && <Alert color="success">{successMessage}</Alert>}
    </Paper>
    </div>
  );
}

export default AddNewCampaignPage