import React, {useState, useEffect} from 'react'
import Divider from '@material-ui/core/Divider';
import {PieChart, Pie, Cell} from 'recharts';

import "./PurposeGraph.css"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PurposeGraph = ({data}) => {
  const [purposes, setPurposes] = useState()
  useEffect(() => {
    setPurposes(data)
  }, [data])
  return (
    <div className="graph-container">
      <h1>Login Purpose</h1>
      <Divider />
      {purposes && 
        <PieChart width={500} height={300}>
          <Pie
            data={purposes}
            cx={230}
            cy={150}
            innerRadius={100}
            outerRadius={120}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
            label
          >
            {purposes.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      }
      <div className="purpose-legend-container">
        {purposes && purposes.map((purpose, i) => (
          <div key={purpose.name} className="purpose-item-container" style={{borderLeft:`8px solid ${COLORS[i]}`}}>
            <div className="purpose-item">
              <h5>{purpose.name}</h5>
              <p>{purpose.value}</p>
            </div>
            <Divider variant="inset"/>
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default PurposeGraph