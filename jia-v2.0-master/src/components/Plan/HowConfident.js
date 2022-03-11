import React, { useState, useEffect } from 'react'
import SliderControl from '../../components/UI/Slider/SliderControl'
import {getRequest} from "../../API/ApiHandler"
import CircleControl from '../../components/UI/Slider/CircleControl'


const HowConfident = ({confidenceLevel, setConfidenceLevel, setSaved, setSaveStatus}) => {
  
  const [collapse, setCollapse] = useState(true)
  const [other, setOther] = useState()
  
  const getConfidenceLevel = async () => {
    let data = await getRequest(`/confidence/user`)
    if(data) {
      let {data:{level}} = data
      setConfidenceLevel(level)
    } 
  }

  const setValue = (value) => {
    setConfidenceLevel(value)
    setSaved(false)
    setSaveStatus('default')
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
}
  
  useEffect(() => {
    getConfidenceLevel()
  }, [])

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  return (
    <div className="box-container-numbered">
      <h4 className="numbered-subheading">{lang === "English" ? 
        "3. How confident are you that you can follow your plan?" : 
        "3. Dans quelle mesure êtes-vous confiant(e) de pouvoir suivre votre plan?"}</h4>

      <CircleControl 
           setValue={setValue} 
           minLabel={lang === "English" ? "Not Confident at All" : "Pas du tout confiant(e)"} 
           maxLabel={lang === "English" ? "Very Confident" : "Très confiant(e)"} 
           reversed={false}
           value={confidenceLevel}
           forSlider="confident-of-following">

      </CircleControl>

    </div>
  )
}

export default HowConfident