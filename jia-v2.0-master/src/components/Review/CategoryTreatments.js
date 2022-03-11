import React, {useState, useEffect} from 'react'
import {Collapse, Row} from 'reactstrap';

import TreatmentCard from '../TreatmentCard'

const CategoryTreatments = ({classification, favs, setFavs, treatments}) => {
  const [classTreatments, setClassTreatments] = useState([])
  const [isCollapsed, setIsCollapsed] = useState(true)

  useEffect(() => {
    setClassTreatments(treatments.filter(treatment => treatment.treatmentClassificationId === classification.id))
    if(sessionStorage.getItem(`${classification.name}-collapse`)) {
      setIsCollapsed(JSON.parse(sessionStorage.getItem(`${classification.name}-collapse`)))
    }
  },[])

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed)
    sessionStorage.setItem(`${classification.name}-collapse`, !isCollapsed)
  }

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  // Treatment card list
  const treatmentCards = classTreatments && 
  classTreatments.map(treatment => 
    <TreatmentCard
      key={treatment.id} 
      treatment={treatment}
      selected={favs}
      setSelected={setFavs}
      icon="fav"
    />
  )

  return (
    <div className="box-container-numbered">
      <div className="AllTreatments_treatment_div" onClick={handleCollapse}>
        <p>{lang === "English" ? classification.name : classification.fr_name}</p>
        <span className="collapsed-icon">{isCollapsed ? "+" : "-"}</span>
      </div>
      <Collapse isOpen={!isCollapsed} style={{marginBottom: '2rem'}}>
        <Row className="padding-class">
          {treatmentCards}
        </Row>
      </Collapse>
    </div>
    )
  }

export default CategoryTreatments