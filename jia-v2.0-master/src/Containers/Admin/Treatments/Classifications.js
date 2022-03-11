/**
 * @file
 * Container for the admin panel treatments classifications list.
 * Handles fetching of the classifications list and sending the data to the @see Table component
 * @author <akel.ms93@gmail.com>
 */

import React, {useState, useEffect} from 'react'
import Navigation from '../../../components/Admin/Navigation'
import Table from '../../../components/Admin/Table'
import ClassificationForm from '../../../components/Admin/Forms/Treatments/ClassificationForm'
import TopBar from '../../../components/Admin/TopBar'
import ExportCSV from '../../../components/UI/ExportCSV'
import {getRequest, postRequest, patchRequest, deleteRequest} from "../../../API/ApiHandler"
import SnackAlert from '../../../components/UI/Feedback/SnackAlert'

import '../AdminPanel.css'

const Classifications = () => {
  const [classifications, setClassifications] = useState()
  const [openForm, setOpenForm] = useState(false)
  const [formMode, setFormMode] = useState()
  const [selectedId, setSelectedId] = useState()
  const [values, setValues] = useState()

  // Snackbar
  const [snackDisplay, setSnackDisplay] = useState(false)
  const [snackType, setSnackType] = useState()
  const [snackMessage, setSnackMessage] = useState()

  const getClassifications = async() => {
    let data = await getRequest("/treatmentClassifications")
    if(data) {
      let classifications = data.map(classification => {
        return {
          id: classification.id,
          name: classification.name,
        }
      })
      setClassifications(classifications)
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
  const handleSubmitForm = async(formData) => {
    let response
    formMode === 'Add'
      ? response = await postRequest("/treatmentClassifications", formData)
      : response = await patchRequest(`/treatmentClassifications/${selectedId}`, formData)

    if(response) {
      setOpenForm(false)
      handleSnackbar('success', 'Submitted')
      getClassifications()
    } else {
      handleSnackbar('error', 'Failed to submit')
    }
  }

  const deleteClassification = async(id) => {
    let response = await deleteRequest(`/treatmentClassifications/${id}`)
    // console.log(response)
    if(response) {
      handleSnackbar('success', 'Record deleted')
      getClassifications()
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
    getClassifications()
  },[])

  return(
    <>
      <div className="admin-container">
        <Navigation/>
        <div className="admin-body">
          <TopBar />
          <div className="title-container">
            <h1>Treatments Classifications</h1>
            <ExportCSV data={classifications} title={"Treatments-Classifications"}/>
          </div>
          <Table 
            data = {classifications}
            title = {{table:"Treatments Classifications", action:"classification"}}
            deleteRecord = {deleteClassification}
            handleOpenForm={handleOpenForm}
          />
          <ClassificationForm 
            open={openForm}
            setOpenForm={setOpenForm} 
            handleSubmitForm={handleSubmitForm}
            mode={formMode}
            values={values}
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

export default Classifications