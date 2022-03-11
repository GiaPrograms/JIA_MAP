import React, {useState, useEffect} from 'react'
import Happyface from '../UI/Happyface';
import Star from '../UI/Star';

import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {withStyles} from '@material-ui/core/styles';
import {getRequest} from "../../API/ApiHandler"

const StudyDetails = ({study}) => {
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)
  const [mapHappyFace] = useState([...Array(100).keys()])
  
  // const stars = [1, 2, 3, 4, 5]

  const getResults = async () => {
    let data = await getRequest(`/results/${study.id}`)
    if(data) setResults(data)
  }

  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.text.secondary,
      color: 'rgba(255, 255, 255, 1)',
      boxShadow: theme.shadows[3],
      fontSize: 20,
    },
  }))(Tooltip);

  useEffect(() => {
    getResults()
  },[])

  const toggle = () => setOpen(!open);

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  return (
    <div className="study-container">
      {study &&
      <React.Fragment>

        <h5 id="experts_suggest">{lang === "English" ? "Does it work?" : "Est-ce que ça marche?"}</h5>
        <p>{lang === "English" ? study.does_work : study.fr_does_work}</p>
        <div className="study_happyFace_container">
          {results && results.map((result, i) => (
              <div key={i} className="study_happyFace_div">
                <h3>{lang === "English" ? result.name : result.fr_name}</h3>
                <div className="study_happyFace_image_container">
                  {mapHappyFace.map((happyFace, i) => (
                      <Happyface key={i} happyFaceColor={i <= (result.score - 1) ? 'yellow' : 'none'}
                                  score={result.score}/>
                  ))
                  }
                </div>
                <div className="happyFace-score-container">
                  <p>
                    <strong>{lang === "English" ? result.statistics : result.fr_statistics}</strong>
                  </p>
                </div>
              </div>
          ))
          }
        </div>
        <h5 id="experts_suggest">{lang === "English" ? "Is it safe?" : "Est-ce sûr?"}</h5>
        <p>{lang === "English" ? study.is_safe : study.fr_is_safe}</p>
        <div className="startContainer-full">
          <div className="startContainer-half">
            <h5 id="experts_suggest">{lang === "English" ? "Should I believe this research?" : "Dois-je croire cette recherche?"}</h5>
            <p>{lang === "English" ? study.believe_research : study.fr_believe_research}</p>
            <div className="starContainer">
              {/* {stars.map((number, i) => (
                <Star 
                  key={i}
                  starShape={i <= study.rating - 1 ? 'filled' : 'empty'}
                  starColor={i <= study.rating - 1 ? '#FFCE07' : 'none'}
                  starStroke={i <= study.rating - 1 ? '5px' : '5px'}
                />
              ))} */}
            </div>
          </div>

          {results.statistics && <div className="starMessage-Container">{results.statistics}</div>}
        </div>

        <div className="icon-containerstudy">
          
          <LightTooltip title={lang === "English" ? "Click for More Info on the Study" : "Cliquez pour plus d'informations sur l'étude"} placement="right" arrow>
            <InfoIcon className="material-icons info-icon" onClick={toggle}>
              info
            </InfoIcon>
          </LightTooltip>
          
          <Modal isOpen={open} toggle={toggle}>
            <ModalHeader toggle={toggle}>{lang === "English" ? "Study Details" : "Détails de l'étude"}</ModalHeader>
            <ModalBody>
              <h3>{lang === "English" ? "Methods" : "Méthodes"}</h3>
              <p>{lang === "English" ? study.methods : study.fr_methods}</p>
              <h3>{lang === "English" ? "Treatments" : "Traitements"}</h3>
              <p>{lang === "English" ? study.treatments : study.fr_treatments}</p>
              <h3>{lang === "English" ? "Results" : "Résultats"}</h3>
              <p>{lang === "English" ? study.treatment_results : study.fr_treatment_results}</p>
              <h3>{lang === "English" ? "Reference" : "Référence"}</h3>
              <p>{study.reference}</p>
              <h3>{lang === "English" ? "PubMed Link" : "Lien PubMed"}</h3>
              <a href={study.pubMed} target="_blank" rel="noopener noreferrer">{study.pubMed}</a>
            </ModalBody>
            <ModalFooter>
              <Button className="next-btn" onClick={toggle}>{lang === "English" ? "Close" : "Fermer"}</Button>
            </ModalFooter>
          </Modal>
        </div>

      </React.Fragment>
      }
    </div>
  )
}

export default StudyDetails 