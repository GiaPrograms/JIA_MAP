import React, {useState, useEffect} from 'react'
import '../Questionnaire/partscss.css'

const TrafficLight = ({level}) => {
  const [red, setRed] = useState(false)
  const [yellow, setYellow] = useState(false)
  const [green, setGreen] = useState(false)

  useEffect(() => {
    let description = document.querySelector("#traffic_and_description");
    switch (level) {
      case 1:
        setGreen(true)
        description.style.backgroundColor =  "#81be33";
        break;
      case 2:
        setYellow(true)
        description.style.backgroundColor =  "#FCB41A";
        break;
      case 3:
        setRed(true)
        description.style.backgroundColor =  "#ff615d";
        break;
      default:
        break;
    }
  },[level])

  return (
      <div id="trafficLight">
        <svg xmlns="http://www.w3.org/2000/svg" className="trafficLight_svg" viewBox="0 0 290 273">
          <style>
            {
              '.white-fill{fill:#FFFFFF;stroke:#1A1818;stroke-width:6.82;stroke-linejoin:round;}' +
              '.light-circle{fill:#AEB0B3;stroke:#1A1818;stroke-width:6.82;stroke-linejoin:round;}' +
              '.no-colour{fill:none;stroke:#1A1818;stroke-width:5;stroke-linejoin:round;}'
            }
          </style>
          <g id="prefix__Group_342" transform="translate(1874.2 -1331.172)">
            <path className="white-fill" d="M-1834.41 1384.29h72.89v206.54h-72.89z"/>
            <path className="white-fill" d="M-1823.77 1370.93h50.72v13.36h-50.72z"/>
            {!red &&
            <circle className="light-circle" cx={-1797.96} cy={1427.33} r={24.91}/>
            }
            {red &&
            <circle id="red-light" className="light-circle" cx={-1797.96} cy={1427.33} r={24.91}/>
            }
            {!yellow &&
            <circle className="light-circle" cx={-1798.41} cy={1487.56} r={24.91}/>
            }
            {yellow &&
            <circle id="yellow-light" className="light-circle" cx={-1798.41} cy={1487.56} r={24.91}/>
            }
            {!green &&
            <circle className="light-circle" cx={-1797.96} cy={1547.78} r={24.91}/>
            }
            {green &&
            <circle id="green-light" className="light-circle" cx={-1797.96} cy={1547.78} r={24.91}/>
            }

            <path className="white-fill" d="M-1834.4 1572.69h-12.02l-14.36-49.81h26.39v49.81z"/>
            <path className="white-fill" d="M-1834.4 1512.46h-12.02l-14.36-49.81h26.39v49.81z"/>
            <path className="white-fill" d="M-1834.4 1402.43h-26.39l14.36 49.81h12.02v-49.81z"/>
            <path className="white-fill" d="M-1761.51 1572.69h12.02l14.36-49.81h-26.39v49.81z"/>
            <path className="white-fill" d="M-1761.51 1512.46h12.02l14.36-49.81h-26.39v49.81z"/>
            <path className="white-fill" d="M-1761.51 1452.24h12.02l14.36-49.81h-26.39v49.81z"/>
          </g>
        </svg>
      </div>
  )
  
}

export default TrafficLight