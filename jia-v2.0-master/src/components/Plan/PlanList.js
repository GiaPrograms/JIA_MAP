/**
 * @file
 * Component for step 4 "Make your plan
 * Contains the "Choose the treatments in your plan" tab section
 * Fetches treatments in the user plan
 * @author <akel.ms93@gmail.com>
 */

import React, {useState, useEffect} from 'react';
import {Row} from "reactstrap";

import TreatmentCard from '../TreatmentCard'
import {getRequest} from "../../API/ApiHandler"

const PlanList = ({favs, treatments, plan, setPlan, setSaved, setSaveStatus}) => {
  const [favsList, setFavsList] = useState([])

  const getUserPlan = async () => {
    let data = await getRequest(`/userPlans/user`)
    if(data) {
      const ids = data.map(treatment => {return {id: treatment.id}})
      setPlan(ids)
    }
  }

  const handleFavourites = () => {
      let filteredList = []
      favs.forEach(fav => {
        treatments.forEach(treatment => {
          if (treatment.id === fav.id)  filteredList.push(treatment)
        })
      })
     setFavsList(filteredList)
  }
  
  useEffect(() => {
    getUserPlan()
  },[])

  useEffect(() => {
    if(treatments && favs) handleFavourites()
  },[treatments, favs])

  // Treatment card list
  const treatmentCards = favsList.length && 
  favsList.map(treatment => 
    <TreatmentCard
      key={treatment.id} 
      treatment={treatment}
      selected={plan}
      icon="checkbox"
      setPlan={setPlan}
      setSaved={setSaved}
      setSaveStatus={setSaveStatus}
    />
  )

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  return(
    <div className="box-container-numbered plan-container">
      <h4 className="numbered-subheading">{lang === "English" ? 
        "1. Choose the treatments in your plan" : 
        "1. Choisissez les traitements à inclure dans votre plan"}
      </h4>
      <div className="notice plan-top-notice">
        <h5>{lang === "English" ? 
          "Please review your favourites and choose the treatments you wish to try now or talk about with your health care team." : 
          "Veuillez consulter vos favoris et choisir les traitements que vous souhaitez essayer maintenant ou dont vous voulez parler avec votre équipe soignante."}
        </h5>
      </div>
      <div className="review-content">
        <Row className="padding-class">
          {favsList.length 
            ? treatmentCards
            : <h1>{lang === "English" ? "Your favourites list is empty" : "Votre liste de favoris est vide"}</h1>
          }
        </Row>
      </div>
      <div className="notice plan-bottom-notice">
        <h5>{lang === "English" ? 
          "You can go back to the “Review and Select” tab to add treatments." : 
          "Vous pouvez revenir à l’étape “Révision et sélection” pour ajouter des traitements."}
        </h5>
      </div>
    </div>
  )
}

export default PlanList
