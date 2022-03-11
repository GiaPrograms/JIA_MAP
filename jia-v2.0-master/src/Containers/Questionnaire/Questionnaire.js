/**
 * @file
 * container for step 1 "Pain & treatments"
 * display content and handles storing data to the database
 * @author <akel.ms93@gmail.com>
 */

import React, {useState, useEffect} from "react";
import {useBeforeunload} from 'react-beforeunload';
import {withRouter} from 'react-router-dom'

import Header from "../../components/Home/Header";
import Subheader from "../../components/UI/Subheader/Subheader";
import QStepOne from "../../components/Questionnaire/QstepOne";
import QStepTwo from "../../components/Questionnaire/QstepTwo";
import QStepThree from "../../components/Questionnaire/QstepThree";
import QStepFour from "../../components/Questionnaire/QstepFour";
import QStepFive from "../../components/Questionnaire/QStepFive";
import QStepSix from "../../components/Questionnaire/QStepSix";
import Footer from "../../components/Footer";

import DialogBox from "../../components/UI/DialogBox";
import SaveButton from "../../components/UI/SaveButton";
import {handleRecommendations} from "../../components/GenerateRecommendations"
import NavigationButton from "../../components/UI/Buttons/NavigationButton";
import NavigationDialog from "../../components/UI/NavigationDialog"
import FailedSaveDialog from "../../components/UI/FailedSaveDialog";
import {updateLogStepOne} from "../../components/HandleUserLog"
import {postRequest} from "../../API/ApiHandler"

import {logout, getUserType} from '../../components/AuthenticationService';

import './Questionnaire.css'

const Questionnaire = props => {
  // Q1 pain level value
  const [painLevel, setPainLevel] = useState(0)
  // Q2 pain areas values
  const [painAreas, setPainAreas] = useState()
  // Q3 selected meds
  const [selectedMeds, setSelectedMeds] = useState([])
  const [prescribedText, setPrescribedText] = useState("")
  // Q4 other selected meds and treatments
  const [selectedTreatments, setSelectedTreatments] = useState([])
  const [treatmentText, setTreatmentText] = useState("")
  // Q5 how often do you use your treatments values
  const [howOften, setHowOften] = useState({})
  const [frHowOften, setFrHowOften] = useState({})
  // Q6 how well does your treatment
  const [controlArthritis, setControlArthritis] = useState(0)
  const [managePain, setManagePain] = useState(0)

  const [saved, setSaved] = useState(true)
  const [displayNavDialog, setDisplayNavDialog] = useState(false)
  const [navBy, setNavBy] = useState('')
  const [navTo, setNavTo] = useState('')
  const [didSelect, setDidSelect] = useState(false)

  const [saveStatus, setSaveStatus] = useState('default')
  const [open, setOpen] = useState(false)

  // Check if there are unsaved changed when user attempts to close or refresh page and display a message.
  useBeforeunload(event => {
    if(!saved) event.preventDefault()
  })

  React.useEffect(() => {
    getUserType()
  })

  // Save values when save button is clicked
  const saveHandler = async() => {
    await Promise.all([
      savePainLevel(),
      savePainAreas(),
      saveSelectedMeds(),
      savePrescribedText(),
      saveSelectedTreatments(),
      saveTreatmentText(),
      saveHowOften(),
      saveHowWell()
    ]).then(data => {
      let failed = data.indexOf() !== -1
      if (!failed) {
        handleRecommendations()
        updateLog()
        setSaved(true)
        setSaveStatus('success')
      } else {
        setSaveStatus('default')
        setOpen(true)
      }
    })
  }

  const updateLog = () => {
    // List of prescribed meds
    const presMeds = selectedMeds.filter(med => med.classification.section === 'prescribed')
      .map(med => {
        let medName = {name: med.name}
        return medName
      })

    // list of other meds and treatments
    let otherTreats = selectedMeds.filter(med => med.classification.section === 'other')
      .map(med => {
        let medName = {name: med.name}
        return medName
      })
      
    let treats = selectedTreatments.map(el => {
      let name = {name: el.name}
      return name
    })
    otherTreats = [...otherTreats, ...treats]

    // only get pain areas which are selected
    const selectedAreas = []
    for(let area in painAreas) {
      if(painAreas[area]) selectedAreas.push({area})
    }
    const data = {
      pain_level: painLevel,
      pain_areas: selectedAreas,
      selected_meds: presMeds,
      prescribed_text: prescribedText,
      other_treatments: otherTreats,
      treatment_text: treatmentText,
      howOften_pres: howOften.pres,
      howOften_other: howOften.other,
      control_arthritis: controlArthritis,
      manage_pain: managePain
    }
    updateLogStepOne(data)
  }

  const savePainLevel = () => {
    const input = {level: painLevel}
    return postRequest('/painLevels', input, setSaveStatus)
  }

  const savePainAreas = () => {
    const input = {pain_areas: painAreas}
    return postRequest('/painAreas', input, setSaveStatus)
  }

  const saveSelectedMeds = () => {
    const input = {selectedMeds: selectedMeds,}
    return postRequest('/userMedications', input, setSaveStatus)
  }

  const savePrescribedText = () => {
    const input = {text: prescribedText}
    return postRequest('/prescribedText', input, setSaveStatus)
  }

  const saveSelectedTreatments = () => {
    const input = {selectedTreatments: selectedTreatments}
    return postRequest('/userTreatments', input, setSaveStatus)
  }

  const saveTreatmentText = () => {
    const input = {text: treatmentText}
    return postRequest('/treatmentText', input, setSaveStatus)
  }

  const getHowOften = (pres, other) => {
    setHowOften({
      pres,
      other,
    })
  }

  const getFrHowOften = (frPres, frOther) => {
    setFrHowOften({
      frPres,
      frOther,
    })
  }

  const saveHowOften = () => {
    const input = {
      prescribed_meds: howOften.pres,
      other_treatments: howOften.other,
      fr_prescribed_meds: frHowOften.frPres,
      fr_other_treatments: frHowOften.frOther
    }
    return postRequest('/frequently', input, setSaveStatus)
  }

  const saveHowWell = () => {
    const input = {
      control_arthritis: controlArthritis,
      manage_pain: managePain
    }
    return postRequest('/effectiveness', input, setSaveStatus)
  }

  const handleButtonNav = () => {
    if(saved) {
      props.history.push(`/whats-important-to-you`)
    } else {
      setNavBy('button')
      setDisplayNavDialog(true)
    }
  }

  const handleStepperNav = to => {
    if(saved) {
      props.history.push(to)
    } else {
      setNavBy('stepper')
      setDisplayNavDialog(true)
    }
  }

  const handleSubHeaderAdminNav = () => {
    if(saved) {
      props.history.push(`/adminPanel/users`)
    } else {
      setNavBy('admin')
      setDisplayNavDialog(true)
    }
  }

  const handleSubHeaderProgressNav = () => {
    if(saved) {
      props.history.push(`/userPanel/average`)
    } else {
      setNavBy('user')
      setDisplayNavDialog(true)
    }
  }

  const handleSubHeaderLogout = () => {
    if(saved) {
      logout()
      props.history.push(`/`)
    } else {
      setNavBy('logout')
      setDisplayNavDialog(true)
    }
  }

  const closeNavDialog = selection => {
    selection === 0 ? setDisplayNavDialog(false) : 
      navBy === "button" ? props.history.push(`/whats-important-to-you`) : 
      navBy === "admin" ? props.history.push(`/adminPanel/users`) : 
      navBy === "user" ? props.history.push(`/userPanel/average`) : 
      navBy === "logout" ? props.history.push(`/`) : 
      props.history.push(navTo) 
  }

  useEffect(() => {
    if(localStorage.getItem('s1Trial')) setDidSelect(true)
  })

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  return (
    <div className="wrapper">
      <div className='page-header'>
        <Header current={props} handleNav={handleStepperNav} setNavTo={setNavTo}/>
      </div>
      <Subheader title={lang === "English" ? "Pain & treatments" : "Douleur et traitements"} 
        handleAdmin={handleSubHeaderAdminNav}
        handleUser={handleSubHeaderProgressNav}
        handleLogout={handleSubHeaderLogout}
        />
      <div className="body-container">

        <SaveButton saveHandler={saveHandler} saveStatus={saveStatus}/>

        <QStepOne 
          setPainLevel = {setPainLevel} 
          painLevel = {painLevel}
          setSaved = {setSaved}
          setSaveStatus={setSaveStatus}
        />
        <QStepTwo 
          setPainAreas = {setPainAreas}
          setSaved = {setSaved}
          setSaveStatus={setSaveStatus}
        />
        <QStepThree 
          selectedMeds = {selectedMeds} 
          setSelectedMeds = {setSelectedMeds}
          prescribedText={prescribedText}
          setPrescribedText = {setPrescribedText}
          setSaved = {setSaved}
          setSaveStatus={setSaveStatus}
        />
        <QStepFour 
          selectedMeds = {selectedMeds} 
          setSelectedMeds = {setSelectedMeds}
          selectedTreatments = {selectedTreatments}
          setSelectedTreatments = {setSelectedTreatments}
          treatmentText={treatmentText}
          setTreatmentText={setTreatmentText} 
          setSaved = {setSaved}  
          setSaveStatus={setSaveStatus}
        />
        <QStepFive 
          getHowOften = {getHowOften}
          getFrHowOften = {getFrHowOften}
          setSaved = {setSaved}
          setSaveStatus={setSaveStatus}
        />
        <QStepSix 
          setControlArthritis={setControlArthritis}
          controlArthritis={controlArthritis}
          setManagePain={setManagePain}
          managePain={managePain}
          setSaved = {setSaved}
          setSaveStatus={setSaveStatus}
        />

        <SaveButton saveHandler={saveHandler} saveStatus={saveStatus}/>

      </div>
      {/* Component for navigation button and title above the button */}
      <NavigationButton 
        title={lang === "English" ? 
        "Now that you have considered your pain and treatments,\n let\`s go to the next step to clarify what\`simportant to you" : 
        "Maintenant que nous avons parlé de votre douleur et de vos traitements, \n passons à l’étape suivante pour explorer ce qui est important pour vous!"}
        btnText={lang === "English" ? "Continue to Step 2" : "Passez à l'étape 2"}
        handleNavigation={handleButtonNav}
      />
      <Footer/>
      {!didSelect && <DialogBox description= {lang === "English" ? 
        "The selected information will be saved in the trial database. You can modify the information as needed."  : 
        "Les informations sélectionnées seront enregistrées dans la base de données d'essai. Vous pouvez modifier les informations selon vos besoins."}
        step='s1Trial'/>}
      <NavigationDialog open={displayNavDialog} handleClose={closeNavDialog} saveHandler={saveHandler} isLogout={navBy}/>
      <FailedSaveDialog open={open} setOpen={setOpen}/>
    </div>


  )
}

export default withRouter(Questionnaire)
