/**
 * @file
 * Component for step 4 Plan "6. Let's review the key facts" section
 * Contains the UI and fetches the user selection
 * @author <akel.ms93@gmail.com>
 */

import React, {useState, useEffect} from "react";
import {withStyles} from '@material-ui/core/styles';

import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {getRequest} from "../../API/ApiHandler"

const OrangeRadio = withStyles({
  root: {
    width: 46,
    height: 46,
    '&$checked': {
      color: "#F15A2B",
    },
  },
  checked: {},
})(Radio);

const PlanReview = ({setReview, setSaved, setSaveStatus}) => {
  const [text, setText] = useState()
  const [value, setValue] = React.useState('')

  const getUserReview = async () => {
    let data = await getRequest(`/reviews/user`)
    if(data){
      let {selection} =  data
      setReview(selection)
      setValue(selection)

      {lang === "English" ? 
        selection === 'true'? 
          setText("Good answer! There are a few treatments that can help manage arthritis pain.") : 
          setText("There are a few treatments that can help manage arthritis pain.") : 
        selection === 'true'? 
          setText("Bonne réponse! Il existe quelques traitements qui peuvent aider à soulager la douleur arthritique.") : 
          setText("Il existe quelques traitements qui peuvent aider à soulager la douleur arthritique.")}
    }
  }

  const handleChange = ev => {
    let targetValue = ev.target.value;
    switch (targetValue) {
      case "true":
        {lang === "English" ? 
          setText("Good answer! There are a few treatments that can help manage arthritis pain.") : 
          setText("Bonne réponse! Il existe quelques traitements qui peuvent aider à soulager la douleur arthritique.")}
        break;
      case "false":
        {lang === "English" ? 
          setText("There are a few treatments that can help manage arthritis pain.") : 
          setText("Il existe quelques traitements qui peuvent aider à soulager la douleur arthritique.")}
        break;
      case "don't know":
        {lang === "English" ? 
          setText("There are a few treatments that can help manage arthritis pain.") : 
          setText("Il existe quelques traitements qui peuvent aider à soulager la douleur arthritique.")}
        break;
      default:
    }
    setReview(targetValue)
    setValue(targetValue)
    setSaved(false)
    setSaveStatus('default')
  }

  useEffect(() => {
    getUserReview()
  },[])

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  return (
    <div className="review_key_facts box-container-numbered">
      <h4 className="numbered-subheading">{lang === "English" ? "6. Let's review the key facts" : "6. Passons en revue quelques informations essentielles"}</h4>
      <h5>
        {lang === "English" ? "Studies show that some treatments" : "Des études montrent que certains traitements"}
        <br />
        {lang === "English" ? "can help manage arthritis pain." : "peuvent aider à soulager la douleur arthritique."}
      </h5>
      <FormControl className="radio-group">
        <RadioGroup onChange={handleChange} className="radio-group" value={value} row>
          <FormControlLabel
            control={<OrangeRadio />}
            value="true"
            className="radio-button"
            labelPlacement="top"
            label={lang === "English" ? "True" : "Vrai"}
          />
          <FormControlLabel
            control={<OrangeRadio />}
            value="false"
            className="radio-button"
            labelPlacement="top"
            label={lang === "English" ? "False" : "Faux"}
          />
          <FormControlLabel
            control={<OrangeRadio />}
            value="don't know"
            className="radio-button"
            labelPlacement="top"
            label={lang === "English" ? "Don't Know" : "Je ne sais pas"}
          />
        </RadioGroup>
      </FormControl>
      <p>{text}</p>
    </div>
  );
}

export default PlanReview
