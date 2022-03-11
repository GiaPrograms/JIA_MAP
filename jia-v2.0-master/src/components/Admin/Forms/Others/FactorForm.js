import React, {useEffect} from 'react'
import {Dialog, DialogContent, DialogTitle} from '@material-ui/core'
import { useForm } from "react-hook-form"

import '../Forms.css'

const FactorForm = ({open, setOpenForm, handleSubmitForm, mode, values}) => {
  const { register, handleSubmit, reset, errors} = useForm();

  // Call the passed prop handleSubmit from @see UsersList if all fields are valid
  const onSubmit = data => {
    handleSubmitForm(data)
  }

  // Close the form dialog window
  const handleClosing = () => {
    setOpenForm(false)
  }

  useEffect(() => {
    reset(values)
  }, [values])
  
  return (
    <Dialog fullWidth={true} open={open}>
      <DialogTitle className="form-dialog-title">{mode} Factor</DialogTitle>
      <DialogContent>
          <form className="form-container" onSubmit={handleSubmit(onSubmit)}>

            <div className="form-row"> 
              <div className="form-field-container fill-width">
                <label>Title</label>
                <input
                  name="title"
                  ref={register({ required: true })}
                />
                {errors.title && <p>This field is required</p>}
              </div>
            </div>

            <div className="form-row"> 
              <div className="form-field-container fill-width">
                <label>Description</label>
                <textarea
                  name="description"
                  ref={register()}
                />
              </div>
            </div>

            <div className="form-buttons">
              <input type="submit" />
              <button type="button" onClick={handleClosing}>Cancel</button>
            </div>
          </form>
      </DialogContent>
    </Dialog>
  )
}

export default FactorForm