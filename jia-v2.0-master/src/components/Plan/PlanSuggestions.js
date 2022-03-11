/**
 * @file
 * Component for step 4 Plan "5. Here are suggestions to help you plan your next steps" section
 * Contains the UI, fetches suggestions list and the user selection(s)
 * @author <akel.ms93@gmail.com>
 */
import React, {useState, useEffect} from 'react'
import {getRequest} from "../../API/ApiHandler"

const PlanSuggestions = ({selectedSuggestions, setSelectedSuggestions, setSaved, setSaveStatus}) => {
  const [suggestions, setSuggestions] = useState([])

  const getSuggestions = async () => {
    let data = await getRequest("/suggestions")
    if(data) setSuggestions(data)
  }

  const getUserSuggestions = async () => {
    let data = await getRequest(`/userSuggestions/user`)
    if(data) handleSelected(data)
  }

  const handleSelected = suggestions => {
    // Get check boxes
    const suggestionCheckBoxes = document.querySelectorAll(".step")
    const suggestionsId = suggestions.map(suggestion => {
      // Check selected suggestion boxes
      suggestionCheckBoxes.forEach(el => {
        if (el.value === suggestion.title) {
          el.checked = true
          document.getElementById(`${suggestion.title}-desc`).style.display="block"
        }
      })
      // get suggestion id's
      let id = {id: suggestion.id}
      return id
    })
    setSelectedSuggestions(suggestionsId)
  }

  const checkedSuggestion = ev => {
    let id = parseInt(ev.target.id)

    if( ev.target.checked) {
      setSelectedSuggestions(prev => [...prev, {id}])
      document.getElementById(`${ev.target.value}-desc`).style.display="block"
    } else {
      setSelectedSuggestions(selectedSuggestions.filter(el => el.id !== id))
      document.getElementById(`${ev.target.value}-desc`).style.display="none"
    }
    setSaved(false)
    setSaveStatus('default')
  }
  
  useEffect(() => {
    getSuggestions()
    getUserSuggestions()
  }, [])

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  const suggestionItems = suggestions.length > 0 && suggestions.map(suggestion => (
    <div className="plan_steps" key={suggestion.id}>
      <div>
        <input
          id={suggestion.id}
          type="checkbox"
          className="step"
          value={suggestion.title}
          onChange={checkedSuggestion}
        />
        <h5>{lang === "English" ? suggestion.title : suggestion.fr_title}</h5>
      </div>
      <p id={`${suggestion.title}-desc`} style={{display:"none"}}>{lang === "English" ? suggestion.description : suggestion.fr_description}</p>
    </div>
  ))

  return(
    <div className="box-container-numbered">
      <h4 className="numbered-subheading"> {lang === "English" ? "5. Here are suggestions to help you plan your next steps" : "5. Voici quelques suggestions qui pourraient vous aider à planifier les prochaines étapes"}
        <span>{lang === "English" ? "(Check the ones you wish to use)" : "(Cochez celles que vous souhaitez retenir)"}</span>
      </h4>
      <div className="padding-class">
        {suggestionItems}
      </div>
    </div>
  )
}

export default PlanSuggestions