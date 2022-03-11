import React, {useState, useEffect} from 'react';
import Divider from '@material-ui/core/Divider';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

const FavsGraph = ({favs}) => {
  const [data, setData] = useState()

  useEffect(() => {
    if(favs) setData(favs)
  },[favs])

  return (
    <div className="graph-container">
      <h1>Most Favourited</h1>
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
          <Bar dataKey="count" fill="#0088FE" />
        </BarChart>
      }
    </div>
  )
}

export default FavsGraph
