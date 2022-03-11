/**
 * @file
 * componenet for the first point in step 1 "Pain & treatments"
 * Get's and sets the slider value for the currently logged in user
 * @author <akel.ms93@gmail.com>
 */
import React, {useState, useEffect} from 'react'
import {Collapse} from 'reactstrap';
import {getRequest} from "../../API/ApiHandler"
import NavigationButton from '../UI/Buttons/NavigationButton';
import CircleControl from '../UI/Slider/CircleControl';
import SliderControl from '../UI/Slider/SliderControl';

const QstepOne = ({painLevel, setPainLevel, setSaved, setSaveStatus}) => {
  const [collapse, setCollapse] = useState(true)
  const [notAlways, setNotAlways] = useState()
  const [prescribed, setPrescribed] = useState()
  const [other, setOther] = useState()

  const getPainLevel = async () => {
    let data = await getRequest(`/painLevels/user`)
    if(data) {
      let {data:{level}} = data
      setPainLevel(level)
    } 
  }

  const setValue = (value) => {
    setPainLevel(value)
    setSaved(false)
    setSaveStatus('default')
  }

  const handleCollapse = () => {
    setCollapse(!collapse)
    sessionStorage.setItem('painlevel-collapse', !collapse)
  }

  useEffect(() => {
    getPainLevel()
    if(sessionStorage.getItem('painlevel-collapse')) {
      setCollapse(JSON.parse(sessionStorage.getItem('painlevel-collapse')))
    }
  }, [])

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  return (
    <div className="box-container-numbered collapsable">
      <div onClick={handleCollapse}>
        <h4 className="numbered-subheading">
          {lang === "English" ? 
            "1. In the past 7 days, how much pain on average did you have because of your arthritis?" : 
            "1. Au cours des sept derniers jours, quel niveau de douleur avez-vous ressenti en moyenne à cause de votre arthrite?"}
          <span className="collapsed-icon">{collapse ? "▲" : lang === "English" ? "(Expand) ▼" : "(Développer) ▼"}</span>
        </h4>
      </div>

      <Collapse isOpen={collapse}>
          
        <CircleControl 
          setValue={setValue} 
          minLabel={lang === "English" ? "No Pain" : "Aucune douleur"}
          maxLabel={lang === "English" ? "Very Severe Pain" : "Douleur très sévère "} 
          reversed={true}
          value={painLevel}
          forSlider="pain-level"
          noZero={true}>
        </CircleControl>

      </Collapse>
    </div>
  )
}

export default QstepOne