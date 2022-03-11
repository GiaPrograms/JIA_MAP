import React from 'react'
import {NavLink} from 'react-router-dom';

import './Navigation.css'

const Navigation = props => {
  const handleUserState = () => {
    if(props.onCloseUser) props.onCloseUser(false, null)
  }

  return(
    <div className="side-nav-container">
      <div className="fixed-content">
        <div className="side-header">
          <h3>Admin Panel</h3>
        </div>
        <ul className="list">
          <li>Main
            <ul>
              {/* <li><NavLink to="/adminPanel/dashboard">Dashboard</NavLink></li> */}
              <li><NavLink to="/adminPanel/users" onClick={handleUserState}>Users</NavLink></li>
            </ul>
          </li>
          <li>Treatments
            <ul>
              <li><NavLink to="/adminPanel/treatments">Treatments List</NavLink></li>
              <li><NavLink to="/adminPanel/studies">Research Data</NavLink></li>
              <li><NavLink to="/adminPanel/studyResults">Study Results</NavLink></li>
              <li><NavLink to="/adminPanel/treatmentClassifications">Classifications</NavLink></li>
            </ul>
          </li>
        
          <li>Medications
            <ul>
              <li><NavLink to="/adminPanel/medications">Medications List</NavLink></li>
              <li><NavLink to="/adminPanel/medicationClassifications">Classifications</NavLink></li>
            </ul>
          </li>

          <li>Others
            <ul>
              <li><NavLink to="/adminPanel/whatsImportant">Preferences Circles</NavLink></li>
              <li><NavLink to="/adminPanel/factors">Factors</NavLink></li>
              <li><NavLink to="/adminPanel/suggestions">Suggestions</NavLink></li>
              <li><NavLink to="/adminPanel/categories">Categories</NavLink></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
  
}

export default Navigation