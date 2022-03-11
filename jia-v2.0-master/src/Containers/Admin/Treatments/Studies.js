/**
 * @file
 * Container for the admin panel studies list.
 * Handles fetching of the studies list and sending the data to the @see Table component
 * @author <akel.ms93@gmail.com>
 */

import React, {useState, useEffect} from 'react'
import Navigation from '../../../components/Admin/Navigation'
import Table from '../../../components/Admin/Table'
import StudiesForm from '../../../components/Admin/Forms/Treatments/StudyForm'
import TopBar from '../../../components/Admin/TopBar'
import ExportCSV from '../../../components/UI/ExportCSV'
import {getRequest, postRequest, patchRequest, deleteRequest} from "../../../API/ApiHandler"
import SnackAlert from '../../../components/UI/Feedback/SnackAlert'

import '../AdminPanel.css'

const Studies = () => {
  const [studies, setStudies] = useState()
  const [treatments, setTreatments] = useState([])
  const [openForm, setOpenForm] = useState(false)
  const [formMode, setFormMode] = useState()
  const [selectedId, setSelectedId] = useState()
  const [values, setValues] = useState()

  // Snackbar
  const [snackDisplay, setSnackDisplay] = useState(false)
  const [snackType, setSnackType] = useState()
  const [snackMessage, setSnackMessage] = useState()

  const getStudies = async() => {
    let response = await getRequest("/studies")
    if(response) {
      let {data} = response
      let studies = data.map(study => {
        return {
          id: study.id,
          treatment: study.treatment.name,
          name: study.name,
          rating: study.rating,
          is_safe: study.is_safe,
          does_work: study.does_work,
          believe_research: study.believe_research,
          methods: study.methods,
          treatments: study.treatments,
          treatment_results: study.treatment_results,
          reference: study.reference,
          pubMed: study.pubMed,
          treatment_id: study.treatment_id,
          results: study.results
        }
      })
      setStudies(studies)
    }
  }

  const getTreatmentsList = async () => {
    let data = await getRequest("/treatments")
    if(data){
      let updatedList = data.map(treatment => {
        return {
          id: treatment.id,
          name: treatment.name,
        }
      })
      // sort by name
      updatedList.sort(function(a, b) {
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

      setTreatments(updatedList)
    }
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
  const handleSubmitForm = async (formData, results) => {
    let response
    formMode === 'Add'
      ? response = await postRequest("/studies", formData)
      : response = await patchRequest(`/studies/${selectedId}`, formData)

    if(response) {
      await handleResults(results, response.data.id)
      setOpenForm(false)
      handleSnackbar('success', 'Submitted')
      getStudies()
    } else {
      handleSnackbar('error', 'Failed to submit')
    }
  }

  const handleResults = async(results, id) => {
    let updatedResults = await results.map(result => {
      result.study_id = id
      return result
    })
    if(updatedResults.length) {
      formMode === 'Add'
        ? await postRequest("/results/add/multiple", updatedResults)
        : await patchRequest("/results/update/multiple", updatedResults)
    } else {
      let input = {study_id: id}
      deleteRequest("/results/delete/multiple", input)
    }
  }

  const deleteStudy = async(id) => {
    let response = await deleteRequest(`/studies/${id}`)
    if(response) {
      handleSnackbar('success', 'Record deleted')
      let input = {study_id: null}
      await deleteRequest("/results/delete/multiple", input)
      getStudies()
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
    getStudies()
    getTreatmentsList()
  },[])

  return(
    <>
      <div className="admin-container">
        <Navigation/>
        <div className="admin-body">
          <TopBar />
          <div className="title-container">
            <h1>Research data</h1>
            <ExportCSV data={studies} title={"Researches"}/>
          </div>
          <Table 
            data = {studies}
            title = {{table:"Research data", action:"research"}}
            deleteRecord = {deleteStudy}
            handleOpenForm={handleOpenForm}
          />
          <StudiesForm 
            open={openForm}
            setOpenForm={setOpenForm} 
            handleSubmitForm={handleSubmitForm}
            mode={formMode}
            values={values}
            treatments={treatments}
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

export default Studies