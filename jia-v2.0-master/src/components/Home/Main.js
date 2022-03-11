import React from 'react';
import MainOption from './MainOption';
import mainOptions from '../../data/main-options.json'

import { NavLink as RRNav } from "react-router-dom";
import { Button } from "reactstrap";
import {Row} from "reactstrap";

//Get value of language from local storage
let lang = localStorage.getItem("language")

const Main = () => {
  return (
    <>
       
       <div className="orangenext-btn-container">
        <div className="orangenext-btn-content">
          <Button className="next-btn" tag={RRNav} to="/notice">
            {lang === "English" ? "Next" : "Suivant(e)"}
          </Button>
        </div>
      </div>

      {/* <div className="orangenext-btn-container">
        <div className="orangenext-btn-content">
          <Button className="next-btn" tag={RRNav} to="/intro">
            Next
          </Button>
        </div>
      </div> */}


      <div className="body-container">
        <div className="main-options">
          <h1>{lang === "English" ? "Why use the JIA Option Map?" : "Pourquoi utiliser le JIA OptionMap?"}</h1>
          <Row>
            {mainOptions.options &&
              mainOptions.options.map((option) => (
                <MainOption key={option.id} desc={option} keyId={option.id} />
              ))}
          </Row>
        </div>
      </div>
      <div className="next-btn-container">
        <div className="next-btn-content">
          <Button className="next-btn" tag={RRNav} to="/notice">
            {lang === "English" ? "Next" : "Suivant(e)"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Main
