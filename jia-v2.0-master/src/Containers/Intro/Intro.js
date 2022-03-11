import React, {useState} from 'react';
import {NavLink as RRNav} from 'react-router-dom';
import {Button} from 'reactstrap';
import Footer from "../../components/Footer";
import Header from "../../components/Home/Header";
import stepMobile from '../../img/stepsMobile.png';
import fr_stepMobile from '../../img/5Étapes2.png';
import steps from '../../img/steps.png';
import fr_steps from '../../img/5Étapes.png';


const Intro = props => {
  const [navTo, setNavTo] = useState('')

  const handleStepperNav = to => {
    props.history.push(to)
  }

  //Get value of language from local storage
  let lang = localStorage.getItem("language")
  
  return(
      
    <div className="wrapper intro">
      <div className="orangenext-btn-container">
        <div className="orangenext-btn-content">
            <Button className="next-btn" tag={RRNav} to="/questionnaire">{lang === "English" ? "Continue to Step 1" : "Passez à l'étape 1"}</Button>
        </div>
      </div>
      <div className='page-header'>
        <Header current={props} handleNav={handleStepperNav} setNavTo={setNavTo}/>
      </div>
      <div className="body-container">
        <picture className="steps-container">
          <source media="(max-width: 660px)" className="steps-img" srcSet={lang === "English" ? stepMobile : fr_stepMobile} alt="five-steps"/>
          <img media="(min-width: 661px)" className="steps-img text-center" srcSet={lang === "English" ? steps : fr_steps} alt="five-steps"/>
        </picture>

      </div>
      <div className="next-btn-container">
          <p>
            {lang === "English" ? 
            "Okay, let's start with the first step!" : 
            "D'accord, commençons par la première étape!"}
          </p>
          <Button className="next-btn" tag={RRNav} to="/questionnaire">{lang === "English" ? "Continue to Step 1" : "Passez à l'étape 1"}</Button>
      </div>
      <Footer/>
    </div>
  )
    
}

export default Intro 