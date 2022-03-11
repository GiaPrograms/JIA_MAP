import React, {useState, useEffect} from 'react'
import ClassificationButton from './ClassificationButton'
import {getRequest} from "../../API/ApiHandler"

const Classification = ({id, classification, selectedMeds, setSelectedMeds, setSaved, setSaveStatus}) => {
  const [medications, setMedications] = useState([])

  const getMedications = async() => {
    let {data} = await  getRequest("/medications")
    setMedications(data)
  }

  useEffect(() => {
    getMedications()
  },[])

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  const classificationContent = (medications.length > 0) &&
  medications.filter(med => {
     if(med.classification_id === id) return true
     return false
  }).map(med => 
    <ClassificationButton 
      key={med.id}
      med={med}
      selectedMeds = {selectedMeds} 
      setSelectedMeds = {setSelectedMeds}
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

export default Classification