import React, {useState, useEffect} from 'react'
import TopBar from '../../../components/Admin/TopBar'
import UserNav from '../../../components/UserDash/UserNav'
import {jsPDF} from 'jspdf'
import {Button} from 'reactstrap'

import '../UserPanel.css'

const PastSum = () => {
  return(
      <>
      <div className="user-container">
        <UserNav />
        <div className="user-body">
          <TopBar />
            <div className="captions">
              <h3><b>Review Past Summaries</b></h3>
              <p>Here, you can review your past summaries from previous sessions using the JIA Option Map.</p>
              <p>If you ever need to view your data from past sessions, you can access it here.</p>
              <br></br>
              <b>Choose Date: </b>
            </div>

            <div className="dropdown">
              <select id="datesList">
                <option> </option>
                <option>2021-03-21</option>
                <option>In</option>
                <option>Dates</option>
                <option>Later</option>
              </select>
            </div>

            <div className="button2">
              <Button className='load-btn'>Go!</Button>
            </div>
        </div>
      </div>
      </>
  )
}

export default PastSum
