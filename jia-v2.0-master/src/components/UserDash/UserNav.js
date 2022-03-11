import React from 'react'
import {NavLink} from 'react-router-dom';

import './UserNav.css'

const UserNav = props => {
  const handleUserState = () => {
    if(props.onCloseUser) props.onCloseUser(false, null)
  }

  return(
    <div className="side-nav-container">
      <div className="fixed-content">
        <div className="side-header">
          <h3>User Dashboard</h3>
        </div>
        <ul className="list">
          <li>Choose a Category
            <ul>
              <br></br><li><NavLink to="/userPanel/average" onClick={handleUserState}>Pain over time </NavLink></li><hr></hr>
            </ul>
          
            <ul>
              <li><NavLink to="/userPanel/manage">Pain management and disease control</NavLink></li><hr></hr>
            </ul>
          
            <ul>
              <li><NavLink to="/userPanel/treatments">Planned and used treatments</NavLink></li><hr></hr>
            </ul>
          
            {/* <ul>
              <li><NavLink to="/userPanel/summary">Summaries</NavLink></li><hr></hr>
            </ul> */}
          </li>
        </ul>
      </div>
    </div>
  )
  
}

export default UserNav