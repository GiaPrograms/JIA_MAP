/**
 * @file
 * Container for the admin panel categories list.
 * Handles fetching of the categories list and sending the data to the @see Table component
 * @author <akel.ms93@gmail.com>
 */

import React, {useState, useEffect} from 'react'
import Navigation from '../../../components/Admin/Navigation'
import Table from '../../../components/Admin/Table'
import CategoriesForm from '../../../components/Admin/Forms/Others/CategoriesForm'
import TopBar from '../../../components/Admin/TopBar'
import ExportCSV from '../../../components/UI/ExportCSV'
import {getRequest, postRequest, patchRequest, deleteRequest} from "../../../API/ApiHandler"
import SnackAlert from '../../../components/UI/Feedback/SnackAlert'

import '../AdminPanel.css'

const Categories = () => {
  const [categories, setCategories] = useState()
  const [openForm, setOpenForm] = useState(false)
  const [formMode, setFormMode] = useState()
  const [selectedId, setSelectedId] = useState()
  const [values, setValues] = useState()

  // Snackbar
  const [snackDisplay, setSnackDisplay] = useState(false)
  const [snackType, setSnackType] = useState()
  const [snackMessage, setSnackMessage] = useState()

  const getCategories = async() => {
    let data = await getRequest("/categories")
    if(data) {
      let categories = data.map(category => {
        return {
          id: category.id,
          name: category.name,
        }
      })
      setCategories(categories)
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
      ? response = await postRequest("/categories", formData)
      : response = await patchRequest(`/categories/${selectedId}`, formData)

    if(response) {
      setOpenForm(false)
      handleSnackbar('success', 'Submitted')
      getCategories()
    } else {
      handleSnackbar('error', 'Failed to submit')
    }
  }

  const deleteCategory = async(id) => {
    let response = await deleteRequest(`/categories/${id}`)
    if(response) {
      handleSnackbar('success', 'Record deleted')
      getCategories()
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
    getCategories()
  },[])

  return(
    <>
      <div className="admin-container">
        <Navigation/>
        <div className="admin-body">
          <TopBar />
          <div className="title-container">
            <h1>Categories</h1>
            <ExportCSV data={categories} title={"Categories"}/>
          </div>
          <Table 
            data = {categories}
            title = {{table:"Categories", action:"category"}}
            deleteRecord = {deleteCategory}
            handleOpenForm={handleOpenForm}
          />
          <CategoriesForm 
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

export default Categories