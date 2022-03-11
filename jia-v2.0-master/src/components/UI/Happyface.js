import React, {Component} from 'react'

export default class Happyface extends Component {

  render() {
    return (
        <div className="happyface">
          {this.props.happyFaceColor === "yellow" &&
          <svg id="happyFace" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.02 51.94"
               style={{minWidth: '42px', minHeight: '42px', padding: '2px'}}
          >
            <title>{`${this.props.score}/100`}</title>
            <style>
              {
                '.st0{fill:#FFCE07;stroke:#000000;stroke-width:0.75;stroke-miterlimit:10;}' +
                '.st1{fill:#ED1C24;stroke:#ED1C24;stroke-width:0.6695;stroke-miterlimit:10;}' +
                '.st2{fill:#FFFFFF;stroke:#000000;stroke-width:0.5;stroke-miterlimit:10;}' +
                '.st3{fill:#FFFFFF;}' +
                '.st4{fill:#FFFFFF;stroke:#000000;stroke-width:0.75;stroke-miterlimit:10;}' +
                '.st5{fill:#FFFFFF;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}'
              }
            </style>
            <g>
              <circle className="st0" cx="30.01" cy="25.97" r="19.79"/>
              <g>
                <path d="M30.01,42.14c-6.01,0-10.9-4.89-10.9-10.9v-0.6l0.59,0.11c3.52,0.67,7.1,1.01,10.65,1.01c6.02,0,9.89-1,9.93-1.01
            l0.63-0.16v0.65C40.91,37.25,36.02,42.14,30.01,42.14z"/>
                <path d="M40.41,31.24c0,5.74-4.66,10.4-10.4,10.4c-5.74,0-10.4-4.66-10.4-10.4c4.01,0.77,7.66,1.02,10.74,1.02
            C36.51,32.26,40.41,31.24,40.41,31.24 M41.41,29.94l-1.25,0.33c-0.04,0.01-3.87,0.99-9.81,0.99c-3.52,0-7.06-0.34-10.55-1.01
            l-1.19-0.23v1.21c0,6.29,5.11,11.4,11.4,11.4c6.29,0,11.4-5.11,11.4-11.4V29.94L41.41,29.94z"/>
              </g>
              <path className="st1" d="M30.01,36.79c-3.08,0-5.83,0.56-7.69,1.45c1.9,2.09,4.64,3.4,7.69,3.4s5.79-1.31,7.69-3.4
            C35.84,37.35,33.09,36.79,30.01,36.79z"/>
              <circle className="st2" cx="21.68" cy="21.08" r="5.29"/>
              <circle className="st3" cx="38.5" cy="20.82" r="5.29"/>
              <circle cx="21.68" cy="21.08" r="2.45"/>
              <circle className="st2" cx="38.5" cy="20.82" r="5.29"/>
              <circle cx="38.5" cy="20.82" r="2.45"/>
            </g>
            <g>
              <circle className="st4" cx="30.01" cy="82.91" r="19.79"/>
              <circle className="st2" cx="21.68" cy="78.02" r="5.29"/>
              <circle className="st3" cx="38.5" cy="77.76" r="5.29"/>
              <circle cx="21.68" cy="78.02" r="2.45"/>
              <circle className="st2" cx="38.5" cy="77.76" r="5.29"/>
              <circle cx="38.5" cy="77.76" r="2.45"/>
              <line className="st5" x1="22.78" y1="91.88" x2="37.25" y2="91.88"/>
            </g>
          </svg>
          }
          {this.props.happyFaceColor === "none" &&
            <svg id="sadFace" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.02 51.94"
                 style={{minWidth: '42px', minHeight: '42px', padding: '2px'}}
            >
              <title>{`${this.props.score}/100`}</title>
            <style>
            {
             '.st0{fill:#FFCE07;stroke:#000000;stroke-width:0.75;stroke-miterlimit:10;}' +
             '.st1{fill:#ED1C24;stroke:#ED1C24;stroke-width:0.6695;stroke-miterlimit:10;}' +
             '.st2{fill:#FFFFFF;stroke:#000000;stroke-width:0.5;stroke-miterlimit:10;}' +
             '.st3{fill:#FFFFFF;}' +
             '.st4{fill:#FFFFFF;stroke:#000000;stroke-width:0.75;stroke-miterlimit:10;}' +
             '.st5{fill:#FFFFFF;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}'
            }
            </style>
            <g>
            <circle className="st0" cx="30.01" cy="-30.97" r="19.79"/>
            <g>
            <path d="M30.01-14.8c-6.01,0-10.9-4.89-10.9-10.9v-0.6l0.59,0.11c3.52,0.67,7.1,1.01,10.65,1.01c6.02,0,9.89-1,9.93-1.01
            l0.63-0.16v0.65C40.91-19.69,36.02-14.8,30.01-14.8z"/>
            <path d="M40.41-25.7c0,5.74-4.66,10.4-10.4,10.4c-5.74,0-10.4-4.66-10.4-10.4c4.01,0.77,7.66,1.02,10.74,1.02
            C36.51-24.67,40.41-25.7,40.41-25.7 M41.41-26.99l-1.25,0.33c-0.04,0.01-3.87,0.99-9.81,0.99c-3.52,0-7.06-0.34-10.55-1.01
            l-1.19-0.23v1.21c0,6.29,5.11,11.4,11.4,11.4c6.29,0,11.4-5.11,11.4-11.4V-26.99L41.41-26.99z"/>
            </g>
            <path className="st1" d="M30.01-20.15c-3.08,0-5.83,0.56-7.69,1.45c1.9,2.09,4.64,3.4,7.69,3.4s5.79-1.31,7.69-3.4
            C35.84-19.59,33.09-20.15,30.01-20.15z"/>
            <circle className="st2" cx="21.68" cy="-35.85" r="5.29"/>
            <circle className="st3" cx="38.5" cy="-36.11" r="5.29"/>
            <circle cx="21.68" cy="-35.85" r="2.45"/>
            <circle className="st2" cx="38.5" cy="-36.11" r="5.29"/>
            <circle cx="38.5" cy="-36.11" r="2.45"/>
            </g>
            <g>
            <circle className="st4" cx="30.01" cy="25.97" r="19.79"/>
            <circle className="st2" cx="21.68" cy="21.08" r="5.29"/>
            <circle className="st3" cx="38.5" cy="20.82" r="5.29"/>
            <circle cx="21.68" cy="21.08" r="2.45"/>
            <circle className="st2" cx="38.5" cy="20.82" r="5.29"/>
            <circle cx="38.5" cy="20.82" r="2.45"/>
            <line className="st5" x1="22.78" y1="34.95" x2="37.25" y2="34.95"/>
            </g>
            </svg>

            }
        </div>
    )
  }
}



