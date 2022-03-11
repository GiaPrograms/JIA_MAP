/**
 * @file
 * Controls the sliders on the web app. It sets
 * their current, min and max values and text labels
 * @author <akel.ms93@gmail.com>
 */

import React, { useState, useEffect } from 'react'
import {withStyles} from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

const PrettoSlider = withStyles({
  root: { //the whole box
    color: '#52af77',
    height: 20,
    maxWidth: 700,
    padding: '2rem 0 5rem 0',
    margin: '1rem'
  },
  thumb: {//the circle of selection
    height: 34,
    width: 34,
    backgroundColor: '#10434F',
    //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: '#408CA0',
    },
  },
  active: {},
  valueLabel: {
    fontSize: '1.25rem',
    left: 'calc(-50% + 1rem)',
    top: 'calc(100% + 1.5rem)', //the number for selection

    '& *': {
      background: 'transparent',
      //background: 'linear-gradient(to right,green,orange,yellow,red)',
      color: '#000',
    },
  },
  track: {
    background: 'none',
    //background: 'linear-gradient(to right,green,orange,yellow,red)',
    height: 20,
    borderRadius: 6,
  },
  rail: {
    height: 20,
    borderRadius: 8,
    background: 'linear-gradient(to right,green,orange,yellow,red)',
    opacity: 1,
  },
})(Slider);

const SliderControl = props => {
  const [value, setValue] = useState(5) // Starting value on slider
  const max = 10 // Max value on slider
  const min = 0 // Min value on slider
  const step = 0.5 // Step change on slider

  const [sliderColour, setSliderColour] = useState()
  const [leftColour, setLeftColour] = useState()
  //added here
  //const[mid1Colour, setMid1Colour] = useState() 
  //const[mid2Colour, setMid2Colour] = useState()
  const [rightColour, setRightColour] = useState()

  /**
   * Handle change on the slider value
   * @param value current set value on the slider
   */
  const handleChange = (ev, value) => {
    setValue(value)
    if(props.setValue !== "disabled") props.setValue(value, props.sliderId, props.forSlider)
  }

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  useEffect(() => {
    if(props.reversed === true) { //page1  ---> 1,2
      setSliderColour('reversed')
      setLeftColour('#4DAA33')
      setRightColour('#B10921')
      /*setSliderColour('reversed')
      setLeftColour('green')
      setMid1Colour('orange')
      setMid2Colour('yellow')
      setRightColour('red')*/
    } else {                  //page 2,4 ---->4
      //setSliderColour('normal')
      setLeftColour('#4DAA33')
      setRightColour('#B10921')
      /*setSliderColour('normal')
      setLeftColour('red')
      setMid2Colour('yellow')
      setMid1Colour('orange')
      setRightColour('green')*/
    }
   
  }, [props.reversed])

  return (
    <div className="slider-div">
      <p style={{color: leftColour}}>{props.minLabel}</p>
        <PrettoSlider 
          className={sliderColour} /*<---dont need this*/
          valueLabelDisplay="on" /*prob just a slider thing, dont need */
          onChange={handleChange}
          min={min}  /*min,max,step dont need*/
          max={max}
          step={step} 
          value={value}
        />
      <p style={{color: rightColour}}>{props.maxLabel}</p>
    </div>
  )
}

export default SliderControl;
