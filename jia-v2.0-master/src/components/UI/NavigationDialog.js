import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const NavigationDialog = ({open, handleClose, saveHandler, isLogout}) => {

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  let display = {};
  const setDisplay = () => {
    if (isLogout === "logout"){
      display = {
        display: "none"
      };
    } 
  }

  const handleClick = () => {
    saveHandler()
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="xs"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        <DialogTitle id="alert-dialog-title">{lang === "English" ? "Unsaved changes" : "Changements non sauvegardés"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {isLogout === "logout" ? 
              lang === "English" ? 
              "You forgot to save changes on this page. Please press “cancel” to return to the page and save your progress." : 
              "Vous avez oublié d'enregistrer les modifications sur cette page. Veuillez appuyer sur “annuler” pour revenir à la page et enregistrer votre progression." : 
              lang === "English" ? 
              "You forgot to save changes on this page. Please press “confirm” to save changes and press “cancel” to return to the page." : 
              "Vous avez oublié de sauvegarder les changements sur cette page. Veuillez sélectionner «confirmer» pour sauvegarder les changements et sélectionner «annuler» pour revenir à la page."}
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {setDisplay()}
          <Button onClick={() => handleClose(0)} color="secondary">
            {lang === "English" ? "Cancel" : "Annuler"}
          </Button>
          <Button onClick={() => {handleClose(1); handleClick();}} color="primary" style={display}>{lang === "English" ? "Confirm" : "Confirmer"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NavigationDialog