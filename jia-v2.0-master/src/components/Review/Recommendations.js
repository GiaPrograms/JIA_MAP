import React, {useState, useEffect} from 'react';
import {Row} from "reactstrap";

import TreatmentCard from '../TreatmentCard'
import {handleRecommendations} from "../../components/GenerateRecommendations"
import {getRequest} from "../../API/ApiHandler"
import warning from '../../img/warning.png';
import FavouriteIcon from '../UI/Icons/FavouriteIcon'

const Recommendations = ({favs, setFavs}) => {
  const [topThreeSC, setTopThreeSC] = useState()
  const [topThreeHCP, setTopThreeHCP] = useState()
  const [favourites, setFavourites] = useState()

  const getUserSC = async() => {
    let data = await getRequest(`/userScs/user`)
    if(data.length) {
      setTopThreeSC(data)
    } else {
      await handleRecommendations()
      getUserSC()
    }
  }

  const getUserHCP = async() => {
    let data = await getRequest(`/userHcps/user`)
    if(data.length) {
      setTopThreeHCP(data)
    } else {
      await handleRecommendations()
      getUserHCP()
    }
  }

  useEffect(() => {
    getUserSC()
    getUserHCP()
  },[])

  useEffect(() => {
    if(favs) setFavourites(favs)
  },[favs])

  const topThreeSCList = topThreeSC && 
    topThreeSC.map(treatment => 
      <TreatmentCard
        key={treatment.id} 
        treatment={treatment}
        selected={favs}
        setSelected={setFavs}
        icon="fav"
      />
    )

  const topThreeHCPList = topThreeHCP && 
    topThreeHCP.map(treatment => 
      <TreatmentCard
        key={treatment.id} 
        treatment={treatment}
        selected={favourites}
        setSelected={setFavs}
        icon="fav"
      />
    )

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  const outline = {fill: '#FFFFFF', stroke: 'rgba(0, 0, 0, 1)', strokeMiterlimit: 10, strokeWidth: '8px'}

  return (
    <React.Fragment>
      <div className="notice">
        <h5>
          {lang === "English" ? 
          "Below is a list of treatments you may like to try now or talk about with your health care team." : 
          "Voici une liste de traitements que vous pourriez essayer dès maintenant ou dont vous pourriez parler avec votre équipe soignante."}
        </h5>
        <h5>
          {lang === "English" ? 
          "These depend on where you have pain, the types of treatments you prefer and what the scientific studies have shown." : 
          "Ceux-ci dépendent de l’endroit où vous ressentez de la douleur, des types de traitements que vous préférez et de ce que les études scientifiques ont démontré."}
        </h5>
        <h5>
          {lang === "English" ? 
          "Review the suggested treatments and click on “Read more” if you want information on each treatment. Save those you prefer to your favourites by clicking on the " : 
          "Passez-les en revue et sélectionnez sur “Lire la suite” si vous voulez de l’information sur chaque traitement ». Enregistrez ceux que vous préférez dans vos favoris en cliquant sur le "}
          <svg viewBox="0 0 120 130" style={{width: '2.5rem', height: '2.5rem'}}>
            <path 
              style={outline} 
              d="M50.1,22.64c1.33-1.82,2.5-3.43,3.67-5.04c7.26-10.92,21.99-13.89,32.91-6.63c2.95,1.96,5.42,4.55,7.23,7.59c7.85,12.16,6.66,28.06-2.9,38.93c-7.39,8.27-15.41,15.96-23.98,23c-5.02,4.23-10.2,8.29-15.28,12.45c-0.8,0.89-2.17,0.97-3.06,0.17c-0.01-0.01-0.03-0.02-0.04-0.04C35.32,83.01,22.81,71.9,11.26,59.84c-4.74-4.78-8.05-10.8-9.54-17.37c-2.67-12.39,2.55-25.15,13.12-32.13c10.64-6.35,24.39-3.32,31.37,6.92C47.47,18.95,48.69,20.69,50.1,22.64z"
            />
          </svg>
          {"."}
        </h5>
      </div>
      <div className="review-content">
        {/*****************
         SC TREATMENTS
          ******************/}
        <div className="title-padding">
          <h4>{lang === "English" ? "Treatments you could try now" : "Traitements que vous pourriez essayer dès maintenant."}</h4>
        </div>
        <Row className="card-row">
          {topThreeSCList}
        </Row>
      </div>
      {/*****************
       HCP TREATMENTS
        ******************/}
      <div className="review-content">
        <div className="title-padding">
          <h4>{lang === "English" ? 
              "Treatments you could talk about with your health care team before trying" : 
              "Traitements dont vous pourriez parler avec votre équipe soignante avant de les essayer"}
          </h4>
        </div>
        <Row className="card-row">
          {topThreeHCPList}
        </Row>
      </div>
      <div className="notice review-description-div">
        <div className="disclaimer">
          <img src={warning} alt="warning"/>
          <div>
            <p>
              {lang === "English" ? 
              "Please consider the benefits, risks and how easy it is to use the treatments before making a selection. You can also discuss it with your health care team." : 
              "N’oubliez pas de considérer les avantages, les risques et la facilité d’utilisation de ces traitements avant de faire un choix. Vous pouvez également en discuter avec votre équipe soignante."}
            </p>
            <p>
              {lang === "English" ? 
              "Keep taking your prescribed treatments so that your arthritis does not get worse." : 
              "Pour éviter que votre arthrite s’aggrave, continuez à suivre les traitements qui vous ont été prescrits."}
            </p>
          </div>
        </div>
      </div>
      <div className="notice">
        <h5>
          {lang === "English" ? 
          "You can click on the “All Treatments” tab to see all treatments, or click on the “My Favourites” tab to review your favourites. You can also go back to Step 2 to change your answers and see new treatments." : 
          "Pour voir l’ensemble des traitements, cliquez sur l’onglet “Tous les traitements”. Pour consulter vos favoris, cliquez sur l’onglet “Mes favoris”. Vous pouvez aussi retourner à l’étape 2 pour changer vos réponses et voir de nouveaux traitements."}
        </h5>
      </div>
    </React.Fragment>
  )
}

export default Recommendations