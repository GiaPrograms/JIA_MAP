import React, { useState, useEffect } from 'react'
import { useBeforeunload } from 'react-beforeunload';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Footer from "../../components/Footer";

import SliderControl from '../../components/UI/Slider/SliderControl';
import Header from '../../components/Home/Header';
import DialogBox from "../../components/UI/DialogBox";
import SaveButton from "../../components/UI/SaveButton";
import { handleRecommendations } from "../../components/GenerateRecommendations"
import Subheader from '../../components/UI/Subheader/Subheader';
import NavigationButton from '../../components/UI/Buttons/NavigationButton';
import NavigationDialog from "../../components/UI/NavigationDialog"
import FailedSaveDialog from '../../components/UI/FailedSaveDialog';
import { updateLogPrefs } from "../../components/HandleUserLog"
import { getRequest, postRequest } from "../../API/ApiHandler"
import CircleControl from '../../components/UI/Slider/CircleControl';

import {logout, getUserType} from '../../components/AuthenticationService';


const theme = createMuiTheme({
  palette: {
    primary: { main: '#10434F' },
  },
});

const WhatsImportant = props => {
  const [sliders, setSliders] = useState([])
  const [preferenceText, setPreferenceText] = useState()
  const [saved, setSaved] = useState(true)
  const [displayNavDialog, setDisplayNavDialog] = useState(false)
  const [navBy, setNavBy] = useState('')
  const [navTo, setNavTo] = useState('')
  const [didSelect, setDidSelect] = useState(false)
  const [saveStatus, setSaveStatus] = useState('default')
  const [open, setOpen] = useState(false)
  const [other, setOther] = useState()

  const [isLoading, setIsLoading] = useState()

  // Check if there are unsaved changed when user attempts to close or refresh page and display a message.
  useBeforeunload(event => {
    if (!saved) event.preventDefault()
  })

  React.useEffect(() => {
    getUserType()
  })

  // Get the what's important sliders from the DB
  const getPrefs = async () => {
    let data = await getRequest("/preferences")
    if (data) data.forEach(el => el.value = 0)
    setSliders(prefs => ([...prefs, ...data]))
    setIsLoading(false)
  }

  const getUserPrefs = async () => {
    let preferences = await getRequest(`/userPreferences/user`)
    if (preferences) {
      const prefs = preferences.map(pref => {
        return {
          id: pref.user_preference.preferenceId,
          value: pref.user_preference.value,
        }
      })
      let setUserValues = sliders.map(slider => {
        prefs.forEach(el => {
          if (el.id === slider.id) slider.value = el.value
        })
        return slider
      })
      setSliders(setUserValues)
    }
  }

  const getPreferenceText = async () => {
    let text = await getRequest(`/preferenceText/user`)
    if (text) setPreferenceText(text.text)
  }

  const saveHandler = async () => {
    await Promise.all([
      savePrefs(),
      savePrefText()
    ]).then(data => {
      let failed = data.indexOf() !== -1
      if (!failed) {
        handleRecommendations()
        updateLog()
        setSaveStatus('success')
        setSaved(true)
      } else {
        setSaveStatus('default')
        setOpen(true)
      }
    })
  }

  const updateLog = () => {
    let prefs = sliders.map(el => {
      let data = {
        description: el.description,
        value: el.value
      }
      return data
    })

    const data = {
      prefs: prefs,
      preference_text: preferenceText,
    }
    updateLogPrefs(data)
  }

  const savePrefs = () => {
    const input = { sliders: sliders }
    return postRequest("/userPreferences", input, setSaveStatus)
  }

  const savePrefText = () => {
    const input = { text: preferenceText }
    return postRequest("/preferenceText", input)
  }

  const setValue = (value, ...others) => {
    const id = others[0]
    sliders.forEach(slider => {
      if (id === slider.id) {
        slider.value = value
      }
    })
    setSaved(false)
    setSaveStatus('default')
  }

  const handleTextChange = ev => {
    const text = ev.target.value
    setPreferenceText(text)
    setSaved(false)
    setSaveStatus('default')
  }

  const handleButtonNav = () => {
    if (saved) {
      props.history.push(`/review-and-select`)
    } else {
      setNavBy('button')
      setDisplayNavDialog(true)
    }
  }

  const handleStepperNav = to => {
    if (saved) {
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
      navBy === "button" ? props.history.push(`/review-and-select/recommendations`) : 
      navBy === "admin" ? props.history.push(`/adminPanel/users`) : 
      navBy === "user" ? props.history.push(`/userPanel/average`) : 
      navBy === "logout" ? props.history.push(`/`) : 
      props.history.push(navTo) 
  }

  //=============checked to change color


  const checkedZero = ev => {
    let buttonList = document.querySelectorAll(".StepFour-div-other div");
    buttonList.forEach((button) => {
      if (button.style.backgroundColor) button.style.backgroundColor = ""
    });
    ev.target.style.backgroundColor = "#008000";
    //10434F

    let medVal = ev.target.getAttribute("value")
    setOther(medVal)

    setSaved(false)
    setSaveStatus('default')
  }

  const checkedOne = ev => {
    let buttonList = document.querySelectorAll(".StepFour-div-other div");
    buttonList.forEach((button) => {
      if (button.style.backgroundColor) button.style.backgroundColor = ""
    });
    ev.target.style.backgroundColor = "#8FE381";
    //10434F

    let medVal = ev.target.getAttribute("value")
    setOther(medVal)

    setSaved(false)
    setSaveStatus('default')
  }

  const checkedTwo = ev => {
    let buttonList = document.querySelectorAll(".StepFour-div-other div");
    buttonList.forEach((button) => {
      if (button.style.backgroundColor) button.style.backgroundColor = ""
    });
    ev.target.style.backgroundColor = "#B0F5AB";
    //10434F

    let medVal = ev.target.getAttribute("value")
    setOther(medVal)

    setSaved(false)
    setSaveStatus('default')
  }

  const checkedThree = ev => {
    let buttonList = document.querySelectorAll(".StepFour-div-other div");
    buttonList.forEach((button) => {
      if (button.style.backgroundColor) button.style.backgroundColor = ""
    });
    ev.target.style.backgroundColor = "#ffff7f";
    //10434F

    let medVal = ev.target.getAttribute("value")
    setOther(medVal)

    setSaved(false)
    setSaveStatus('default')
  }

  const checkedFour = ev => {
    let buttonList = document.querySelectorAll(".StepFour-div-other div");
    buttonList.forEach((button) => {
      if (button.style.backgroundColor) button.style.backgroundColor = ""
    });
    ev.target.style.backgroundColor = "#FC6C85";
    //10434F

    let medVal = ev.target.getAttribute("value")
    setOther(medVal)

    setSaved(false)
    setSaveStatus('default')
  }
  const checkedFive = ev => {
    let buttonList = document.querySelectorAll(".StepFour-div-other div");
    buttonList.forEach((button) => {
      if (button.style.backgroundColor) button.style.backgroundColor = ""
    });
    ev.target.style.backgroundColor = "#FF0000";
    //10434F

    let medVal = ev.target.getAttribute("value")
    setOther(medVal)

    setSaved(false)
    setSaveStatus('default')
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    if (localStorage.getItem('s2Trial')) setDidSelect(true)
    setIsLoading(true)
    getPrefs()
    getPreferenceText()
  }, [])

  useEffect(() => {
    if (!isLoading) getUserPrefs()
  }, [isLoading])

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  return (
    <div className="wrapper">
      <div className='page-header'>
        <Header current={props} handleNav={handleStepperNav} setNavTo={setNavTo} />
      </div>
      <Subheader title={lang === "English" ? "What's important to you" : "Ce qui est important pour vous"} 
        handleAdmin={handleSubHeaderAdminNav}
        handleUser={handleSubHeaderProgressNav}
        handleLogout={handleSubHeaderLogout}
      />
      <div className="body-container">
        <SaveButton saveHandler={saveHandler} saveStatus={saveStatus} />
        <div className="notice summary-notice">
          <div>
            <h4>
              {lang === "English" ? 
              "The choices you make on this page will decide which treatments will be shown to you in the next step" : 
              "Les choix que vous ferez sur cette page détermineront les traitements qui vous seront présentés à l'étape suivante"}
            </h4>
          </div>
        </div>
        <div className="slider-component-div box-container">
          {sliders.length && sliders.map((slider, index) => (
            <div key={slider.id}>
              <h4>{index + 1}. {lang === "English" ? slider.description : slider.fr_description}</h4>
              <CircleControl
                setValue={setValue}
                minLabel={lang === "English" ? slider.left_label : slider.fr_left_label}
                maxLabel={lang === "English" ? slider.right_label : slider.fr_right_label}
                sliderId={slider.id}
                reversed={slider.reversed}
                value={slider.value}
                ></CircleControl>
            </div>
          ))

            }
            <h4>
              {lang === "English" ? 
                "7. Are there other things that are important to you when choosing a pain treatment?" : 
                "7. Y a-t-il autre chose qui est important lorsque vous choisissez un traitement pour la douleur?"}
            </h4>
            <ThemeProvider theme={theme}>
            <TextField
              onChange={handleTextChange}
              className="text-field"
              label={lang === "English" ? "Please Explain" : "Veuillez expliquer"}
              margin="normal"
              variant="outlined"
              fullWidth
              multiline
              value={preferenceText ? preferenceText : ''}
              InputLabelProps={{
                shrink: true,
              }}
              rows="6"
              id="consider-other-factors"
            />
          </ThemeProvider>
        </div>
        <SaveButton saveHandler={saveHandler} saveStatus={saveStatus} />
      </div>
      {/* Component for navigation button and title above the button */}

      <NavigationButton 
        title={lang === "English" ? 
              "Now that you have considered what is important to you,\n you can review and select treatment option" : 
              "Maintenant que vous avez réfléchi à ce qui est important pour vous,\n vous pouvez examiner et sélectionner l'option de traitement"}
        btnText={lang === "English" ? "Continue to Step 3" : "Passez à l'étape 3"}
        handleNavigation={handleButtonNav}
      />
      <Footer/>
      {!didSelect && <DialogBox description={lang === "English" ? 
        "The selected information will be saved in the trial database. You can modify the information as needed."  : 
        "Les informations sélectionnées seront enregistrées dans la base de données d'essai. Vous pouvez modifier les informations selon vos besoins."}
         step='s2Trial'/>}
      <NavigationDialog open={displayNavDialog} handleClose={closeNavDialog} saveHandler={saveHandler} saveStatus={saveStatus} isLogout={navBy}/>
      <FailedSaveDialog open={open} setOpen={setOpen}/>
    </div>
  )
}

export default WhatsImportant;
