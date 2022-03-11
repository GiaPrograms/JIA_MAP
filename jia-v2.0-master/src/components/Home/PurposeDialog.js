/**
 * @file
 * Purpose dialog component
 * Displays the dialog on the home page once the user logs in and handles storing their selection
 * @author <akel.ms93@gmail.com>
 */

import React, {useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import {updateLogPurpose} from "../HandleUserLog"

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    // margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 300,
    width: 330
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

const PurposeDialog = () => {
  const classes = useStyles();
  const [purpose, setPurpose] = useState('')
  const [open, setOpen] = React.useState(true)

  const handleClose = () => {
    setOpen(false)
    sessionStorage.setItem('purpose', true)
    savePurpose()
  }

  const handleChange = ev => {
    setPurpose(ev.target.value);
  }

  const savePurpose = async() => {
    updateLogPurpose(purpose)
  }

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  return (
    <div>
      <React.Fragment>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth={true}
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{lang === "English" ? "Login Purpose" : "Objectif de connexion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {lang === "English" ? "Please select your login purpose" : "Veuillez sélectionner votre objectif de connexion"}
          </DialogContentText>
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="purpose">{lang === "English" ? "Purpose" : "Objectif"}</InputLabel>
              <Select
                autoFocus
                value={purpose}
                onChange={handleChange}
                inputProps={{
                  name: 'purpose',
                  id: 'purpose',
                }}
              >
                <MenuItem value="First time user">{lang === "English" ? "First time user" : "Première visite"}</MenuItem>
                <MenuItem value="Review information">{lang === "English" ? "Review information" : "Revoir les informations"}</MenuItem>
                <MenuItem value="Change my answers">{lang === "English" ? "Change my answers" : "Changer mes réponses"}</MenuItem>
                <MenuItem value="Change my plan">{lang === "English" ? "Change my plan" : "Changer mon plan"}</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          {purpose 
            ? <Button onClick={handleClose} color="primary">
                {lang === "English" ? "CONFIRM" : "CONFIRMER"}
              </Button>
            : <Button disabled>
                {lang === "English" ? "CONFIRM" : "CONFIRMER"}
              </Button>
          } 
        </DialogActions>
      </Dialog>
    </React.Fragment>
    </div>
  )
}

export default PurposeDialog