import React, {useEffect} from 'react'
import {Dialog, DialogContent, DialogTitle, Radio, RadioGroup, FormControlLabel} from '@material-ui/core'
import {useForm, Controller} from "react-hook-form"

import '../Forms.css'

const ClassificationForm = ({open, setOpenForm, handleSubmitForm, mode, values}) => {
  const {register, handleSubmit, reset, errors, control} = useForm({});

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
      <DialogTitle className="form-dialog-title">{mode} Medication Classification</DialogTitle>
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

          <div className="form-field-container fill-width">
            <label>Section</label>
            <Controller
              as={
                <RadioGroup aria-label="section">
                  <FormControlLabel value="prescribed" control={<Radio />} label="Prescribed" />
                  {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
                </RadioGroup>
              }
              name="section" 
              control={control}
              rules={{ required: true }}
              defaultValue="" 
            />
            {errors.section && <p>This field is required</p>}
          </div>

          <div className="form-buttons">
            <input type="submit" />
            <button type="button" onClick={handleClosing}>Cancel</button>
          </div>
        </form>
        {/* } */}
      </DialogContent>
    </Dialog>
  )
}

export default ClassificationForm