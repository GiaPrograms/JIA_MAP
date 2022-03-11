import React, {useState, useEffect} from 'react';
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import {Collapse} from 'reactstrap';

import Classification from './Classification';
import TreatmentsClassification from './TreatmentsClassification'
import {getRequest} from "../../API/ApiHandler"

const theme = createMuiTheme({
  palette: {primary: {main: '#10434F'},
  },
});

const QstepFour = ({selectedMeds, setSelectedMeds, selectedTreatments, setSelectedTreatments, treatmentText, setTreatmentText, setSaved, setSaveStatus}) => {
  const [classifications, setClassifications] = useState([])
  const [treatmentClass, setTreatmentClasses] = useState([])
  const [collapse, setCollapse] = useState(true)

  const getClassifications = async() => {
    let {data} = await getRequest("/classifications")
    setClassifications(data)
  }

  const getSelectedMeds = async() => {
    let meds = await getRequest(`/userMedications/user`)
    if(meds) {
      let {data} = meds
      setSelectedMeds(data)      
    } 
  }

  const getTreatmentClassifications = async () => {
    let data = await getRequest("/treatmentClassifications")
    if(data) setTreatmentClasses(data)
  }

  const getSelectedTreatments = async () => {
    let treatments = await getRequest(`/userTreatments/user`)
    if(treatments) {
      let {data} = treatments
      setSelectedTreatments(data)      
    } 
  }

  const getTreatmentText = async() => {
    let text = await getRequest(`/treatmentText/user`)
    if(text) setTreatmentText(text.text)      
  }

  const handleTextChange = ev => {
    const text = ev.target.value;
    setTreatmentText(text)
    setSaved(false)
    setSaveStatus('default')
  }

  const handleCollapse = () => {
    setCollapse(!collapse)
    sessionStorage.setItem('other-collapse', !collapse)
  }

  useEffect(() => {
    getClassifications()
    getSelectedMeds()
    getTreatmentClassifications()
    getSelectedTreatments()
    getTreatmentText()
    if(sessionStorage.getItem('other-collapse')) {
      setCollapse(JSON.parse(sessionStorage.getItem('other-collapse')))
    }
  },[])

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  // Filter the list of classifications to ones belonging to the presrcibed section
  // Create a container for the classification
  const classificationsList = classifications.length && classifications.filter(classification => {
    if(classification.section === "other") return true
    return false
  }).map(classification => 
    <Classification 
      key = {classification.id} 
      id = {classification.id} 
      classification ={lang === "English" ? classification.name : classification.fr_name}
      selectedMeds = {selectedMeds}
      setSelectedMeds = {setSelectedMeds}
      setSaved={setSaved}
      setSaveStatus={setSaveStatus}
    />
  )

  const treatmentClassList  = treatmentClass.length && treatmentClass.map(classification => 
    <TreatmentsClassification 
      key = {classification.id} 
      id = {classification.id} 
      classification ={lang === "English" ? classification.name : classification.fr_name}
      selectedTreatments = {selectedTreatments}
      setSelectedTreatments = {setSelectedTreatments}
      setSaved={setSaved}
      setSaveStatus={setSaveStatus}
    />
  )

    return (
        <React.Fragment>
          <div className="pain-div box-container-numbered collapsable">
          <div onClick={handleCollapse}>
             <h4 className="numbered-subheading">
             {lang === "English" ? 
              "4. What other treatments are you using when you have arthritis pain?" : 
              "4. Quels autres traitements suivez-vous lorsque vous avez des douleurs arthritiques?"}
             <span className="collapsed-icon">{collapse ? "▲" : lang === "English" ? "(Expand) ▼" : "(Développer) ▼"}</span>
             </h4>
           </div>

            <Collapse isOpen={collapse}>
              <div className="padding-class">
              
                <p className="StepThree-desc">
                  {lang === "English" ? 
                  "These are over the counter medications and other treatments you use when you have pain. Select all the treatments you are using." : 
                  "Il s’agit de médicaments en vente libre et d’autres traitements que vous utilisez lorsque vous avez de la douleur. Sélectionnez tous les traitements que vous utilisez."}
                </p>
                {/* <h3 className="StepThree-h3">{lang === "English" ? "A. Medications" : "A. Médicaments"}</h3>
                {classificationsList} */}
               
                <div className="StepThree">
                  {/* <h3 className="StepThree-h3">{lang === "English" ? "B. Other treatments" : "B. Autres traitements"}</h3> */}
                  {treatmentClassList}
                </div> 
                <ThemeProvider theme={theme}>
                  <TextField
                    onChange={handleTextChange}
                    className="text-field"
                    label={lang === "English" ? "Others" : "Autres"}
                    placeholder={lang === "English" ? "Other medications and treatments you are using..." : "D'autres médicaments et traitements que vous utilisez ..."}
                    variant="outlined"
                    fullWidth
                    multiline
                    value={treatmentText}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    rows="6"
                    id="other-treatments-text"
                  />
                </ThemeProvider>
              </div>
            </Collapse>
          </div>
        </React.Fragment>
    )
}

export default QstepFour;
