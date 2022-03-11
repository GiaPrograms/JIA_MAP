import React, { useState, useEffect } from 'react'
import SliderControl from '../UI/Slider/SliderControl';
import {Collapse} from 'reactstrap';
import {getRequest} from "../../API/ApiHandler"
import CircleControl from '../UI/Slider/CircleControl';


const QStepSix = ({controlArthritis, setControlArthritis, managePain, setManagePain, setSaved, setSaveStatus})  => {
  const [collapse, setCollapse] = useState(true)
  const [other, setOther] = useState()

  const getSlidersValues = async() => {
    const data = await getRequest(`/effectiveness/user`)
    if(data) {
      const { data:{control_arthritis, manage_pain} } = data
      setControlArthritis(control_arthritis)
      setManagePain(manage_pain)
    }
  }

  const setValue = (value, ...others) => {
    let forSlider = others[1]
    forSlider === "control-arthritis" 
      ? setControlArthritis(value) 
      : setManagePain(value)

    setSaved(false)
    setSaveStatus('default')
  }

  const handleCollapse = () => {
    setCollapse(!collapse)
    sessionStorage.setItem('howwell-collapse', !collapse)
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
    getSlidersValues()
    if(sessionStorage.getItem('howwell-collapse')) {
      setCollapse(JSON.parse(sessionStorage.getItem('howwell-collapse')))
    }
  }, [])

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  return(
    <React.Fragment>
      <div className="pain-div box-container-numbered collapsable">
        <div id="sixth" onClick={handleCollapse}>
          <h4 className="numbered-subheading">
            {lang === "English" ? 
            "6. How well do your treatments work?" : 
            "6. Dans quelle mesure vos traitements sont-ils efficaces?"}
            <span className="collapsed-icon">{collapse ? "▲" : lang === "English" ? "(Expand) ▼" : "(Développer) ▼"}</span>
          </h4>
        </div>
        <Collapse isOpen={collapse}>
          <div className="padding-class">
            <h4>
              {lang === "English" ? 
              "How well does your treatment control your arthritis?" : 
              "Dans quelle mesure vos traitements contrôlent-ils efficacement votre arthrite?"}
            </h4>
            <CircleControl 
              setValue={setValue} 
              minLabel={lang === "English" ? "Not Well at All" : "Pas bien du tout"} 
              maxLabel={lang === "English" ? "Very Well" : "Très bien"} 
              reversed={false}
              value={controlArthritis}
              forSlider="control-arthritis">
            </CircleControl>

            <h4>{lang === "English" ? 
              "How well does your treatment manage your pain?" : 
              "Dans quelle mesure vos traitements soulagent-ils votre douleur?"}
            </h4>
            
            <CircleControl 
              setValue={setValue} 
              minLabel={lang === "English" ? "Not Well at All" : "Pas bien du tout"} 
              maxLabel={lang === "English" ? "Very Well" : "Très bien"}
              reversed={false}
              value={managePain}
              forSlider="manage-pain">
            </CircleControl>

          </div>

        </Collapse>
      </div>
    </React.Fragment>
  )
}

export default QStepSix