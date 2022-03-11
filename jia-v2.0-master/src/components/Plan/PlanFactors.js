/**
 * @file
 * Component for step 4 Plan "4. Will any of these factors prevent you from following your new plan? section
 * Contains the UI, fetches factors list and the user selection(s)
 * @author <akel.ms93@gmail.com>
 */

import React, {useState, useEffect} from "react";
import {getRequest} from "../../API/ApiHandler"
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

const PlanFactors = ({selectedFactors, setSelectedFactors, setSaved, setSaveStatus, planFactorsText, setPlanFactorText}) => {
  const [factors, setFactors] = useState([])

  const theme = createMuiTheme({
    palette: {
      primary: { main: '#10434F' },
    },
  });

  const getFactors = async() => {
    let data = await getRequest("/factors")
    if(data) setFactors(data)
  }

  const getUserFactors  = async() => {
    let data = await getRequest(`/userFactors/user`)
    if(data) handleSelected(data)
  }

  const getPlanFactorText = async() => {
    let text = await getRequest(`/planFactorsText/user`)
    if(text) setPlanFactorText(text.text)      
  }

  const handleTextChange = ev => {
    const text = ev.target.value;
    setPlanFactorText(text)
    setSaved(false)
    setSaveStatus('default')
  }

  const handleSelected = factors => {
    // Get check boxes
    const factorCheckBoxes = document.querySelectorAll(".factor")
    const factorsId = factors.map(factor => {
      // Check selected factor boxes
      factorCheckBoxes.forEach(el => {
        if (el.value === factor.title) {
          el.checked = true
          document.getElementById(`${factor.title}-desc`).style.display="block"
        }
      })
      // get factor id's
      let id = {id: factor.id}
      return id
    })
    setSelectedFactors(factorsId)
  }

  const checkedFactor = ev => {
    let id = parseInt(ev.target.id)
    if(ev.target.checked) {
      setSelectedFactors(prev => [...prev, {id}])
      document.getElementById(`${ev.target.value}-desc`).style.display="block"
    } else {
      setSelectedFactors(selectedFactors.filter(el => el.id !== id))
      document.getElementById(`${ev.target.value}-desc`).style.display="none"
    }
    setSaved(false)
    setSaveStatus('default')
  }

  useEffect(() => {
    getFactors()
    getUserFactors()
    getPlanFactorText()
  },[])

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  const factorItems = factors.length > 0 && factors.map(factor => (
    <div className="plan_factors" key={factor.id}>
      <div>
        <input
          id={factor.id}
          type="checkbox"
          className="factor"
          value={factor.title}
          onChange={checkedFactor}
        />
        <h5>{lang === "English" ? factor.title : factor.fr_title}</h5>
      </div>
      <p id={`${factor.title}-desc`} style={{display:"none"}}>{lang === "English" ? factor.description : factor.fr_description}</p>
      {factor.title == "Other" ? 
        <ThemeProvider theme={theme}>
          <TextField
            onChange={handleTextChange}
            className="text-field"
            label={lang === "English" ? "Please Explain" : "Veuillez expliquer"}
            margin="normal"
            variant="outlined"
            fullWidth
            multiline
            value={planFactorsText}
            InputLabelProps={{
              shrink: true,
            }}
            rows="6"
            id="consider-other-factors"
          />
        </ThemeProvider>
        :
        ""
      }

    </div>
  ))

  return (
    <div className="box-container-numbered">
      <h4 className="numbered-subheading">
        {lang === "English" ? 
          "4. Will any of these factors prevent you from following your new plan?" : 
          "4. Croyez-vous que l’un de ces facteurs vous empêchera de suivre votre nouveau plan?"}
        <span>{lang === "English" ? "(Check all that apply)" : "(Cochez toutes les réponses qui s’appliquent.)"}</span>
      </h4>
      <div className="padding-class">
        {factorItems}
      </div>
    </div>
  )
}

export default PlanFactors
