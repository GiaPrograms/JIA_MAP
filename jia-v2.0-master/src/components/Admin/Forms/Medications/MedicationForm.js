import React, {useEffect} from 'react'
import {Dialog, DialogContent, DialogTitle} from '@material-ui/core'
import {useForm} from "react-hook-form"
// import uuid from 'react-uuid'

import '../Forms.css'

const MedicationForm = ({open, setOpenForm, handleSubmitForm, mode, values, classifications}) => {
  const {register, handleSubmit, reset, errors} = useForm({});

  // Call the passed prop handleSubmit from @see UsersList if all fields are valid
  const onSubmit = data => {
    handleSubmitForm(data)
  }

   // Close the form dialog window
   const handleClosing = () => {
    setOpenForm(false)
  }

  useEffect(() => {
    // set the selected value for the select elment when editing
    if (mode === 'Edit') {
      let i = classifications.filter(c => c.name === values.classification)
      values.classification_id = i[0].id
    }
    reset(values)
  }, [values])
  
  return (
    <Dialog fullWidth={true} maxWidth={'md'} open={open}>
      <DialogTitle className="form-dialog-title">{mode} Medication</DialogTitle>
      <DialogContent>
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>

          <div className="form-row">
            <div className="form-field-container fill-width">
              <label>Name</label>
              <input
                name="name"
                ref={register({ required: true })}
              />
              {errors.name && <p>This field is required</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-field-container fill-width">
              <label>Classification</label>
              <select name="classification_id" ref={register} >
                {classifications && classifications.map(item => 
                  <option key={item.id} value={item.id}>{item.name} ({item.section})</option>
                )}
              </select>
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

export default MedicationForm