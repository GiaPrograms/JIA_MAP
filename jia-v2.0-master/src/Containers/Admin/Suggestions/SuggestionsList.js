/**
 * @file
 * Container for the admin panel suggestions list.
 * Handles fetching of the suggestions list and sending the data to the @see Table component
 * @author <akel.ms93@gmail.com>
 */

import React, {useState, useEffect} from 'react'
import SuggestionForm from '../../../components/Admin/Forms/Others/SuggestionForm'
import Navigation from '../../../components/Admin/Navigation'
import Table from '../../../components/Admin/Table'
import TopBar from '../../../components/Admin/TopBar'
import ExportCSV from '../../../components/UI/ExportCSV'
import {getRequest, postRequest, patchRequest, deleteRequest} from "../../../API/ApiHandler"
import SnackAlert from '../../../components/UI/Feedback/SnackAlert'

import '../AdminPanel.css'

const SuggestionsList = () => {
  const [suggestions, setSuggestions] = useState([])
  const [openForm, setOpenForm] = useState(false)
  const [formMode, setFormMode] = useState()
  const [selectedId, setSelectedId] = useState()
  const [values, setValues] = useState()

  // Snackbar
  const [snackDisplay, setSnackDisplay] = useState(false)
  const [snackType, setSnackType] = useState()
  const [snackMessage, setSnackMessage] = useState()

  const getSuggestionsList = async() => {
    let data = await getRequest("/suggestions")
    if(data){
      let updatedList = data.map(suggestion => {
        return {
          id: suggestion.id,
          title: suggestion.title,
          description: suggestion.description
        }
      });
      setSuggestions(updatedList)
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
  const handleSubmitForm = async (formData) => {
    let response
    formMode === 'Add'
      ? response = await postRequest("/suggestions", formData)
      : response = await patchRequest(`/suggestions/${selectedId}`, formData)

    if(response) {
      setOpenForm(false)
      handleSnackbar('success', 'Submitted')
      getSuggestionsList()
    } else {
      handleSnackbar('error', 'Failed to submit')
    }
  }

  const deleteSuggestion = async(id) => {

    let response = await deleteRequest(`/suggestions/${id}`)
    if(response) {
      handleSnackbar('success', 'Record deleted')
      getSuggestionsList()
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
    getSuggestionsList()
  },[])

  return(
    <>
      <div className="admin-container">
        <Navigation/>
        <div className="admin-body">
          <TopBar />
          <div className="title-container">
            <h1>Suggestions</h1>
            <ExportCSV data={suggestions} title={"Suggestions"}/>
          </div>
          <Table 
            data = {suggestions}
            title = {{table:"Suggestions", action:"suggestion"}}
            deleteRecord = {deleteSuggestion}
            handleOpenForm={handleOpenForm}
          />
          <SuggestionForm 
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

export default SuggestionsList