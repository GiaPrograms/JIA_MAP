/**
 * @file
 * Container for the admin panel factors list.
 * Handles fetching of the factors list and sending the data to the @see Table component
 * @author <akel.ms93@gmail.com>
 */

import React, {useState, useEffect} from 'react'
import FactorForm from '../../../components/Admin/Forms/Others/FactorForm'
import Navigation from '../../../components/Admin/Navigation'
import Table from '../../../components/Admin/Table'
import TopBar from '../../../components/Admin/TopBar'
import ExportCSV from '../../../components/UI/ExportCSV'
import {getRequest, postRequest, patchRequest, deleteRequest} from "../../../API/ApiHandler"
import SnackAlert from '../../../components/UI/Feedback/SnackAlert'

import '../AdminPanel.css'

const FactorsList = () => {
  const [factors, setFactors] = useState([])
  const [openForm, setOpenForm] = useState(false)
  const [formMode, setFormMode] = useState()
  const [selectedId, setSelectedId] = useState()
  const [values, setValues] = useState()

  // Snackbar
  const [snackDisplay, setSnackDisplay] = useState(false)
  const [snackType, setSnackType] = useState()
  const [snackMessage, setSnackMessage] = useState()

  const getFactorsList = async() => {
    let data = await getRequest("/factors")
    if(data){
      let updatedList = data.map(factor => {
        return {
          id: factor.id,
          title: factor.title,
          description: factor.description
        }
      });
      setFactors(updatedList)
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
      ? response = await postRequest("/factors", formData)
      : response = await patchRequest(`/factors/${selectedId}`, formData)

    if(response) {
      setOpenForm(false)
      handleSnackbar('success', 'Submitted')
      getFactorsList()
    } else {
      handleSnackbar('error', 'Failed to submit')
    }
  }

  const deleteFactor = async(id) => {
    let response = await deleteRequest(`/factors/${id}`)
    if(response) {
      handleSnackbar('success', 'Record deleted')
      getFactorsList()
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
    getFactorsList()
  },[])

  return(
    <>
    <div className="admin-container">
      <Navigation/>
      <div className="admin-body">
        <TopBar />
        <div className="title-container">
          <h1>Factors</h1>
          <ExportCSV data={factors} title={"Factors"}/>
        </div>
        <Table 
          data = {factors}
          title = {{table:"Factors", action:"factor"}}
          deleteRecord = {deleteFactor}
          handleOpenForm={handleOpenForm}
        />
        <FactorForm
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

export default FactorsList