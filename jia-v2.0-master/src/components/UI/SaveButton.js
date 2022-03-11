import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import "./SaveButton.css"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const SaveButton = ({saveHandler, saveStatus}) => {
  const classes = useStyles();
  const [status, setStatus] = useState('default')

  const handleClick = () => {
    setStatus('saving')
    saveHandler()
  }

  useEffect(() => {
    setStatus(saveStatus)
  },[saveStatus])

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  return (
    <div className={classes.root}>
      <div className="save-btn-container">
        {(status === 'default' || status === 'failed') && <Button className="save-btn" onClick={handleClick}>{lang === "English" ? "Save" : "Sauvegarder"}</Button>}
        {status === 'saving' && <Button disabled className="save-btn disabled">{lang === "English" ? "Saving" : "Économie"}</Button>}
        {status === 'success' && <Button disabled className="save-btn success">{lang === "English" ? "Saved" : "Enregistrée"}</Button>}
      </div>
    </div>
  );
}

export default SaveButton