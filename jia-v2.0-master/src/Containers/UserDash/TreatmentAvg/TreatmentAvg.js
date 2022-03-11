import React, {useState, useEffect} from 'react'
import TopBar from '../../../components/Admin/TopBar'
import UserNav from '../../../components/UserDash/UserNav'
//import {PieChart, Pie, Legend} from 'recharts'
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar} from 'recharts'
import {getRequest} from "../../../API/ApiHandler"

import '../UserPanel.css'

const TreatmentAvg = () => {
  const [user, setUser] = useState()
  const [logs, setLogs] = useState([])
  const [usedExport, setUsedExport] = useState([])
  const [plannedExport, setPlannedExport] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getUser = async() => {
    let response = await getRequest('/auth/users/current/me')
    let user = ''
    if(response){
      user = response.data.id
    setUser(user)
    getLogs(user)
    }
  }

  const getLogs = async(user) => {
    const data = await getRequest(`/logs/${user}`)
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
      getUsed(updatedLog)
      getPlanned(updatedLog)
    }
    setIsLoading(false)
  }
  
  const getUsed = (updatedLog) => {
    const exportList = updatedLog.map(el => {
     if(el.step_one !== null){ 
      let log = {
          "used": el.step_one ? JSON.parse(el.step_one).other_treatments : ''
        }
        return log
      }
    })
    setUsedExport(exportList)
    removeNullUsed(exportList)
  }

  const getPlanned = (updatedLog) => {
    const exportList = updatedLog.map(el => {
     if(el.plan !== null){ 
      let log = {
          "planned": el.plan ? el.plan : ''
        }
        return log
      }
    })
    setPlannedExport(exportList)
    removeNullPlanned(exportList)
  }

  const removeNullUsed = (exportList) => {
    exportList = exportList.filter(function(element){
      return element !== undefined
    })
    setUsedExport(exportList)
    usedCount(exportList)
    return exportList
  }

  const removeNullPlanned = (exportList) => {
    exportList = exportList.filter(function(element){
      return element !== undefined
    })
    setPlannedExport(exportList)
    planCount(exportList)
    return exportList
  }

  const planCount = (list) => {
   let counts = []
   for(var i = 0; i < list.length; i++){
     for(var j = 0; j < JSON.parse(list[i].planned).length; j++){
      if(JSON.parse(list[i].planned)[j] !== null){
        counts.push(JSON.parse(list[i].planned)[j])
      }
     }
   }
   var output = Object.values(counts.reduce((obj, { name }) => {
    if (obj[name] === undefined)
       obj[name] = { name: name, occurrences: 1 };
    else
       obj[name].occurrences++;
    return obj;
  }, {}));
   setPlannedExport(output)
   return output
  }

  const usedCount = (list) => {
    let counts = []
    for(var i = 0; i < list.length; i++){
      for(var j = 0; j < list[i].used.length; j++){
        if(list[i].used.length !== 0){
          counts.push(list[i].used[j])
        }
      }
    }
    var output = Object.values(counts.reduce((obj, { name }) => {
      if (obj[name] === undefined)
         obj[name] = { name: name, occurrences: 1 };
      else
         obj[name].occurrences++;
      return obj;
    }, {}));
    setUsedExport(output)
    return output
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p>{`${"Treatment"} : ${payload[0].payload.name}`}</p>
          <p>{`${"Number"} : ${payload[0].payload.occurrences}`}</p>
        </div>
      )
    }
    return null;
  }

  useEffect(() => {
    setIsLoading(true)
    getUser()
    if(user) getLogs()
  },[user])

  return(
      <>
      <div className="user-container">
        <UserNav />
        <div className="user-body">
          <TopBar />
          <div className="captions">
            <h3><b>Treatment Averages</b></h3>
            <p>Here, you can review how many times you have added treatments to your plan and used certain treatments.</p>
            <p>The first graph shows how many times you have added a treatment to your plan using the JIA Option Map.</p>
            <p>The second graph shows how many times you've used the treatments you planned.</p>
            <p>This will let you know which treatments you enjoy using the most!</p>
            <br></br>
          </div>

          <div className="t3">
            <p><b>Treatments Planned</b></p>
          </div>

          <BarChart className="bar" width={1000} height={400} data={plannedExport} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" label={{value:'Treatment', position:"bottom", offset:0}}/>
            <YAxis dataKey="occurrences" allowDecimals={false} label={{value:"Times Planned", position:"insideLeft", angle:-90}}/>
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="occurrences" fill="#1f417e" maxBarSize={50}/>
          </BarChart>

          <hr></hr><div className="t4">
            <p><b>Treatments Used</b></p>
          </div>

          <BarChart className="bar" width={1000} height={400} data={usedExport} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" label={{value:'Treatment', position:"bottom", offset:0}}/>
            <YAxis dataKey="occurrences" allowDecimals={false} label={{value:"Times Used", position:"insideLeft", angle:-90}}/>
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="occurrences" fill="#1f417e" maxBarSize={50}/>
          </BarChart>

        </div>
      </div>
      </>
  )
}

export default TreatmentAvg
