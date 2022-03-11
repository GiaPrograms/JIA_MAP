import React, {useState, useEffect} from 'react'
import {Dialog, DialogContent, DialogTitle, Button, Divider} from '@material-ui/core'
import {useForm} from "react-hook-form"
import Rating from '@material-ui/lab/Rating';
import Switch from '@material-ui/core/Switch';
import AddIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import '../Forms.css'

const StudiesForm = ({open, setOpenForm, handleSubmitForm, mode, values, treatments}) => {
  const {register, handleSubmit, reset, errors} = useForm({});
  const [rating, setRating] = useState(1)
  const [hasStudy, setHasStudy] = useState(false)
  const [results, setResults] = useState([])

  // Call the passed prop handleSubmit from @see UsersList if all fields are valid
  const onSubmit = data => {
    hasStudy ? data.rating = rating : data.rating = 0
    handleSubmitForm(data, results)
  }

   // Close the form dialog window
   const handleClosing = () => {
    setOpenForm(false)
  }

  const addResultField = () => {
    setResults(original => [...original, { name: "", statistics: "", score: "", }])
  }

  const handleRemoveResult = index => {
    const list = [...results];
    list.splice(index, 1);
    setResults(list);
  }

  const handleResultChange = (e, index) => {
    const {name, value} = e.target;
    const list = [...results]
    list[index][name] = value
    setResults(list)
  }

  useEffect(() => {
    setResults([])
    setHasStudy(false)
    reset(values)
    // if(values) {
    //   setRating(values.rating)
    // }

    if (mode === 'Edit') {
      let i = treatments.filter(treat => treat.name === values.treatment)
      values.treatment_id = i[0].id
      setRating(values.rating)
      setResults(values.results)
      if(values.name) setHasStudy(true)
    }
  }, [values])

  const resultFields = results.map((result, i) => 
  <div key={i} className="result-container">
    <div className="result-title">
      <h4>Result {i+1}</h4>
      {results.length >= 1 && 
      <Button 
        type="button" 
        variant="contained"
        size="small"
        className="remove-btn"
        startIcon={<RemoveCircleIcon />} 
        onClick={() => handleRemoveResult(i)}
      >
        Remove
      </Button>}
    </div>
    <div className="form-field-container">
      <label>Result Name</label>
      <input
        name="name"
        value={result.name}
        onChange={e => handleResultChange(e, i)}
      />
    </div>
    <div className="form-field-container full-width">
      <label>Statistics</label>
      <input
        name="statistics"
        value={result.statistics}
        onChange={e => handleResultChange(e, i)}
      />
    </div>
    <div className="form-field-container">
      <label>Score (0 - 100)</label>
      <input
        type="number"
        name="score"
        value={result.score}
        onChange={e => handleResultChange(e, i)}
      />
    </div>
  </div>
)
  
  return (
    <Dialog fullWidth={true} maxWidth={'md'} open={open}>
      <DialogTitle className="form-dialog-title">{mode} Research</DialogTitle>
      <DialogContent>
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>

          <div className="form-row"> 
            <div className="form-field-container field-row">
              <label>Does this research contain a study?</label>
              <Switch
                checked={hasStudy}
                onChange={() => setHasStudy(!hasStudy)}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </div>
          </div>
          {hasStudy &&
          <div className="form-row"> 
            <div className="form-field-container fill-width">
              <label>Study name</label>
              <input
                name="name"
                ref={register()}
              />
            </div>
          </div>
          }
          <div className="form-row">
            <div className="form-field-container fill-width">
              <label>Does it work?</label>
              <textarea
                name="does_work"
                ref={register({ required: true })}
              />
              {errors.does_work && <p>This field is required</p>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-field-container fill-width">
              <label>Is it safe?</label>
              <textarea
                name="is_safe"
                ref={register({ required: true })}
              />
              {errors.is_safe && <p>This field is required</p>}
            </div>
          </div>


          {hasStudy &&
          <>
            <div className="form-row"> 
              <div className="form-field-container fill-width">
                <label>Should I believe this research?</label>
                <input
                  name="believe_research"
                  ref={register()}
                />
              </div>

              <div className="form-field-container rating">
                <label>Rating</label>
                <Rating 
                  name="rating-input" 
                  defaultValue={1}
                  size="large"
                  value={rating}  
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
              </div>
            </div>
          </>
          }
            <div className="form-row">
              <div className="form-field-container">
                <label>Treatment this study belongs to</label>
                <select name="treatment_id" ref={register}>
                  {treatments && treatments.map(treat => 
                    <option key={treat.id} value={treat.id}>{treat.name}</option>
                    )
                  }
                </select>
                {errors.treatment_id && <p>This field is required</p>}
              </div>
            </div>
          {hasStudy &&
          <>
          <Divider />
            <h3>Study Details</h3>
            <div className="form-field-container">
              <label>Methods</label>
              <textarea
                name="methods"
                ref={register()}
                rows={5}
              />
            </div>

            <div className="form-field-container">
              <label>Treatments</label>
              <textarea
                name="treatments"
                ref={register()}
                rows={5}
              />
            </div>

            <div className="form-field-container">
              <label>Results</label>
              <textarea
                name="treatment_results"
                ref={register()}
                rows={5}
              />
            </div>

            <div className="form-field-container">
              <label>Reference</label>
              <textarea
                name="reference"
                ref={register()}
              />
            </div>

            <div className="form-field-container">
              <label>PubMed link</label>
              <input
                name="pubMed"
                ref={register()}
              />
            </div>
            <Divider />
            <h3>Study Results</h3>
            {resultFields}
            <Button 
            type="button" 
            variant="contained"
            size="small"
            className="add-icon add-btn add-result-btn"
            startIcon={<AddIcon />} 
            onClick={addResultField}
            >
            Add Study Result
          </Button>
          </>
          }
          <div className="form-buttons">
            <input type="submit" />
            <button type="button" onClick={handleClosing}>Cancel</button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default StudiesForm