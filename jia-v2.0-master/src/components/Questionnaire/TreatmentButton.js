import React, { useEffect } from 'react'
import ButtonVals from '../ButtonVals'

const TreatmentButton = ({treatment, selectedTreatments, setSelectedTreatments, setSaved, setSaveStatus}) => {
  const clickHandler = ev => {
    let isSelected = ButtonVals(ev);
    if (isSelected) {
      let {id, name} = treatment
      let _treatment = {id, name}
      setSelectedTreatments([...selectedTreatments, _treatment])
    } else {
      setSelectedTreatments(selectedTreatments.filter(item => item.name !== treatment.name))
    }
    setSaved(false)
    setSaveStatus('default')
  }

  const highlightSelectedTreatments = () => {
    selectedTreatments.forEach(item => {
      if(item.name === treatment.name) {
   
        let button = document.getElementById(`${item.name}`);
        button.setAttribute("data-selected", true)
        button.style.backgroundColor = "#10434F";
        button.style.color = "#FFF";
      }
    })
  }

  useEffect(() => {
    highlightSelectedTreatments()
  }, [])

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  return(
    <button id={treatment.name} onClick={clickHandler}>
      {lang === "English" ? treatment.name : treatment.fr_name}
    </button>
  )
}

export default TreatmentButton