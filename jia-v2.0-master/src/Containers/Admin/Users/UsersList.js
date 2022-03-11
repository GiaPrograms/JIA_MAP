/**
 * @file
 * Container for the admin panel users list.
 * Handles fetching of the users list and sending the data to the @see Table component
 * @author <akel.ms93@gmail.com>
 */

import React, {useState, useEffect} from 'react'
import UserForm from '../../../components/Admin/Forms/UserForm'
import Navigation from '../../../components/Admin/Navigation'
import Table from '../../../components/Admin/Table'
import TopBar from '../../../components/Admin/TopBar'
import UserProfile from '../../../components/Admin/UserProfile/UserProfile'
import ExportCSV from '../../../components/UI/ExportCSV'
import {getRequest, postRequest, patchRequest, deleteRequest} from "../../../API/ApiHandler"
import SnackAlert from '../../../components/UI/Feedback/SnackAlert'

import '../AdminPanel.css'

const UsersList = () => {
  const [users, setUsers] = useState()
  const [usersData, setUsersData] = useState()
  const [openForm, setOpenForm] = useState(false)
  const [formMode, setFormMode] = useState()
  const [selectedId, setSelectedId] = useState()
  const [values, setValues] = useState()
  const [isViewing, setIsViewing] = useState(false)
  const [userData, setUserData] = useState([])

  // Snackbar
  const [snackDisplay, setSnackDisplay] = useState(false)
  const [snackType, setSnackType] = useState()
  const [snackMessage, setSnackMessage] = useState()

  const getUsersList = async() => {
    let response = await getRequest("/auth/users")
    if(response){
      let {data} = response
      let updatedList = data.map(user => {
        return {
          id: user.id,
          username: user.username,
          type: user.type
        }
      })
      setUsers(updatedList)
    }
  }
  
  // Content for the users download button
  const getUsersData = async() => {
    let userData = await getRequest("/auth/users/usersData")
    if(userData) {
      let updatedList = userData.map(user => {
        let fac = user.factors.map(el => el.title)
        let sug = user.suggestions.map(el => el.title)
        let plan = user.plan.map(el => el.name)
        let sc = user.sc.map(el => el.name)
        let hcp = user.hcp.map(el => el.name)
        let meds = user.medications.map(el => el.name)
        let treat = user.treatments.map(el => el.name)
        let areas = []
        let preferences = user.pref.map(el => `${el.description}: ${el.user_preference.value}`)

        for(let prop in user.pain_area) {
          if(user.pain_area[prop]) areas.push(prop)
        }
        let data = {
          "Username": user.username,
          "Pain level": user.pain_level ? user.pain_level.level : '',
          "Pain areas": areas,
          "Medications": meds,
          "Treatments": treat,
          "How often do you use prescribed medication": user.frequently ? user.frequently.prescribed_meds : '',
          "How often do you use other treatments": user.frequently ? user.frequently.other_treatments : '',
          "How well does your treatment manage pain": user.effectiveness ? user.effectiveness.manage_pain : 0,
          "How well does your treatment control arthritis": user.effectiveness ? user.effectiveness.control_arthritis : '',
          preferences,
          "Plan": plan,
          "Motivation level": user.motivation ? user.motivation.level : '',
          "Confidence level": user.confidence ? user.confidence.level : '',
          "Factors preventing you from following your plan": fac,
          "Suggestions to help you plan your next steps": sug,
          "SC": sc,
          "HCP": hcp,
        }
        return data
      })
      setUsersData(updatedList)
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
      ? response = await postRequest("/auth/users", formData)
      : response = await patchRequest(`/auth/users/${selectedId}`, formData)

    if(response) {
      setOpenForm(false)
      handleSnackbar('success', 'Submitted')
      getUsersList()
    } else {
      handleSnackbar('error', 'Failed to submit')
    }
  }

  const deleteUser = async(user_id) => {
    let response = await deleteRequest(`/auth/users/${user_id}`)
    if(response) {
      handleSnackbar('success', 'Record deleted')
      getUsersList()
    } else {
      handleSnackbar('error', 'Failed to delete')
    }
  }

  const handleSnackbar = (type, message) => {
    setSnackType(type)
    setSnackMessage(message)
    setSnackDisplay(true)
  }

  const handleUserView = (view, user) => {
    setIsViewing(view)
    setUserData(user)
  }

  useEffect(() => {
    getUsersList()
    getUsersData()
  },[isViewing])

  const display = !isViewing
    ? <>
        <div className="title-container">
          <h1>Users</h1>
          <ExportCSV data={usersData} title={"Users"} /> 
        </div>
        <Table 
          data = {users} 
          title = {{table:"Users", action:"user"}}
          deleteRecord = {deleteUser}
          handleOpenForm={handleOpenForm}
          onViewUser={handleUserView}
        />
      </>
    : <>
        <UserProfile user={userData} onCloseUser={handleUserView}/>
      </>
  return(
    <>
      <div className="admin-container">
        <Navigation onCloseUser={handleUserView}/>
        <div className="admin-body">
          <TopBar />
          {display}
          <UserForm 
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

export default UsersList