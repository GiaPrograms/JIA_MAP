import React, { useState, useEffect } from 'react'
import TreatmentButton from './TreatmentButton'
import {getRequest} from "../../API/ApiHandler"

const TreatmentsClassification = ({id, classification, selectedTreatments, setSelectedTreatments, setSaved, setSaveStatus}) => {
  const [treatments, setTreatments] = useState([])

  const getTreatments = async () => {
    let data = await getRequest("/treatments")
    if(data) setTreatments(data)
  }

  useEffect(() => {
    getTreatments()
  },[])

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  const classificationContent = (treatments.length > 0) &&
  treatments.filter(treatment => {
     if(treatment.treatment_classification_id === id) return true
     return false
  }).map(treatment => 
    <TreatmentButton 
      key = {treatment.id}
      treatment = {treatment}
      selectedTreatments = {selectedTreatments} 
      setSelectedTreatments = {setSelectedTreatments}
      setSaved={setSaved}
      setSaveStatus={setSaveStatus}
    />
  )

  return(
    <div className="StepTwo-div other">
      <h4 className="Step-subHeading">{classification}</h4>
      <div>
        {classificationContent.length 
          ? classificationContent 
          : <h4 style={{padding: '1.5rem'}}>{lang === "English" ? 
              "There are currently no items listed under this classification" : 
              "Il n'y a actuellement aucun article répertorié sous cette classification"}</h4>}
      </div>
    </div>
  )
}

export default TreatmentsClassification