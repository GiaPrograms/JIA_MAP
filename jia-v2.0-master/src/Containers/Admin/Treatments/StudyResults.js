/**
 * @file
 * Container for the admin panel study results.
 * Handles fetching of the study results and sending the data to the @see Table component
 * @author <akel.ms93@gmail.com>
 */

import React, {useState, useEffect} from 'react'
import Navigation from '../../../components/Admin/Navigation'
import Table from '../../../components/Admin/Table'
import StudyResultsForm from '../../../components/Admin/Forms/Treatments/StudyResultsForm'
import TopBar from '../../../components/Admin/TopBar'
import ExportCSV from '../../../components/UI/ExportCSV'
import {getRequest, postRequest, patchRequest, deleteRequest} from "../../../API/ApiHandler"
import SnackAlert from '../../../components/UI/Feedback/SnackAlert'

import '../AdminPanel.css'

const StudyResults = () => {
  const [studyResults, setStudyResults] = useState()
  const [studies, setStudies] = useState([])
  const [openForm, setOpenForm] = useState(false)
  const [formMode, setFormMode] = useState()
  const [selectedId, setSelectedId] = useState()
  const [values, setValues] = useState()

    // Snackbar
    const [snackDisplay, setSnackDisplay] = useState(false)
    const [snackType, setSnackType] = useState()
    const [snackMessage, setSnackMessage] = useState()

  const getStudyResults = async() => {
    let response = await getRequest("/results")
    if(response) {
      let {data} = response
      let results = data.map(result => {
        return {
          id: result.id,
          name: result.name,
          study: result.study.name,
          score: result.score,
          statistics: result.statistics,
          study_id: result.study_id,
        }
      })
      setStudyResults(results)
    }
  }

  const getStudies = async() => {
    let {data} = await getRequest("/studies")
    let studies = data.filter(study => {
      if(study.name){
        return {
          id: study.id,
          name: study.name,
        }
      }
      return null
    })
     // sort by name
     studies.sort(function(a, b) {
      let nameA = a.name.toUpperCase()
      let nameB = b.name.toUpperCase()
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
    })
    setStudies(studies)
  }

  /**
   * @param {string} state Form mode, is Add or Edit
   * @param {*} data data returned from the table
   */
  const handleOpenForm = (mode, data = "") => {
    setFormMode(mode) // Set state of the form mode
    const {id, tableData, ...values} = data // Destructure the data returned from the table
    setSelectedId(id) // store id of the currently selected item to handle edit
    setValues(values) // get the values of the selected item to prepopulate the form when in edit mode
    setOpenForm(true) // Set dialog open state to true
  }

  /**
   * Handles form submission request POST and PATCH based on the form mode
   * @param {*} formData form field values
   */
  const handleSubmitForm = async(formData) => {
    let response
    formMode === 'Add'
      ? response = await postRequest("/results", formData)
      : response = await patchRequest(`/results/${selectedId}`, formData)

    if(response) {
      setOpenForm(false)
      handleSnackbar('success', 'Submitted')
      getStudyResults()
    } else {
      handleSnackbar('error', 'Failed to submit')
    }
  }

  const deleteStudyResult = async(id) => {
    let response = await deleteRequest(`/results/${id}`)
    if(response) {
      handleSnackbar('success', 'Record deleted')
      getStudyResults()
    } else {
      handleSnackbar('error', 'Failed to delete')
    }
  }

  const handleSnackbar = (type, message) => {
    setSnackType(type)
    setSnackMessage(message)
    setSnackDisplay(true)
}

  useEffect(() => {
    getStudyResults()
    getStudies()
  },[])

  return(
    <>
      <div className="admin-container">
        <Navigation/>
        <div className="admin-body">
          <TopBar />
          <div className="title-container">
            <h1>Results</h1>
            <ExportCSV data={studyResults} title={"Study-results"}/>
          </div>
          <Table 
            data = {studyResults}
            title = {{table:"Study Results", action:"result"}}
            deleteRecord = {deleteStudyResult}
            handleOpenForm={handleOpenForm}
          />
          <StudyResultsForm 
            open={openForm}
            setOpenForm={setOpenForm} 
            handleSubmitForm={handleSubmitForm}
            mode={formMode}
            values={values}
            studies={studies}
          />
        </div>
      </div>
      <SnackAlert 
        type={snackType} 
        message={snackMessage} 
        isOpen={snackDisplay} 
        setIsOpen={setSnackDisplay}
      />
    </>
  )
}

export default StudyResults