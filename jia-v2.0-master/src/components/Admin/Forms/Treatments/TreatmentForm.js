import React, {useState, useEffect} from 'react'
import {Dialog, DialogContent, DialogTitle, Radio, RadioGroup, FormControlLabel, Button, Checkbox} from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import AddIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import {useForm, Controller} from "react-hook-form"
import {baseUrl} from "../../../../API/ApiHandler"
import placeholder from "../../../../img/default_placeholder.png"

import '../Forms.css'

const TreatmentForm = ({open, setOpenForm, handleSubmitForm, mode, values, classifications, categories}) => {
  const {register, handleSubmit, reset, errors, control} = useForm();
  const [linkList, setLinkList] = useState([])
  const [videoList, setVideoList] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [imageDisplay, setImageDisplay] = useState()

  // Call the passed prop handleSubmit from @see UsersList if all fields are valid
  const onSubmit = data => {
    if(mode === 'Add') {
      data.image = data.image ? data.image[0] : null
    } else {
      if(data.image.length){
        data.image = data.image[0]
      } else {
        delete data.image
      }
    }
    handleSubmitForm(data, linkList, videoList, selectedCategories)
    // handleClosing()
  }

   // Close the form dialog window
   const handleClosing = () => {
    setOpenForm(false)
  }

  const addLinkField = () => {
    setLinkList(original => [...original, { name: "", link: "", language: "English", nationality: "Canadian", is_app: false}])
  }

  const addVideoField = () => {
    setVideoList(original => [...original, { name: "", link: "", language: "English" }])
  }

  // handle input change
  const handleLinkChange = (e, index) => {
    const {name, value} = e.target;
    const list = [...linkList]
    list[index][name] = value
    setLinkList(list)
  }
  // handle input change
  const handleVideoChange = (e, index) => {
    const {name, value} = e.target;
    const list = [...videoList]
    list[index][name] = value
    setVideoList(list)
  }
  // handle click event of remove link button
  const handleRemoveLink = index => {
    const list = [...linkList]
    list.splice(index, 1)
    setLinkList(list)
  }
  // handle click event of remove link button
  const handleRemoveVideo = index => {
    const list = [...videoList];
    list.splice(index, 1);
    setVideoList(list);
  }

  const handleCatChange = (event) => {
    const id = parseInt(event.target.value)
    event.target.checked === true
      ? setSelectedCategories(prev => [...prev, {id}])
      : setSelectedCategories(selectedCategories.filter(el => el.id !== id))
  }

  useEffect(() => {
    setLinkList([])
    setVideoList([])
    setSelectedCategories([])
    if (mode === 'Edit') {
      values.traffic_level = values.traffic_level.toString()
      let {image, ...rest} = values
      setLinkList(values.learn)
      setVideoList(values.video)
      setSelectedCategories(values.categories)
      setImageDisplay(values.image !== '' ? `${baseUrl}/${values.image}` : placeholder)
      reset(rest)
    } else {
      setImageDisplay(placeholder)
      reset(values)
    }

  }, [values])

  const linkFields =  linkList.map((link, i) => 
    <div key={i} className="field-row">
      <div className="form-field-container dynamic-field">
        <input
          name="link"
          placeholder="Link"
          value={link.link}
          onChange={e => handleLinkChange(e, i)}
        />
      </div>
      <div className="form-field-container dynamic-field">
        <input
          name="name"
          placeholder="Link name"
          value={link.name}
          onChange={e => handleLinkChange(e, i)}
        />
      </div>

      <div className="form-field-container dynamic-field">
        <select name="language" ref={register()} defaultValue={link.language} onChange={e => handleLinkChange(e, i)}>
          <option value="English">English</option>
          <option value="French">French</option>
        </select>
        {errors.language && <p>This field is required</p>}
      </div>

      <div className="form-field-container dynamic-field">
        <select name="nationality" ref={register()} defaultValue={link.nationality} onChange={e => handleLinkChange(e, i)}>
          <option value="Canadian">Canadian</option>
          <option value="American">American</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-field-container dynamic-field">
        <select name="is_app" ref={register()} defaultValue={link.is_app} onChange={e => handleLinkChange(e, i)}>
          <option value={false}>Web Link</option>
          <option value={true}>App</option>
        </select>
      </div>
  
      <div>
        {linkList.length >= 1 && 
          <Button 
            type="button" 
            variant="contained"
            size="small"
            className="remove-btn"
            startIcon={<RemoveCircleIcon />} 
            onClick={() => handleRemoveLink(i)}
          >
            Remove
          </Button>}
      </div>
    </div>
  )

  const VideoFields = videoList.map((video, i) => 
    <div key={i} className="dynamic-field-row">
      <div className="form-field-container dynamic-field">
        <input
          name="link"
          placeholder="video"
          value={video.link}
          onChange={e => handleVideoChange(e, i)}
        />
      </div>
      <div className="form-field-container dynamic-field">
        <input
          name="name"
          placeholder="Link name"
          value={video.name}
          onChange={e => handleVideoChange(e, i)}
        />
      </div>
      <div className="form-field-container dynamic-field">
        <select name="language" ref={register()} defaultValue={video.language} onChange={e => handleVideoChange(e, i)}>
          <option value="English">English</option>
          <option value="French">French</option>
        </select>
        {errors.language && <p>This field is required</p>}
      </div>
      <div>
        {videoList.length >= 1 && 
          <Button 
            type="button" 
            variant="contained"
            size="small"
            className="remove-btn"
            startIcon={<RemoveCircleIcon />} 
            onClick={() => handleRemoveVideo(i)}
          >
            Remove
          </Button>}
      </div>
    </div>
  )

  const imageInput = () => {
    document.getElementById("image-input").click()
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageDisplay(URL.createObjectURL(event.target.files[0]))
    }
   }

  return (
    <Dialog fullWidth={true} maxWidth={'md'} open={open}>
      <DialogTitle className="form-dialog-title">{mode} Treatment</DialogTitle>
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
            <label>Description</label>
              <textarea
                name="description"
                ref={register({required: true})}
              />
              {errors.description && <p>This field is required</p>}
            </div>
          </div>

          <div className="form-field-container">
            <label>Supervision</label>
            <Controller
              as={
                <RadioGroup row aria-label="supervision">
                  <FormControlLabel className="radio-space" value="SC" control={<Radio/>} labelPlacement="end" label="SC" />
                  <FormControlLabel className="radio-space" value="HCP" control={<Radio/>} labelPlacement="end" label="HCP" />
                </RadioGroup>
              }
              name="supervision" 
              control={control}
              rules={{ required: true }}
              defaultValue="" 
            />
            {errors.supervision && <p>This field is required</p>}
          </div>
          
          <div className="form-field-container">
            <label>Specification</label>
            <Controller
              as={
                <RadioGroup row aria-label="specification">
                  <FormControlLabel className="radio-space" value="general" control={<Radio />} labelPlacement="end" label="General" />
                  <FormControlLabel className="radio-space" value="jaw" control={<Radio />} labelPlacement="end" label="Jaw" />
                  <FormControlLabel className="radio-space" value="wrists" control={<Radio />} labelPlacement="end" label="Wrists" />
                  <FormControlLabel className="radio-space" value="legs" control={<Radio />} labelPlacement="end" label="Legs" />
                </RadioGroup>
              }
              name="specification" 
              control={control}
              rules={{ required: true }}
              defaultValue="general" 
            />
            {errors.specification && <p>This field is required</p>}
          </div>

          <div className="form-row align-start"> 
            <div className="form-field-container">
              <label>Evidence Level</label>
              <input
                name="evidence_level"
                type="number"
                ref={register({ required: true, min: 1, max: 9})}
              />
              {errors.evidence_level?.type === "required" && <p>This field is required</p>}
              {(errors.evidence_level?.type === "max" ||  errors.score?.type === "min" ) && <p>Value must be between 1 and 9</p>}
            </div>

            <div className="form-field-container">
              <label>Order Number</label>
              <input
                name="order_number"
                type="number"
                ref={register({ required: true, min: 1})}
              />
              {errors.order_number?.type === "required" && <p>This field is required</p>}
              {(errors.order_number?.type === "min" ) && <p>Value cannot be lower than 1</p>}
            </div>
          </div>

          <div className="form-field-container">
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
                    onChange={handleCatChange}
                />
                )}
              </FormGroup>
            </FormControl>
          </div>

          <div className="form-row">
            <div className="form-field-container fill-width">
              <label>traffic light description</label>
                <textarea
                  name="traffic_description"
                  ref={register({ required: true })}
                />
                {errors.traffic_description && <p>This field is required</p>}
            </div>
          </div>

          <div className="form-field-container">
            <label>Traffic light level</label>
            <Controller
              as={
                <RadioGroup row aria-label="traffic level">
                  <FormControlLabel className="radio-space" value="1" control={<Radio />} labelPlacement="end" label="Green" />
                  <FormControlLabel className="radio-space" value="2" control={<Radio />} labelPlacement="end" label="Yellow" />
                  <FormControlLabel className="radio-space" value="3" control={<Radio />} labelPlacement="end" label="Red" />
                </RadioGroup>
              }
              name="traffic_level" 
              control={control}
              rules={{ required: true }}
              defaultValue=""
            />
            {errors.traffic_level && <p>This field is required</p>}
          </div>
          
          <div className="form-field-container">
            <label>What do experts suggest</label>
            <input
              name="experts_suggest"
              ref={register()}
            />
          </div>

          <div className="form-field-container">
            <label>How can I use this treatment?</label>
            <textarea
              name="how_use"
              ref={register()}
              rows={3}
            />
          </div>

          <div className="form-field-container">
            <label>How soon will I feel better?</label>
            <textarea
              name="how_soon"
              ref={register()}
            />
          </div>

          <div className="form-field-container">
            <label>How much does this treatment cost?</label>
            <textarea
              name="cost"
              ref={register()}
            />
          </div>

          <div className="form-field-container">
            <label>Where can I get this treatment?</label>
            <textarea
              name="where"
              ref={register()}
            />
          </div>

          <div className="form-field-container">
            <label>What else should I consider?</label>
            <textarea
              name="consider"
              ref={register()}
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-field-container">
              <label>Treatment classification</label>
              <select name="treatment_classification_id" ref={register()}>
                {classifications && classifications.map(item => 
                  <option key={item.id} value={item.id}>{item.name}</option>
                  )
                }
              </select>
              {errors.treatment_classification_id && <p>This field is required</p>}
            </div>
          </div>


          <div className="form-field-container short">
            <label>Upload image (PNG, JPG)</label>
            {/* <img alt="treatment" width='300' height='200' src={values.image ? `${baseUrl}/${values.image}`: placeholder} /> */}
            <img alt="treatment" id="treatment-image" width='275' height='200' src={imageDisplay} onClick={imageInput}/>
            <input 
              type="file" 
              name="image"
              id="image-input"
              accept="image/png, image/jpeg"
              onChange={onImageChange}
              hidden
              ref={register()}
            /> 
          </div>
         
          
          <label>Web Links</label>
          {linkFields}
          <Button 
            type="button" 
            variant="contained"
            size="small"
            className="add-icon add-btn"
            startIcon={<AddIcon />} 
            onClick={addLinkField}
          >
            Add Web Link
          </Button>

          <label>Video Links</label>
          {VideoFields}
          <Button 
            type="button" 
            variant="contained"
            size="small"
            className="add-icon add-btn"
            startIcon={<AddIcon />} 
            onClick={addVideoField}
          >
            Add Video Link
          </Button>
        
          <div className="form-buttons">
            <input type="submit" />
            <button type="button" onClick={handleClosing}>Cancel</button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default TreatmentForm