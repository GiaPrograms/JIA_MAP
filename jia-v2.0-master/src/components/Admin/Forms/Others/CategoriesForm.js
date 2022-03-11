import React, {useEffect} from 'react'
import {Dialog, DialogContent, DialogTitle} from '@material-ui/core'
import {useForm} from "react-hook-form"

import '../Forms.css'

const CategoriesForm = ({open, setOpenForm, handleSubmitForm, mode, values}) => {
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
    reset(values)
  }, [values])
  
  return (
    <Dialog fullWidth={true} open={open}>
      <DialogTitle className="form-dialog-title">{mode} Category</DialogTitle>
      <DialogContent>
        {/* {classifications && */}
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          <label>Name</label>
            <input
              name="name"
              ref={register({ required: true })}
            />
            {errors.name && <p>Name cannot be empty.</p>}
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

export default CategoriesForm