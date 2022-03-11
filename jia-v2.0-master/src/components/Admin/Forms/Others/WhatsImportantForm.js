import React, {useState, useEffect} from 'react'
import {Dialog, DialogContent, DialogTitle, Radio, RadioGroup, FormControlLabel, Checkbox} from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import {useForm, Controller} from "react-hook-form"

import '../Forms.css'
// import SliderControl from '../../../UI/Slider/SliderControl'

const WhatsImportantForm = ({open, setOpenForm, handleSubmitForm, mode, values, categories}) => {
  const {register, handleSubmit, reset, errors, control, watch} = useForm();
  // const watchLeftLabel = watch("left_label", "Not Important At All")
  // const watchRightLabel = watch("right_label", "Very Important")
  // const watchReversed = watch("reversed", 0);
  // const watchDescription = watch("description", "")
  
  const [selectedCategories, setSelectedCategories] = useState([])
  // const watchAllFields = watch();

  // Call the passed prop handleSubmit from @see UsersList if all fields are valid
  const onSubmit = data => {
    handleSubmitForm(data, selectedCategories)
  }

  // Close the form dialog window
  const handleClosing = () => {
    setOpenForm(false)
  }

  const handleChange = (event) => {
    const id = parseInt(event.target.value)
    event.target.checked === true
      ? setSelectedCategories(prev => [...prev, {id}])
      : setSelectedCategories(selectedCategories.filter(el => el.id !== id))
  }

  useEffect(() => {
    setSelectedCategories([])
    if(mode === 'Edit') {
      setSelectedCategories(values.categories)
      values.recommends ? values.recommends = '1' : values.recommends = '0'
      values.reversed ? values.reversed = '1' : values.reversed = '0'
    }
    reset(values)
  }, [values])
  
  return (
    <Dialog fullWidth={true} maxWidth={'md'} open={open}>
      <DialogTitle className="form-dialog-title">{mode} What's Important</DialogTitle>
      <DialogContent>
          <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-field-container fill-width">
              <label>Description</label>
              <input
                name="description"
                ref={register({ required: true })}
              />
              {errors.description && <p>This field is required</p>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-field-container fill-width">
              <label>Left Label</label>
              <input
                defaultValue="Not Important at All"
                name="left_label"
                ref={register({ required: true })}
              />
              {errors.left_label && <p>This field is required</p>}
            </div>

            <div className="form-field-container fill-width margin-left">
              <label>Right Label</label>
              <input
                defaultValue="Very Important"
                name="right_label"
                ref={register({ required: true })}
              />
              {errors.right_label && <p>This field is required</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-field-container">
              <label>Slider threshold (0 - 5)</label>
              <input
                type="number"
                name="threshold"
                step="1"
                ref={register({ required: true, min: 0, max: 5 })}
              />
              {errors.threshold?.type === "required" && <p>This field is required</p>}
              {(errors.threshold?.type === "max" ||  errors.score?.type === "min" ) && <p>Value must be between 0 and 5</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-field-container fill-width">
              <label>Slider colour layout direction</label>
              <Controller
                as={
                  <RadioGroup row aria-label="reversed slider layout">
                    <FormControlLabel className="radio-space" value="0" control={<Radio />} labelPlacement="end" label="Normal" />
                    <FormControlLabel className="radio-space" value="1" control={<Radio />} labelPlacement="end" label="Reversed" />
                  </RadioGroup>
                }
                name="reversed" 
                control={control}
                rules={{ required: true }}
                defaultValue="0"
              />
              {errors.reversed && <p>This field is required</p>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-field-container fill-width">
              <label>Does this preference recommend or unrecommend treatments?</label>
              <Controller
                as={
                  <RadioGroup row aria-label="traffic level">
                    <FormControlLabel className="radio-space" value="1" control={<Radio />} labelPlacement="end" label="Recommends" />
                    <FormControlLabel className="radio-space" value="0" control={<Radio />} labelPlacement="end" label="Unrecommends" />
                  </RadioGroup>
                }
                name="recommends" 
                control={control}
                rules={{ required: true }}
                defaultValue="1"
              />
              {errors.recommends && <p>This field is required</p>}
            </div>
          </div>

          <FormControl>
            <label>Categories</label>
            <FormGroup row>
              {categories && categories.map(category => 
                <FormControlLabel
                  key={category.id}
                  control={<Checkbox name={category.name} />}
                  value={category.id}
                  label={category.name}
                  checked={selectedCategories.some(cat => cat.id === category.id)}
                  onChange={handleChange}
               />
              )}
            </FormGroup>
          </FormControl>

          {/* <Divider />
          <div className="form-field-container fill-width">
            <h4>1. {watchDescription}</h4>
            <SliderControl
              setValue="disabled"
              minLabel={watchLeftLabel}
              maxLabel={watchRightLabel}
              reversed={watchReversed}
              value={7}
            />
          </div> */}

          <div className="form-buttons">
            <input type="submit" />
            <button type="button" onClick={handleClosing}>Cancel</button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default WhatsImportantForm