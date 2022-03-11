import React from 'react'
import {Button} from "reactstrap";

const NavigationButton = ({title, btnText, handleNavigation}) => {
  return(
    <div className="next-btn-container">
      <p>{title}</p>
      <Button className="next-btn" onClick={handleNavigation}>{btnText}</Button>
    </div>
  )
}

export default NavigationButton