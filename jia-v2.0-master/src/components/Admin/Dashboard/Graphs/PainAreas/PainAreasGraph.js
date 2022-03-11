import React, {useState, useEffect} from 'react'
import Divider from '@material-ui/core/Divider';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import "./PainAreasGraph.css"

const PainAreasGraph = ({data}) => {
  const [painAreas, setPainAreas] = useState()

  useEffect(() => {
    setPainAreas(data)
  }, [data])

  return (
    <div className="graph-container">
      <h1>Pain Areas</h1>
      <Divider />
      {painAreas && 
        <BarChart
          width={800}
          height={400}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      }
    </div>
  )
}

export default PainAreasGraph