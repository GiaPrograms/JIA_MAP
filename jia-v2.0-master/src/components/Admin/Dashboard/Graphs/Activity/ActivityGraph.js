import React, {useState, useEffect} from 'react';
import Divider from '@material-ui/core/Divider';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const ActivityGraph = ({data}) => {
  const [activity, setActivity] = useState()
  useEffect(() => {
    setActivity(data)
  }, [data])

  return (
    <div className="graph-container">
      <h1>Traffic</h1>
      <Divider />
      <LineChart
        width={1330}
        height={300}
        data={activity}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  )
}

export default ActivityGraph