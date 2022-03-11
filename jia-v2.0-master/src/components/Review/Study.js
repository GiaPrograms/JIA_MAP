import React, {useState} from 'react'
import {Collapse} from 'reactstrap';
import StudyDetails from './StudyDetails';

const Study = ({study, studyNo}) => {
  const [collapse, setCollapse] = useState(false)

  //Get value of language from local storage
  let lang = localStorage.getItem("language")
  
  return (
    <React.Fragment>
      {study.name
      ? <div id={`study_${studyNo}`} className="box-container-numbered">
          <div id={`study_${studyNo}`} onClick={() => setCollapse(!collapse)}>
            <h4 className="numbered-subheading">{lang === "English" ? "Study" : "Étude"} {studyNo}: {lang === "English" ? study.name : study.fr_name}
              <span className="collapsed-icon">{collapse ? "▲" : lang === "English" ? "(Expand) ▼" : "(Développer) ▼"}</span>
            </h4>
          </div>
          <Collapse isOpen={collapse} style={{marginBottom: '2rem'}}>
            <StudyDetails 
              study={study} 
              onClick={() => setCollapse(!collapse)}
            />
          </Collapse>
        </div>
      : <>
          <div className='research-subheadings'>
            <h4>{lang === "English" ? "Does it work?" : "Est-ce que ça marche?"}</h4>
            <p>{lang === "English" ? study.does_work : study.fr_does_work}</p>
            <h4>{lang === "English" ? "Is it safe?" : "Est-ce sûr?"}</h4>
            <p>{lang === "English" ? study.is_safe : study.fr_is_safe}</p>
          </div>
        </>
     
      }
    </React.Fragment>
  )
}

export default Study 