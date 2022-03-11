import React, {useEffect} from 'react'
import {Dialog, DialogContent, DialogTitle} from '@material-ui/core'
import {useForm} from "react-hook-form"

import '../Forms.css'

const StudyResults = ({open, setOpenForm, handleSubmitForm, mode, values, studies}) => {
  const {handleSubmit, reset, register, errors} = useForm({});

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
    if (mode === 'Edit') {
      let i = studies.filter(study => study.name === values.study)
      values.study = i[0].id
    }
  }, [values])
  
  return (
    <Dialog fullWidth={true}  maxWidth={'md'} open={open}>
      <DialogTitle className="form-dialog-title">{mode} Study Result</DialogTitle>
      <DialogContent>
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>

        <div className="form-row">
          <div className="form-field-container fill-width">
            <label>Result Name</label>
            <input
              name="name"
              ref={register({ required: true })}
            />
            {errors.name && <p>This field is required</p>}
          </div>
        </div>

          <div className="form-row"> 
            <div className="form-field-container fill-width">
              <label>Statistics</label>
              <input
                name="statistics"
                ref={register({ required: true })}
              />
              {errors.statistics && <p>This field is required</p>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-field-container">
              <label>Study</label>
              <select name="study_id" ref={register}>
                {studies && studies.map(study => 
                  <option key={study.id} value={study.id}>{study.name}</option>
                  )
                }
              </select>
              {errors.study_id && <p>This field is required</p>}
            </div>
            <div className="form-field-container">
              <label>Score (0 - 100)</label>
              <input
                type="number"
                name="score"
                ref={register({required: true, min: 0, max: 100})}
              />
              {errors.score?.type === "required" && <p>This field is required</p>}
              {(errors.score?.type === "max" ||  errors.score?.type === "min" ) && <p>Value must be between 0 and 100</p>}
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

export default StudyResults