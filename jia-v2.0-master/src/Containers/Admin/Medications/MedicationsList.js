/**
 * @file
 * Container for the admin panel medication classifications.
 * Handles fetching of the medication classifications list and sending the data to the @see Table component
 * @author <akel.ms93@gmail.com>
 */

import React, {useState, useEffect} from 'react'
import Navigation from '../../../components/Admin/Navigation'
import Table from '../../../components/Admin/Table'
import MedicationForm from '../../../components/Admin/Forms/Medications/MedicationForm'
import TopBar from '../../../components/Admin/TopBar'
import ExportCSV from '../../../components/UI/ExportCSV'
import {getRequest, postRequest, patchRequest, deleteRequest} from "../../../API/ApiHandler"
import SnackAlert from '../../../components/UI/Feedback/SnackAlert'

import '../AdminPanel.css'

const MedicationsList = () => {
  const [medications, setMedications] = useState([])
  const [classifications, setClassifications] = useState()
  const [openForm, setOpenForm] = useState(false)
  const [formMode, setFormMode] = useState()
  const [selectedId, setSelectedId] = useState()
  const [values, setValues] = useState()

  // Snackbar
  const [snackDisplay, setSnackDisplay] = useState(false)
  const [snackType, setSnackType] = useState()
  const [snackMessage, setSnackMessage] = useState()

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  const getMedicationsList = async () => {
    let response = await getRequest("/medications")
    if(response) {
      let {data} = response
      let updatedList = data.map(medication => {
        return {
          id: medication.id,
          name: lang === "English" ? medication.name : medication.fr_name,
          classification: lang === "English" ? medication.classification.name : medication.classification.fr_name,
        }
      })
      setMedications(updatedList)
    }
  }

  const getClassificationsList = async () => {
    let {data} = await getRequest("/classifications")
    let classList = data.map(classification => {
      return {
        id: classification.id,
        name: lang === "English" ? classification.name : classification.fr_name,
        section: classification.section
      }
    })
    classList.sort(function(a, b) {
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
    setClassifications(classList)
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
  const handleSubmitForm = async (formData) => {
    let response
    formMode === 'Add'
      ? response = await postRequest("/medications", formData)
      : response = await patchRequest(`/medications/${selectedId}`, formData)

    if(response) {
      setOpenForm(false)
      handleSnackbar('success', 'Submitted')
      getMedicationsList()
    } else {
      handleSnackbar('error', 'Failed to submit')
    }
  }

  const deleteMedication = async(id) => {
    let response = await deleteRequest(`/medications/${id}`)
    if(response) {
      handleSnackbar('success', 'Record deleted')
      getMedicationsList()
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
    getMedicationsList()
    getClassificationsList()
  },[])

  return(
    <>
      <div className="admin-container">
        <Navigation/>
        <div className="admin-body">
          <TopBar />
          <div className="title-container">
            <h1>Medications</h1>
            <ExportCSV data={medications} title={"Medications"}/>
          </div>
          <Table 
            data = {medications}
            title = {{table:"Medications", action:"medication"}}
            deleteRecord = {deleteMedication}
            handleOpenForm={handleOpenForm}
          />
          <MedicationForm 
            open={openForm}
            setOpenForm={setOpenForm} 
            handleSubmitForm={handleSubmitForm}
            mode={formMode}
            values={values}
            classifications={classifications}
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

export default MedicationsList