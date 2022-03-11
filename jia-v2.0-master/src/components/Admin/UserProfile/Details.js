import React, {useState, useEffect} from 'react'

import LogRow from './LogRow';
import StepOne from '../../Summary/StepOne';
import StepTwo from '../../Summary/StepTwo';
import StepThree from '../../Summary/StepThree';
import StepFour from '../../Summary/StepFour';
import { getRequest } from '../../../API/ApiHandler';
import Spinner from '../../UI/Spinner';
import ExportCSV from '../../UI/ExportCSV';

const Details = ({user}) => {
  const [logs, setLogs] = useState([])
  const [logsPage, setLogsPage]= useState(1)
  const [logsExport, setLogsExport] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getUserLog = async() => {
    const data = await getRequest(`/logs/${user.id}`)
    if(data) {
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      let updatedLog = data.map(log => {
        const options = { timeStyle: 'short', timeZone: 'UTC' }
        const time = new Date(log.createdAt).toLocaleTimeString('en-CA', options)
        const date = new Date(log.createdAt).toLocaleDateString('en-CA')
        log.date = date
        log.time = time
        return log
      })
      setLogs(updatedLog)
      handleDownloadablLog(updatedLog)
    }
    setIsLoading(false)
  }

  // Populate the content for the user log download
  const handleDownloadablLog = (updatedLog) => {
    const exportList = updatedLog.map(el => {
      let log = {
        date: el.date,
        time: el.time,
        purpose: el.purpose,
        "Pain areas": el.step_one ? el.step_one.pain_areas : '',
        "Pain level": el.step_one ? el.step_one.pain_level : '',
        "Prescribed medications": el.step_one ? el.step_one.selected_meds : '',
        "Prescribed medications (others)": el.step_one ? el.step_one.prescribed_text : '',
        "Other treatments": el.step_one ? el.step_one.other_treatments : '',
        "Other treatments (others)": el.step_one ? el.step_one.treatment_text : '',
        "How often do you use prescribed medication": el.step_one ? el.step_one.howOften_pres : '',
        "How often do you use other treatments": el.step_one ? el.step_one.howOften_other : '',
        "How well does your treatment manage pain": el.step_one ? el.step_one.manage_pain : '',
        "How well does your treatment control arthritis": el.step_one ? el.step_one.control_arthritis : '',
        preferences: el.preferences ? el.preferences.prefs : '',
        plan: el.plan ? el.plan : '',
        "Motivation level": el.step_three ? el.step_three.motivation_level : '',
        "Confidence level": el.step_three ? el.step_three.confidence_level : '',
        "Factors preventing you from following your plan" :el.step_three ? el.step_three.factors : '',
        "Suggestions to help you plan your next steps" :el.step_three ? el.step_three.suggestions : ''
      }
      return log
    })
    setLogsExport(exportList)
  }
  //console.log(logsExport)

  useEffect(() => {
    setIsLoading(true)
    if(user) getUserLog()
  },[user])

  const logList = logs.length && 
    logs.slice((logsPage * 5) - 5, logsPage * 5).map(log => (
      <LogRow key={log.id} log={log} user={user}/>
    ))

  return(
    <div className="user-card-body">
      <StepOne userId={user.id}/>
      <StepTwo userId={user.id}/>
      <StepThree userId={user.id}/>
      <StepFour userId={user.id}/>

      <div className="log-container">
        <h2 className="log-title">User log
  
        </h2>
        {isLoading && <Spinner/>}
        {!isLoading &&
        <>
          {logs.length ?
            <div className="log-content">
              <ExportCSV data={logsExport} title={"user log"}/>
              <div className="table-header">
                <span></span>
                <p><strong>Date</strong></p>
                <p><strong>Time</strong></p>
                <p><strong>Purpose</strong></p>
                <p><strong>Plan</strong></p>
                <p><strong>Preferences</strong></p>
                <p><strong>Others</strong></p>
                <span></span>
              </div>
              <div className="table-content">
                {logList}
                <div className="log-nav">
                {logsPage !== 1 
                  ? <p onClick={() => setLogsPage(logsPage -1)}>Previous</p> 
                  : <p className="disabled">Previous</p>
                }
                
                {logsPage * 5 < logs.length 
                  ? <p onClick={() => setLogsPage(logsPage +1)}>Next</p>
                  : <p className="disabled">Next</p>
                }
                </div>
              </div>
            </div>
            : <p className="log-content">No Records were found</p>
          }
        </>
        }
      </div>
    </div>
  )
}

export default Details