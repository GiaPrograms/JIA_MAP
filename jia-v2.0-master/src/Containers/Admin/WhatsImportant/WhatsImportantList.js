/**
 * @file
 * Container for the admin panel what's important list.
 * Handles fetching of the what's important list and sending the data to the @see Table component
 * @author <akel.ms93@gmail.com>
 */

import React, {useState, useEffect} from 'react'
import WhatsImportantForm from '../../../components/Admin/Forms/Others/WhatsImportantForm'
import Navigation from '../../../components/Admin/Navigation'
import Table from '../../../components/Admin/Table'
import TopBar from '../../../components/Admin/TopBar'
import ExportCSV from '../../../components/UI/ExportCSV'
import {getRequest, postRequest, patchRequest, deleteRequest} from "../../../API/ApiHandler"
import SnackAlert from '../../../components/UI/Feedback/SnackAlert'

import '../AdminPanel.css'

const WhatsImportantList = () => {
  const [whatsImportant, setWhatsImportant] = useState([])
  const [categories, setCategories] = useState([])
  const [openForm, setOpenForm] = useState(false)
  const [formMode, setFormMode] = useState()
  const [selectedId, setSelectedId] = useState()
  const [values, setValues] = useState()

  // Snackbar
  const [snackDisplay, setSnackDisplay] = useState(false)
  const [snackType, setSnackType] = useState()
  const [snackMessage, setSnackMessage] = useState()

  const getWhatsImportant = async () => {
    let data = await getRequest("/preferences")
    if(data){
      let updatedList = data.map(preference => {
        return {
          id: preference.id,
          description: preference.description,
          recommends: preference.recommends,
          reversed: preference.reversed,
          left_label: preference.left_label,
          right_label: preference.right_label,
          threshold: preference.threshold,
          categories: preference.categories
        }
      })
      setWhatsImportant(updatedList)
    }
  }

  const getCategories = async() => {
    let data = await getRequest("/categories")
    if(data) setCategories(data)
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
  const handleSubmitForm = async(formData, selectedCategories) => {
    let data
    formMode === 'Add'
      ? data = await postRequest("/preferences", formData)
      : data = await patchRequest(`/preferences/${selectedId}`, formData)

    if(data) {
      await submitPrefCategories(selectedCategories, data.id)
      setOpenForm(false)
      handleSnackbar('success', 'Submitted')
      getWhatsImportant()
    } else {
      handleSnackbar('error', 'Failed to submit')
    }
  }

  const submitPrefCategories = async(selectedCategories, preference_id) => {
    const updatedCats = {preference_id, selectedCategories}
    await postRequest("/preferenceCategories", updatedCats)
  }

  const deleteWhatsImportant = async(id) => {
    let response = await deleteRequest(`/preferences/${id}`)
    if(response) {
      handleSnackbar('success', 'Record deleted')
      getWhatsImportant()
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
    getWhatsImportant()
    getCategories()
  },[])

  return(
    <>
      <div className="admin-container">
        <Navigation/>
        <div className="admin-body">
          <TopBar />
          <div className="title-container">
            <h1>What's Important</h1>
            <ExportCSV data={whatsImportant} title={"whats-Important"}/>
          </div>
          <Table 
            data = {whatsImportant}
            title = {{table:"What's Important", action:"preference"}}
            deleteRecord = {deleteWhatsImportant}
            handleOpenForm={handleOpenForm}
          />
          <WhatsImportantForm 
            open={openForm} 
            setOpenForm={setOpenForm} 
            handleSubmitForm={handleSubmitForm}
            mode={formMode}
            values={values}
            categories={categories}
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

export default WhatsImportantList