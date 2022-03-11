import React, {useState, useEffect} from 'react'
import {Dialog, DialogContent, DialogTitle, Radio, RadioGroup, FormControlLabel, Switch} from '@material-ui/core'

import {useForm, Controller} from "react-hook-form"

import './Forms.css'

const UserForm = ({open, setOpenForm, handleSubmitForm, mode, values}) => {
  const {register, handleSubmit, reset, errors, control} = useForm();
  const [enabled, setEnabled] = useState(true)

  // Call the passed prop handleSubmit from @see UsersList if all fields are valid
  const onSubmit = data => {
    if(enabled) {
      handleSubmitForm(data)
    } else {
      // let {password, ...rest} = data
      data.password = ''
      handleSubmitForm(data)
    }
  }

  // Close the form dialog window
  const handleClosing = () => {
    setOpenForm(false)
  }

  const handlePassToggle = () => {
    setEnabled(!enabled)
  }

  const generateUserID = (length, chars) => {
    let userID = ''
    for (let i = length; i > 0; --i) userID += chars[Math.floor(Math.random() * chars.length)];
    return userID;
  }

  useEffect(() => {
    setEnabled(true)
    if(mode === "Edit") setEnabled(false)
    if(values && mode === 'Add') values.username = generateUserID(8, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    reset(values)
  }, [values])
  
  return (
    <Dialog fullWidth={true} open={open}>
      <DialogTitle className="form-dialog-title">{mode} User</DialogTitle>
      <DialogContent>
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-field-container fill-width">
              <label>Username</label>
              <input
                name="username"
                ref={register({ required: true })}
              />
              {errors.username && <p>This field is required</p>}
            </div>
          </div>

          {/* {mode === 'Add' && */}
          <div className="form-row">
            <div className="form-field-container fill-width">
              <div className="update-pass">
                <label>Password</label>
                {mode === 'Edit' && <Switch
                  checked={enabled}
                  onChange={handlePassToggle}
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                /> }
              </div>
              {enabled && 
              <>
                <input
                  name="password"
                  type="password"
                  ref={register({ required: true })}
                />
                {errors.password && <p>This field is required</p>}
              </>
              }
               {!enabled && 
              <>
                <input
                  disabled
                  name="password"
                  type="password"
                  value="*********"
                  ref={register()}
                />
              </>
              }
            </div>
          </div>

          <div className="form-row">
            <div className="form-field-container">
              <label>Type</label>
              <Controller
                as={
                  <RadioGroup row aria-label="type">
                    <FormControlLabel 
                      className="radio-space" 
                      value="user" 
                      control={<Radio className="c"/>} 
                      labelPlacement="end"
                      label="User"
                    />
                    <FormControlLabel 
                      className="radio-space" 
                      value="admin" 
                      control={<Radio/>} 
                      labelPlacement="end" 
                      label="Admin" 
                    />
                  </RadioGroup>
                }
                name="type" 
                control={control}
                rules={{ required: true }}
                defaultValue="" 
              />
              {errors.type && <p>This field is required</p>}
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

export default UserForm