/**
 * @file
 * Purpose dialog component
 * Displays the dialog on the home page once the user logs in and handles storing their selection
 * @author <akel.ms93@gmail.com>
 */

import React, {useState} from 'react'

// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import "./ChooseLang.css"

const PurposeDialog = () => {
  const [open, setOpen] = React.useState(true)

  const handleClose = () => {
    setOpen(false)
  }

  let lang = localStorage.getItem("language")
  let colour = localStorage.getItem("colour")
  let popup = localStorage.getItem("popup")

  if (lang == null) {
    localStorage.setItem("language", "English")
  }

  if (colour == null) {
    localStorage.setItem("colour", "green")
  }

  if (popup == null) {
    localStorage.setItem("popup", true)
  }

  const handleClickEN = () => {
    localStorage.setItem("language", "English")
    localStorage.setItem("colour", "green")
    localStorage.setItem("popup", false)
    window.location.reload()
  }

  const handleClickFR = () => {
    localStorage.setItem("language", "French")
    localStorage.setItem("colour", "blue")
    localStorage.setItem("popup", false)
    window.location.reload()
  }

  let englishStyle = {};
  let frenchStyle = {};

  const checkColour = () => {
    if (colour == "green"){
      englishStyle = {
        background: "rgba(30, 195, 30, 1)"
      };
    } else{
      frenchStyle = {
        background: "rgba(30, 139, 195, 1)"
      };
    }
  }

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
          <DialogTitle id="alert-dialog-title">Language Panel / Panneau de Langue</DialogTitle>

          <DialogContent>

            <DialogContentText id="alert-dialog-description">
              Please select a language / Veuillez sélectionner une langue
            </DialogContentText>

            {checkColour()}

            <div className="language-btn-container">
              <Button className="language-btn-english" value="English" style={englishStyle} onClick={handleClickEN}>English / Anglais</Button>
              <Button className="language-btn-french" value="French" style={frenchStyle} onClick={handleClickFR}>French / Français</Button>
            </div>

          </DialogContent>

        </Dialog>
      </React.Fragment>
    </div>
  )
}

export default PurposeDialog