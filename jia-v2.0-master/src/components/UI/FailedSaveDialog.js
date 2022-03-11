import React from 'react'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const FailedSaveDialog = ({open, setOpen}) => {
  return(
    <Dialog
    open={open}
    onClose={() => setOpen(false)}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Failed to save</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
      An error occured while attempting to save, please try again later.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setOpen(false)} color="primary" autoFocus>
        Got it
      </Button>
    </DialogActions>
  </Dialog>
  )
}

export default FailedSaveDialog