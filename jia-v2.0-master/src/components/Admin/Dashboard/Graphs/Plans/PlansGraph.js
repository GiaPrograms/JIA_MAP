import React, {useState, useEffect} from 'react';
import Divider from '@material-ui/core/Divider';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

const PlansGraph = ({plans}) => {
  const [data, setData] = useState()

  useEffect(() => {
    if(plans) setData(plans)
  },[plans])

  return (
    <div className="graph-container">
      <h1>Most Planned</h1>
      <Divider />
      {data && 
        <BarChart
          width={600}
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
          <Bar dataKey="count" fill="#00C49F" />
        </BarChart>
      }
    </div>
  )
}

export default PlansGraph
