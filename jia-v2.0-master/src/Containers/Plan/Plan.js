import React, {useState, useEffect} from 'react'
import {useBeforeunload} from 'react-beforeunload';
import Header from '../../components/Home/Header'
import Footer from "../../components/Footer";
import PlanList from '../../components/Plan/PlanList'

import PlanFactors from "../../components/Plan/PlanFactors"
import PlanSuggestions from '../../components/Plan/PlanSuggestions';
import PlanReview from '../../components/Plan/PlanReview';
import HowMotivated from '../../components/Plan/HowMotivated';
import HowConfident from '../../components/Plan/HowConfident';

import SaveButton from "../../components/UI/SaveButton";
import DialogBox from '../../components/UI/DialogBox';
import Subheader from '../../components/UI/Subheader/Subheader';
import NavigationButton from '../../components/UI/Buttons/NavigationButton';
import NavigationDialog from "../../components/UI/NavigationDialog"
import FailedSaveDialog from "../../components/UI/FailedSaveDialog";

import {updateLogPlan, updateLogStepThree} from "../../components/HandleUserLog"
import {getRequest, postRequest} from "../../API/ApiHandler"

import {logout, getUserType} from '../../components/AuthenticationService';

const Plan = props => {
  const [plan, setPlan] = useState([])
  const [motivationLevel, setMotivationLevel] = useState(0)
  const [confidenceLevel, setConfidenceLevel] = useState(0)
  const [userFactors, setUserFactors] = useState([])
  const [planFactorsText, setPlanFactorText] = useState("")
  const [userSuggestions, setUserSuggestions] = useState([])
  const [review, setReview] = useState()

  const [favs, setFavs] = useState([])
  const [treatments, setTreatments] = useState([])
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

  // TODO: Set a single source of truth for treatments and favourites
  const getUserFavourite = async() => {
    let data = await getRequest(`/userFavourites/user`)
    if(data) {
      const ids = data.map(treatment => {return {id: treatment.id}})
      setFavs(ids)
    }
  }

  const getTreatments = async() => {
    let data = await getRequest("/treatments")
    if(data.length > 0) setTreatments(data)
  }

  // Save values on save button click
  const saveHandler = async() => {
    await Promise.all([
      savePlanList(),
      saveMotivationLevel(),
      saveConfidenceLevel(),
      saveUserFactors(),
      saveUserSuggestions(),
      saveReview(),
      savePlanFactorText(),
    ]).then(data => {
      let failed = data.indexOf() !== -1
      if(!failed) {
        updateLog()
        setSaved(true)
        setSaveStatus('success')
      } else {
        setSaveStatus('default')
        setOpen(true)
      }
    })
  }

  const updateLog = async() => {
    updateLogPlan(plan)
    let factors = await getRequest(`/userFactors/user`)
    if(factors) {
      factors = factors.map(el => {
        let title = {title: el.title}
        return title
      })
    }

    let suggestions = await getRequest(`/userSuggestions/user`)
    if(suggestions) {
      suggestions = suggestions.map(el => {
        let title = {title: el.title}
        return title
      })
    }

    const data = {
      motivation_level: motivationLevel,
      confidence_level: confidenceLevel,
      factors,
      plan_factors_texts: planFactorsText,
      suggestions
    }
    updateLogStepThree(data)
  }

  const savePlanList = () => {
    const input = {plan}
    return postRequest("/userPlans", input, setSaveStatus)
  }

  const saveMotivationLevel = () => {
    const input = {level: motivationLevel}
    return postRequest("/motivations", input, setSaveStatus)
  }

  const saveConfidenceLevel = () => {
    const input = {level: confidenceLevel}
    return postRequest("/confidence", input, setSaveStatus)
  }

  const saveUserFactors = () => {
    const input = {selectedFactors: userFactors}
    return postRequest("/userFactors", input, setSaveStatus)
  }

  const savePlanFactorText = () => {
    const input = {text: planFactorsText}
    return postRequest('/planFactorsText', input, setSaveStatus)
  }

  const saveUserSuggestions = () => {
    const input = {selectedSuggestions: userSuggestions,}
    return postRequest("/userSuggestions", input, setSaveStatus)
  }

  const saveReview = () => {
    const input = {selection: review,}
    return postRequest("/reviews", input, setSaveStatus)
  }

  const handleNavigation = () => {
    if(saved) {
      props.history.push(`/summary`)
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
      navBy === "button" ? props.history.push(`/summary`) : 
      navBy === "admin" ? props.history.push(`/adminPanel/users`) : 
      navBy === "user" ? props.history.push(`/userPanel/average`) : 
      navBy === "logout" ? props.history.push(`/`) : 
      props.history.push(navTo) 
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    if(localStorage.getItem('s4Trial')) setDidSelect(true)
    getTreatments()
    getUserFavourite()
  },[])

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  return (
    <div className="wrapper">
      <div className='page-header'>
        <Header current={props} handleNav={handleStepperNav} setNavTo={setNavTo}/>
      </div>
      <Subheader title={lang === "English" ? "Make your plan" : "Faites votre plan"}
        handleAdmin={handleSubHeaderAdminNav}
        handleUser={handleSubHeaderProgressNav}
        handleLogout={handleSubHeaderLogout}
      />
      <div className="body-container">
        <SaveButton saveHandler={saveHandler} saveStatus={saveStatus}/>
        <PlanList 
          favs={favs}
          treatments={treatments}
          plan={plan}
          setPlan={setPlan}
          setSaved={setSaved}
          setSaveStatus={setSaveStatus}
        />
        <HowMotivated
          motivationLevel={motivationLevel}
          setMotivationLevel={setMotivationLevel}
          setSaved={setSaved}
          setSaveStatus={setSaveStatus}
        />
        <HowConfident 
          confidenceLevel={confidenceLevel}
          setConfidenceLevel={setConfidenceLevel}
          setSaved={setSaved}
          setSaveStatus={setSaveStatus}
        />
        <PlanFactors 
          selectedFactors={userFactors}
          setSelectedFactors={setUserFactors}
          setSaved={setSaved}
          setSaveStatus={setSaveStatus}
          planFactorsText={planFactorsText}
          setPlanFactorText={setPlanFactorText}
        />
        <PlanSuggestions 
          selectedSuggestions={userSuggestions}
          setSelectedSuggestions={setUserSuggestions}
          setSaved={setSaved}
          setSaveStatus={setSaveStatus}
        />
        <PlanReview
          review={review}
          setReview={setReview}
          setSaved={setSaved}
          setSaveStatus={setSaveStatus}
        />
        <SaveButton saveHandler={saveHandler} saveStatus={saveStatus}/>
      </div>
      {/* Component for navigation button and title above the button */}
      <NavigationButton 
        title={lang === "English" ? 
          "Now that you have made your \n plan, here is your summary" : 
          "Maintenant que vous avez fait votre \n plan, en voici le résumé"}
        btnText={lang === "English" ? "Continue to Your Summary" : "Continuez vers votre résumé"}
        handleNavigation={handleNavigation}
      />
      <Footer/>
      {!didSelect && <DialogBox description={lang === "English" ? 
        "The selected information will be saved in the trial database. You can modify the information as needed."  : 
        "Les informations sélectionnées seront enregistrées dans la base de données d'essai. Vous pouvez modifier les informations selon vos besoins."}
        step='s4Trial'/>}
      <NavigationDialog open={displayNavDialog} handleClose={closeNavDialog} saveHandler={saveHandler} saveStatus={saveStatus} isLogout={navBy}/>
      <FailedSaveDialog open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Plan