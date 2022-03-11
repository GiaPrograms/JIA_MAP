import React, { useState, useEffect } from 'react'
import {Collapse} from 'reactstrap';
import {getRequest} from "../../API/ApiHandler"
import warning from '../../img/warning.png';

import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import './ButtonSpacing.css'

const QStepFive = ({getHowOften, getFrHowOften, setSaved, setSaveStatus}) => {
  const [notAlways, setNotAlways] = useState()
  const [collapse, setCollapse] = useState(true)
  const [prescribed, setPrescribed] = useState("Never")
  const [other, setOther] = useState("Never")

  const [frPrescribed, setFrPrescribed] = useState()
  const [frOther, setFrOther] = useState()

  const GreenRadio = withStyles({
    root: {
      '&$checked': {
        color: '#10434F',
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  const checked = ev => {
    let buttonList = document.querySelectorAll(".StepFour-div div");
    buttonList.forEach(button => {
      button.style.backgroundColor = "";
    });
    ev.target.style.backgroundColor = "#10434F";
    let medVal = ev.target.getAttribute("value");
    switch (medVal) {
      case "Never":
      case "Sometimes":
      case "Half the time":
      case "Most times":
        setNotAlways(true)
        break;
      case "Not applicable":
      case "Always":
        setNotAlways(false)
        break;
      default:
        break;
    }

    setPrescribed(medVal)
    getHowOften(medVal, other)

    let frMedVal = ev.target.getAttribute("value");

    if (frMedVal == "Never") {
      frMedVal = "Jamais"
    } else if (frMedVal == "Sometimes") {
      frMedVal = "Parfois"
    } else if (frMedVal == "Half the time") {
      frMedVal = "La moitié du temps"
    } else if (frMedVal == "Most times") {
      frMedVal = "La plupart du temps"
    } else if (frMedVal == "Always") {
      frMedVal = "Toujours"
    } else {
      frMedVal = "Sans objet"
    }

    switch (frMedVal) {
      case "Jamais":
      case "Parfois":
      case "La moitié du temps":
      case "La plupart du temps":
        setNotAlways(true)
        break;
      case "Sans objet":
      case "Toujours":
        setNotAlways(false)
        break;
      default:
        break;
    }

    setFrPrescribed(frMedVal)
    getFrHowOften(frMedVal, frOther)

    setSaved(false)
    setSaveStatus('default')
  }

  const checkedTwo = ev => {
    let buttonList = document.querySelectorAll(".StepFour-div-other div");
    buttonList.forEach((button) => {
      if (button.style.backgroundColor) button.style.backgroundColor = ""
    });
    ev.target.style.backgroundColor = "#10434F";

    let medVal = ev.target.getAttribute("value")
    setOther(medVal)
    getHowOften(prescribed, medVal)

    let frMedVal = ev.target.getAttribute("value")
    
    if (frMedVal == "Never") {
      frMedVal = "Jamais"
    } else if (frMedVal == "Sometimes") {
      frMedVal = "Parfois"
    } else if (frMedVal == "Half the time") {
      frMedVal = "La moitié du temps"
    } else if (frMedVal == "Most times") {
      frMedVal = "La plupart du temps"
    } else if (frMedVal == "Always") {
      frMedVal = "Toujours"
    } else {
      frMedVal = "Sans objet"
    }

    setFrOther(frMedVal)
    getFrHowOften(frPrescribed, frMedVal)

    setSaved(false)
    setSaveStatus('default')
  }

  const getValues = async () => {
    let {data:{frequently}} = await getRequest(`/frequently/user`)
    if(frequently){
      setPrescribed(frequently.prescribed_meds)
      setFrPrescribed(frequently.fr_prescribed_meds)
      setOther(frequently.other_treatments)
      setFrOther(frequently.fr_other_treatments)
      highlightSelected(frequently.prescribed_meds, frequently.other_treatments)
    }
  }

  const highlightSelected = (pres, other) => {
    let prescribedBtns = document.querySelectorAll(".StepFour-div div")
    prescribedBtns.forEach(button => {
      if (button.getAttribute("value") === pres) {
        button.style.backgroundColor = "#10434F"
        if(pres !== "Not applicable" && pres !== 'Always') setNotAlways(true)
      }
    })

    let otherBtns = document.querySelectorAll(".StepFour-div-other div")
    otherBtns.forEach(button => {
      if (button.getAttribute("value") === other) {
        button.style.backgroundColor = "#10434F"
      }
    })
  }

  const handleCollapse = () => {
    setCollapse(!collapse)
    sessionStorage.setItem('howoften-collapse', !collapse)
  }

  useEffect(() => {
    getValues()
    if(sessionStorage.getItem('howoften-collapse')) {
      setCollapse(JSON.parse(sessionStorage.getItem('howoften-collapse')))
    }
  },[])

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  return(
    <React.Fragment>
      <div className="box-container-numbered collapsable">
        <div id="fifth" onClick={handleCollapse}>
          <h4 className="numbered-subheading">
            {lang === "English" ? 
            "5. How often do you use your treatments?" : 
            "5. À quelle fréquence utilisez-vous ces traitements?"}
            <span className="collapsed-icon">{collapse ? "▲" : lang === "English" ? "(Expand) ▼" : "(Développer) ▼"}</span>
          </h4>
        </div>
        <Collapse isOpen={collapse}>
          <div className="padding-class">
          <div className="Step-group-container">
            <h4 className="Step-subHeading">
              {lang === "English" ? 
              "How often are you taking your prescribed arthritis medication?" : 
              "À quelle fréquence utilisez-vous vos médicaments sous ordonnance contre l’arthrite?"}
            </h4>

            <div className="circle-group-container-Qstep5">

              {/* {console.log(prescribed == null)} */}

              <RadioGroup row aria-label="position" value={prescribed || ''}>

                <div className="circle-group-labels"> 
                  <h6>{lang === "English" ? "Never" : "Jamais"}</h6>
                  <GreenRadio value={"Never" || null} onClick={checked} style={GreenRadio.root}/>
                </div>
                
                <div className="circle-group-labels"> 
                  <h6>{lang === "English" ? "Sometimes" : "Parfois"}</h6>
                  <GreenRadio value="Sometimes" onClick={checked} style={GreenRadio.root}/>
                </div>
                
                <div className="circle-group-labels"> 
                  <h6>{lang === "English" ? "Half the time" : "La moitié du temps"}</h6>
                  <GreenRadio value="Half the time" onClick={checked} style={GreenRadio.root}/>
                </div>
                
                <div className="circle-group-labels"> 
                  <h6>{lang === "English" ? "Most times" : "La plupart du temps"}</h6>
                  <GreenRadio value="Most times" onClick={checked} style={GreenRadio.root}/>
                </div>
                
                <div className="circle-group-labels"> 
                  <h6>{lang === "English" ? "Always" : "Toujours"}</h6>
                  <GreenRadio value="Always" onClick={checked} style={GreenRadio.root}/>
                </div>
                
                <div className="circle-group-labels"> 
                  <h6>{lang === "English" ? "Not applicable" : "Sans objet"}</h6>
                  <GreenRadio value="Not applicable" onClick={checked} style={GreenRadio.root}/>
                </div>

              </RadioGroup>
            </div>
            
            {/* <div className="StepFour-div-group">
              <div className="StepFour-div">
                <label>{lang === "English" ? "Never" : "Jamais"}</label>
                  <div value="Never" value2="Jamais" onClick={checked}></div> 
              </div>
              <div className="StepFour-div">
                <label>{lang === "English" ? "Sometimes" : "Parfois"}</label>
                  <div value="Sometimes" value2="Parfois" onClick={checked}></div>
              </div>
              <div className="StepFour-div">
                <label>{lang === "English" ? "Half the time" : "La moitié du temps"}</label>
                  <div value="Half the time" value2="La moitié du temps" onClick={checked}></div>
              </div>
              <div className="StepFour-div">
                <label>{lang === "English" ? "Most times" : "La plupart du temps"}</label>
                  <div value="Most times" value2="La plupart du temps" onClick={checked}></div>
              </div>
              <div className="StepFour-div">
                <label>{lang === "English" ? "Always" : "Toujours"}</label>
                  <div value="Always" value2="Toujours" onClick={checked}></div>
              </div>
              <div className="StepFour-div">
                <label>{lang === "English" ? "Not applicable" : "Sans objet"}</label>
                  <div value="Not applicable" value2="Sans objet" onClick={checked}></div>
              </div>
            </div> */}

            {notAlways &&
            <React.Fragment>
              <div className="Notice text-center">
                <img src={warning} alt="warning icon"/>
                <h5>
                  {lang === "English" ? 
                  "If you aren't using your treatments as prescribed by your doctor, you may have more pain." : 
                  "Si vous n'utilisez pas vos traitements tels que prescrits par votre médecin, vous pourriez avoir plus de douleur."}
                </h5>
                <p>
                  {lang === "English" ? 
                  "Make sure to discuss any changes or concerns with your doctor to decide what is best." : 
                  "Assurez-vous de discuter de tout changement ou de toute préoccupation avec votre médecin pour décider de ce qui est le mieux."}
                </p>
                <div value="GotIt" id="GotIt-div">
                  <p value="GotIt" onClick={() => {setNotAlways(false)}} id="GotIt">{lang === "English" ? "Got it" : "J'ai compris"}</p>
                </div>
              </div>
            </React.Fragment> 
            }
          </div>

          <div className="StepFour-treatment-h4-div">
            <div className="Step-group-container">
              <h4 className="Step-subHeading">
                {lang === "English" ? 
                "When you have pain, how often do you use pain treatments?" : 
                "Lorsque vous avez de la douleur, à quelle fréquence utilisez-vous vos traitements contre la douleur?"}
              </h4>
              
              <div className="circle-group-container-Qstep5">

                {/* {console.log(other == null)} */}

                <RadioGroup row aria-label="position" value={other || ''}>

                  <div className="circle-group-labels"> 
                    <h6>{lang === "English" ? "Never" : "Jamais"}</h6>
                    <GreenRadio value={"Never" || null} onClick={checkedTwo} style={GreenRadio.root}/>
                  </div>
                  
                  <div className="circle-group-labels"> 
                    <h6>{lang === "English" ? "Sometimes" : "Parfois"}</h6>
                    <GreenRadio value="Sometimes" onClick={checkedTwo} style={GreenRadio.root}/>
                  </div>
                  
                  <div className="circle-group-labels"> 
                    <h6>{lang === "English" ? "Half the time" : "La moitié du temps"}</h6>
                    <GreenRadio value="Half the time" onClick={checkedTwo} style={GreenRadio.root}/>
                  </div>
                  
                  <div className="circle-group-labels"> 
                    <h6>{lang === "English" ? "Most times" : "La plupart du temps"}</h6>
                    <GreenRadio value="Most times" onClick={checkedTwo} style={GreenRadio.root}/>
                  </div>
                  
                  <div className="circle-group-labels"> 
                    <h6>{lang === "English" ? "Always" : "Toujours"}</h6>
                    <GreenRadio value="Always" onClick={checkedTwo} style={GreenRadio.root}/>
                  </div>
                  
                </RadioGroup>
              </div>
              
              {/* <div className="StepFour-div-group other">
                <div className="StepFour-div-other">
                  <label>{lang === "English" ? "Never" : "Jamais"}</label>
                  <div value="Never" value2="Jamais" onClick={checkedTwo}></div>
                </div>
                <div className="StepFour-div-other">
                  <label>{lang === "English" ? "Sometimes" : "Parfois"}</label>
                  <div value="Sometimes" value2="Parfois" onClick={checkedTwo}></div>
                </div>
                <div className="StepFour-div-other">
                  <label>{lang === "English" ? "Half the time" : "La moitié du temps"}</label>
                  <div value="Half the time" value2="La moitié du temps" onClick={checkedTwo}></div>
                </div>
                <div className="StepFour-div-other">
                  <label>{lang === "English" ? "Most times" : "La plupart du temps"}</label>
                  <div value="Most times" value2="La plupart du temps" onClick={checkedTwo}></div>
                </div>
                <div className="StepFour-div-other">
                  <label>{lang === "English" ? "Always" : "Toujours"}</label>
                  <div value="Always" value2="Toujours" onClick={checkedTwo}></div>
                </div>
              </div> */}

            </div>
          </div>
          </div>
        </Collapse>
      </div>
    </React.Fragment>
  )
}

export default QStepFive