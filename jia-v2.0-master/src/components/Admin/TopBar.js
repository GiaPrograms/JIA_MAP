import React from 'react'
import {NavLink, withRouter} from 'react-router-dom';
import { logout, type } from '../AuthenticationService';

import "./TopBar.css"

const TopBar = ({history}) => {
  const handleLogout = () => {
    logout()
    history.push('/')
  }

  return(
    <div className="top-bar">
      <div className="top-bar-left">
        <ul>
          <li>
            <NavLink to="/questionnaire">Pain & treatments</NavLink>
          </li>
          <li>
          <NavLink to="/whats-important-to-you">What's important</NavLink>
          </li>
          <li>
          <NavLink to="/review-and-select/recommendations">Review & select</NavLink>
          </li>
          <li>
          <NavLink to="/make-your-plan">Plan</NavLink>
          </li>
          <li>
          <NavLink to="/summary">Summary</NavLink>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <p onClick={handleLogout}>Logout</p>
      </div>
    </div>
  )
}

export default withRouter(TopBar)