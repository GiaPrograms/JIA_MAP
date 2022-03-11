import React, {useState, useEffect}  from 'react'
import PurposeGraph from './Graphs/Purpose/PurposeGraph'
// import PainAreasGraph from './Graphs/PainAreas/PainAreasGraph'
import FavsGraph from './Graphs/Favs/FavsGraph'
import PlansGraph from './Graphs/Plans/PlansGraph'
import ActivityGraph from './Graphs/Activity/ActivityGraph'

import "./Content.css"
import {getRequest} from '../../../API/ApiHandler'

const Content = () => {
  const [purpose, setPurpose] = useState()
  const [activity, setActivity] = useState()
  // const [painAreas, setPainAreas] = useState()
  const [favs, setFavs] = useState()
  const [plans, setPlans] = useState()

  const getLogs = async() => {
    let data = await getRequest("/logs")
    if(data){
      let purposeList = data.map(log => log.purpose)
      let counts = {}

      for (let i = 0; i < purposeList.length; i++) {
        let num = purposeList[i];
        counts[num] = counts[num] ? counts[num] + 1 : 1;
      }

      let updatedList = []
      for(let key in counts) {
        updatedList.push({name: key, value: counts[key]})
      }
      setPurpose(updatedList)

      let updatedLog = data.map(log => {
        const options = {day: 'numeric', month: 'short'}
        const date = new Date(log.createdAt).toLocaleDateString('en-CA', options)
        log.date = date
        return log
      })

      let dateActivity = updatedLog.map(log => log.date)
      let logsPerDay = {}
      for (let i = 0; i < dateActivity.length; i++) {
        let num = dateActivity[i];
        logsPerDay[num] = logsPerDay[num] ? logsPerDay[num] + 1 : 1;
      }
      let updatedLogsPerDay = []
      for(let key in logsPerDay) {
        updatedLogsPerDay.push({date: key, value: logsPerDay[key]})
      }
      setActivity(updatedLogsPerDay)
    }
  }

  // const getPainAreas = async() => {
  //   let headers = new Headers()
  //   headers.append('Content-Type', 'application/json;charset=UTF-8')
  //   headers.append('Authorization', `Bearer ${token}`)

  //    let painAreas = [{name: 'ankles'}, {name: 'elbows'}, {name: 'hips'}, {name: 'jaw'}, {name: 'knees'}, {name: 'lower_back'}, {name: 'shoulders',}, {name: 'wrists'}]

  //   Promise.all(painAreas.map(area => {
  //     const url = `${baseUrl}/painAreas/count/${area.name}`
  //     const req = new Request(url, {
  //       headers: headers,
  //       method: 'GET',
  //       mode: 'cors'
  //     })
  //     return fetch(req)
  //   }))
  //   .then(responses =>
  //     Promise.all(
  //       responses.map(res => {
  //         if (res.ok) {
  //           return res.json()
  //         }
  //         return Promise.reject(res)
  //       })
  //     )
  //   )
  //   .then(data => setPainAreas(data))
  //   .catch(console.error)
  // }

  const getFavourites = async() => {
    let data = await getRequest("/userFavourites")
    if(data) {
      const favs = data.map(el => el.favourite).flat().map(el => el.name)
      let favsCount = {}
      favs.forEach(el => { favsCount[el] = (favsCount[el] || 0)+1; })
     
      let list = []
      for(let i in favsCount) {
        list.push({name: i, count: favsCount[i]})
      }
      setFavs(list.slice(0, 5))
    }
  }

  const getPlans = async() => {
    let data = await getRequest("/userPlans")
    if(data) {
      const plans = data.map(el => el.plan).flat().map(el => el.name)
      let plansCount = {}
      plans.forEach(el => { plansCount[el] = (plansCount[el] || 0)+1; })
      let list = []
      for(let i in plansCount) {
        list.push({name: i, count: plansCount[i]})
      }
      setPlans(list.slice(0, 5))
    }
  }

  useEffect(() => {
    getLogs()
   // getPainAreas()
    getFavourites()
    getPlans()
  }, [])

  return(
    <div className="dashboard-wrapper">
      <ActivityGraph 
        data={activity}
      />
      <PurposeGraph 
        data={purpose}
      />
      {/* <PainAreasGraph 
        data={painAreas}
      /> */}
      <FavsGraph
         favs={favs}
      />
      <PlansGraph
        plans={plans}
      />
    </div>
  )
}

export default Content