import React, {useState, useEffect} from 'react'
import TopBar from '../../../components/Admin/TopBar'
import UserNav from '../../../components/UserDash/UserNav'
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine, ReferenceArea} from 'recharts'
import {Button} from 'reactstrap'
import {getRequest} from "../../../API/ApiHandler"

import '../UserPanel.css'

const PainAvg = () => {
  const [user, setUser] = useState()
  const [logs, setLogs] = useState([])
  const [logsExport, setLogsExport] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [dates, setDates] = useState()
  const [date1, setDate1] = useState('default')
  const [date2, setDate2] = useState('default')
  const [limited, setLimited] = useState([])

  //get current user's id
  const getUser = async() => {
    let response = await getRequest('/auth/users/current/me')
    let user = ''
    if(response){
      user = response.data.id
    setUser(user)
    getLogs(user)
    }
  }

  //get that user's logs
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
      getData(updatedLog)
    }
    setIsLoading(false)
  }
  
  //create map from logs of dates, pain levels, and other treatments
  const getData = (updatedLog) => {
    const exportList = updatedLog.map(el => {
     if(el.step_one !== null){ 
      let log = {
          date: el.date,
          "level": el.step_one ? JSON.parse(el.step_one).pain_level : '',
          "treatment": el.step_one ? JSON.parse(el.step_one).other_treatments : ''
        }
        return log
      }
    })
    setLogsExport(exportList)
    removeNull(exportList)
  }

  //remove any null/undefined entries from the above
  const removeNull = (exportList) => {
    exportList = exportList.filter(function(element){
      return element !== undefined
    })
    setLogsExport(exportList)
    firstTen(exportList)
    getDates(exportList)
    return exportList
  }

  //use ten most recent logs to populate graph
  const firstTen = (exportList) => {
    if(exportList.length <= 10){
      setLimited(exportList)
    }else{
      let firstTen = []
      for(var i = 0; i < 10; i++){
        firstTen.push(exportList[i])
      }
      setLimited(firstTen)
    }
  }

  //get just the dates from those logs for dropdown
  const getDates = (exportList) => {
    const datelist = exportList.map(el => {
      if(el !== null && el.length !== 0){
        let dates = {
          date: el.date
        }
        return dates
      }
    })
    const noDups = [...new Map(datelist.map(item => [JSON.stringify(item), item])).values()]
    setDates(noDups)
    setIsLoading(false)
  }

  //state change of first dropdown
  const handleDate1 = (e) => {
    setDate1(e.target.value)
  }

  //state change of second dropdown
  const handleDate2 = (e) => {
    setDate2(e.target.value)
  }

  //onClick to load logs in range of selected dates
  const onClick = (d1, d2, logs) => {
    if(d1 === 'default' || d2 === 'default'){
      alert ("Please provide a valid date")
      return
    }
    let dateRange = []
    var d1 = Date.parse(d1)
    var d2 = Date.parse(d2)
    logs.map(el => {
      var logDate = Date.parse(el.date)
      if(d1 <= logDate && logDate <= d2){
        dateRange.push(el)
      }else if(d2 <= logDate && logDate <= d1){
        dateRange.push(el)
      }
    })
    setLimited(dateRange)
  }

  const Emoji = props => (
    <span 
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}>
        {props.symbol}
      </span>
  );

  useEffect(() => {
    setIsLoading(true)
    getUser()
    if(user) getLogs()
  },[user])

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      let level = ""
      if (payload[0].value <= 1){
        level = "No Pain"
      }else if (payload[0].value <= 3){
        level = "Moderate Pain"
      }else{
        level = "Extreme Pain"
      }

      let treatments = []
      for(var i = 0; i < payload[0].payload.treatment.length; i ++){
        treatments.push(" " + payload[0].payload.treatment[i].name)
      }

      return (
        <div className="custom-tooltip">
          <p>{`${"Date"} : ${payload[0].payload.date}`}</p>
          <p>{`${"Pain Avg"} : ${payload[0].value} => ${level}`}</p>
          <p>{`${"Treatments Used"} : ${treatments.length !== 0 ? treatments : 'None'}`}</p>
        </div>
      )
    }
    return null;
  }

  return(
    <>
      <div className="user-container">
        <UserNav />
        <div className="user-body">
          <TopBar />
          <div className="captions">
            <h3><b>Pain Averaging Over Time</b></h3>
            <p>Here, you can review how much pain on average you have had because of your arthritis.</p>
            <p>The values on this graph are taken directly from your past sessions using the JIA Option Map.</p>
            <p>You can hover any point on the graph to see the date you put this information, the value you put, and the treatments you planned on that day!</p>
            <b className="spacing">From: To:</b>
            <br></br><br></br><br></br>
          </div>
          
          <div className="chooseTimes1">
            <select disabled={isLoading} onChange={handleDate1} >
              <option value='default'> -- Select a Date -- </option>
              {dates!==undefined && dates.length!==0 && dates.map((list) => <option key={list.date} value={list.date}>{list.date}</option>)}
            </select>
          </div>
        
          <div className="chooseTimes2">
            <select disabled={isLoading} onChange={handleDate2} >
              <option value='default'> -- Select a Date -- </option>
              {dates!==undefined && dates.length!==0 && dates.map((list) => <option key={list.date} value={list.date}>{list.date}</option>)}
            </select>
          </div>

          <div className="button">
            <Button className='load-btn' onClick={() => onClick(date1, date2, logsExport)}>Go!</Button>
          </div>

          <LineChart className="chart" width={1000} height={400} data={limited} margin={{ top: 5, right: 50, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" label={{value:'Date', position:"bottom", offset:0}} reversed/>
            <YAxis dataKey="level" tickCount={6} domain={[0,5]} label={{value:"Pain Average", position:"insideLeft", angle:-90}}/>
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="level" stroke="#296d98" />
            <ReferenceLine y={2.5} strokeDasharray="5 5" stroke="#000000"/>
            <ReferenceArea y1={0} y2={1.5} fill="#03c04a" opacity={0.2}/>
            <ReferenceArea y1={1.5} y2={3.5} fill="#effd5f" opacity={0.2}/>
            <ReferenceArea y1={3.5} y2={5} fill="#e3242b" opacity={0.2}/>
          </LineChart>

          <div className="legend">
            <h5><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Legend</b></h5>
            <div className="emojis">
              <Emoji symbol="😃"/><br></br><br></br>
              <Emoji symbol="😐"/><br></br><br></br>
              <Emoji symbol="😞"/><br></br>
            </div>
            <div className="levels">
              <h6>{`${'0-1 => No Pain'}`}</h6><br></br>
              <h6>{`${'2-3 => Moderate Pain'}`}</h6><br></br>
              <h6>{`${'4-5 => Extreme Pain'}`}</h6>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default PainAvg
