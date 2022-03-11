/**
 * @file
 * Component for step 3 "Review & select treatment options"
 * Contains the "All Treatments" tab section and @see CategoryTreatments component
 * Fetches treatments classifications
 * @author <akel.ms93@gmail.com>
 */

import React, {useState, useEffect} from 'react';
import CategoryTreatments from './CategoryTreatments'
import {getRequest} from "../../API/ApiHandler"

const AllTreatments = ({favs, setFavs, treatments}) => {
  const [classifications, setClassifications] = useState([])

  const getClassifications = async() => {
    let data = await getRequest("/treatmentClassifications")
    if(data) setClassifications(data)
  }

  useEffect(() => {
    if(treatments && favs) getClassifications()
  },[treatments, favs])

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  const classificationsList = classifications.length &&
    classifications.map((classification) => (
      <CategoryTreatments
        key={classification.id}
        classification={classification}
        treatments={treatments}
        favs={favs}
        setFavs={setFavs}
      />
    ))

  return (
    <React.Fragment>
      <div className="notice">
        <h5>
          {lang === "English" ? 
          "Below is a list of the categories of treatments that can be used for pain. If any of the treatments appeal to you, you can save them to your favourites." : 
          "Voici des catégories regroupant différents traitements contre la douleur. Si l’un de ces traitements vous intéresse, enregistrez-le dans vos favoris."}  
        </h5>
      </div>
      <div className="review-content all-treatments-review">
        {classificationsList}
      </div>
      <div className="notice">
        <h5>
        {lang === "English" ? 
          "You can click the “My Favourites” tab to review your favourites" : 
          "Vous pouvez cliquer sur l’onglet “Mes favoris” pour consulter vos favoris."}
        </h5>
      </div>
    </React.Fragment>
  )
}
export default AllTreatments
