import React from 'react'
import Navigation from '../../../components/Admin/Navigation'
import Content from '../../../components/Admin/Dashboard/Content'
import TopBar from '../../../components/Admin/TopBar'

const Dashboard = () => {
  return(
    <div className="admin-container">
      <Navigation/>
      <div className="admin-body">
        <TopBar />
        <div className="title-container">
          <h1>Dashboard</h1>
        </div>
        <Content />
      </div>
    </div>
  )
}

export default Dashboard