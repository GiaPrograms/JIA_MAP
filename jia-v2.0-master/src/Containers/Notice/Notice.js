import React, {useState, useEffect} from "react";
import Header from "../../components/Home/Header";
import Footer from "../../components/Footer";
import {NavLink as RRNav} from 'react-router-dom';
import {Button} from 'reactstrap';
import warning from '../../img/warning.png';
import './Notice.css'

const Notice = props => {
  const [didSelect, setDidSelect] = useState(false)

  useEffect(() => {
    if(sessionStorage.getItem('purpose')) setDidSelect(true)
  },[])

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  return (
    <div>
      <div className="home-page-header">
        <Header current={props} />
      </div>
      <div className="orangenext-btn-container">
        <div className="orangenext-btn-content">
            <Button className="next-btn" tag={RRNav} to="/intro">{lang === "English" ? "Next" : "Suivant(e)"}</Button>
        </div>
      </div>
      <div className="wrapper">
        <div className="notice-container">
          <h5>
            {lang === "English" ? 
              "You can use this app as often as you want!" : 
              "Vous pouvez utiliser cette application aussi souvent que vous le souhaitez!"}
          </h5>
          <h5>
            {lang === "English" ? 
              "You can change your answers and it will give you new ways to manage your pain!" : 
              "N’hésitez pas à changer vos réponses pour découvrir de nouvelles façons de prendre en charge votre douleur!"}
          </h5>
          <h5>
            {lang === "English" ? 
              "You can move through the steps in the app by clicking on the steps at the top." : 
              "Vous pouvez passer d’une étape à l’autre dans l’application en cliquant sur les onglets des étapes ci-dessus."}
          </h5>
          <h5>
            {lang === "English" ? 
              "For accurate results, please save your answers on each page." : 
              "Pour des résultats exacts, veuillez sauvegarder vos réponses sur chaque page."}
          </h5>

        </div>
        <div className="disclaimer">
            <img src={warning} alt="warning icon"/>
            <div>
              <p>
                {lang === "English" ? 
                "Keep taking your prescribed treatments so that your arthritis does not get worse." : 
                "Continuez à prendre vos traitements prescrits afin que votre arthrite ne s'aggrave pas."}
              </p>
            </div>
          </div>

        <div className="next-btn-container">
            <Button className="next-btn" tag={RRNav} to="/intro">{lang === "English" ? "Next" : "Suivant(e)"}</Button>
        </div>
      <Footer />
      </div>
    </div>
  );
};

export default Notice;
