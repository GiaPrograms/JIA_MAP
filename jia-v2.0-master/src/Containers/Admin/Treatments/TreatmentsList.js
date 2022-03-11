/**
 * @file
 * Container for the admin panel treatments list.
 * Handles fetching of the treatments list and sending the data to the @see Table component
 * @author <akel.ms93@gmail.com>
 */

import React, {useState, useEffect} from 'react'
import Navigation from '../../../components/Admin/Navigation'
import Table from '../../../components/Admin/Table'
import TreatmentForm from '../../../components/Admin/Forms/Treatments/TreatmentForm'
import TopBar from '../../../components/Admin/TopBar'
import '../AdminPanel.css'
import ExportCSV from '../../../components/UI/ExportCSV'
import {getRequest, postRequest, postFormRequest, patchFormRequest, patchRequest, deleteRequest} from "../../../API/ApiHandler"
import SnackAlert from '../../../components/UI/Feedback/SnackAlert'


const TreatmentsList = () => {
  const [treatments, setTreatments] = useState([])
  const [classifications, setClassifications] = useState([])
  const [categories, setCategories] = useState([])
  const [openForm, setOpenForm] = useState(false)
  const [formMode, setFormMode] = useState()
  const [selectedId, setSelectedId] = useState()
  const [values, setValues] = useState([])

  //Snackbar
  const [snackDisplay, setSnackDisplay] = useState(false)
  const [snackType, setSnackType] = useState()
  const [snackMessage, setSnackMessage] = useState()
  
  const getTreatmentsList = async() => {
    let data = await getRequest("/treatments")
    if(data){
      let updatedList = data.map(treatment => {
        return {
          id: treatment.id,
          name: treatment.name,
          supervision: treatment.supervision,
          order_number: treatment.order_number,
          evidence_level: treatment.evidence_level,
          specification: treatment.specification,
          description: treatment.description,
          traffic_level: treatment.traffic_level,
          traffic_description: treatment.traffic_description,
          experts_suggest: treatment.experts_suggest,
          how_use: treatment.how_use,
          how_soon: treatment.how_soon,
          cost: treatment.cost,
          where: treatment.where,
          consider: treatment.consider,
          image: treatment.image,
          treatment_classification_id: treatment.treatment_classification_id,
          learn: treatment.learns,
          video: treatment.videos,
          categories: treatment.categories
        }
      })
      setTreatments(updatedList)
    }
  }

  const getTreatmentClassifications = async() => {
    let data = await getRequest("/treatmentClassifications")
    if(data){
      let updatedList = data.map(classification => {
        return {
          id: classification.id,
          name: classification.name,
        }
      })
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
      setClassifications(updatedList)
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

  const adjustOrderNumber = (mode, newOrderNumber) => {
    // console.log(mode, newOrderNumber)
    const sortedTeatments = treatments.sort((a, b) => (a.order_number > b.order_number) ? 1 : ((b.order_number > a.order_number) ? -1 : 0))
    // console.log(sortedTeatments)
    if(mode === 'Add') {
      let updatedOrderNo = []
      sortedTeatments.forEach(el => {
        if(el.order_number === newOrderNumber) {
          el.order_number += 1
          newOrderNumber = el.order_number 

          // let updatedOrder = {
          //   id: el.id,
          //   order_number: el.order_number
          // }
          updatedOrderNo.push(el)
        }
      })
      // console.log(updatedOrderNo)
      patchRequest("/treatments/reorder/list", updatedOrderNo)
    }
    // console.log(sortedTeatments)
  }

  /**
   * Handles form submission request POST and PATCH based on the form mode
   * @param {*} formData form field values
   */
  const handleSubmitForm = async (formData, linkList, videoList, selectedCategories) => {
    const _formData = new FormData();
    Object.keys(formData).forEach(key => _formData.append(key, formData[key]));

    let data
    formMode === 'Add'
      ? data = await postFormRequest("/treatments", _formData)
      : data = await patchFormRequest(`/treatments/${selectedId}`, _formData)

    if(data) {
      await handleLinks(linkList, data.id)
      await handleVideos(videoList, data.id)
      await submitTreatCategories(selectedCategories, data.id)
      setOpenForm(false)
      setSnackType('success')
      setSnackMessage('Submitted')
      setSnackDisplay(true)
    } else {
      setSnackType('error')
      setSnackMessage('Failed to submit')
      setSnackDisplay(true)
    }
    //adjustOrderNumber(formMode, parseInt(formData.order_number))
    getTreatmentsList()
  }

  const handleLinks = async(links, id) => {
    let updatedLinks = await links.map(link => {
      link.treatment_id = id
      return link
    })
    if(updatedLinks.length) {
      formMode === 'Add'
        ? await postRequest("/learn", updatedLinks)
        : await patchRequest("/learn", updatedLinks)
    } else {
      let input = {treatment_id: id}
      deleteRequest("/learn", input)
    }
  }

  const handleVideos = async(videos, id) => {
    let updatedVideos = await videos.map(video => {
      video.treatment_id = id
      return video
    })
    if(updatedVideos.length) {
      formMode === 'Add'
        ? await postRequest("/videos", updatedVideos)
        : await patchRequest("/videos", updatedVideos)
    } else {
      let input = {treatment_id: id}
      deleteRequest("/videos", input)
    }
  }

  const submitTreatCategories = async(selectedCategories, treatment_id) => {
    const updatedCats = {treatment_id, selectedCategories}
    await postRequest("/treatmentCategories", updatedCats)
  }

  const deleteTreatment = async(id) => {
    let response = await deleteRequest(`/treatments/${id}`)
    if(response) {
      let input = {treatment_id: null}
      deleteRequest("/learn", input)
      deleteRequest("/videos", input)
      deleteRequest(`/studies/delete/multiple`, input)
      setSnackType('success')
      setSnackMessage('Record deleted')
      setSnackDisplay(true)
    } else {
      setSnackType('error')
      setSnackMessage('Failed to delete')
      setSnackDisplay(true)
    }
    getTreatmentsList()
  }

  useEffect(() => {
    getTreatmentsList()
    getTreatmentClassifications()
    getCategories()
  },[])

  return(
    <>
    <div className="admin-container">
      <Navigation/>
      <div className="admin-body">
        <TopBar />
        <div className="title-container">
          <h1>Treatments</h1>
          <ExportCSV data={treatments} title={"Treatments"}/>
        </div>
        <Table 
          data = {treatments}
          title = {{table:"Treatments", action:"treatment"}}
          deleteRecord = {deleteTreatment}
          handleOpenForm={handleOpenForm}
        />
        <TreatmentForm 
         open={openForm}
         setOpenForm={setOpenForm} 
         handleSubmitForm={handleSubmitForm}
         mode={formMode}
         values={values}
         classifications={classifications}
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

export default TreatmentsList