import React, {Component} from 'react'

export default class Star extends Component{

    render(){
        return(
            <React.Fragment>
              {this.props.starShape === "filled" &&
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
                   style={{minWidth: '37px', maxHeight: '47px', padding: '3px'}}>
                <title>Star</title>
                <g id="star">
                  <path className="cls-1"
                        style={{fill: this.props.starColor, strokeWidth: this.props.starStroke}}
                        d="M51.7,8.27,64.1,33.41a1.89,1.89,0,0,0,1.43,1l27.73,4a1.89,1.89,0,0,1,1,3.23L74.24,61.27a1.86,1.86,0,0,0-.54,1.67l4.73,27.63a1.89,1.89,0,0,1-2.74,2l-24.81-13a1.89,1.89,0,0,0-1.76,0l-24.81,13a1.89,1.89,0,0,1-2.74-2L26.3,62.94a1.86,1.86,0,0,0-.54-1.67L5.69,41.7a1.89,1.89,0,0,1,1-3.23l27.73-4a1.89,1.89,0,0,0,1.43-1L48.3,8.27A1.9,1.9,0,0,1,51.7,8.27Z"/>
                </g>
              </svg>
              }
              {this.props.starShape === "empty" &&
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
                   style={{minWidth: '37px', maxHeight: '47px', padding: '3px'}}>
                <title>Star</title>
                <g id="star">
                  <path className="cls-1"
                        style={{fill: '#FFF', strokeWidth: this.props.starStroke, stroke:"#FFCE07"}}
                        d="M51.7,8.27,64.1,33.41a1.89,1.89,0,0,0,1.43,1l27.73,4a1.89,1.89,0,0,1,1,3.23L74.24,61.27a1.86,1.86,0,0,0-.54,1.67l4.73,27.63a1.89,1.89,0,0,1-2.74,2l-24.81-13a1.89,1.89,0,0,0-1.76,0l-24.81,13a1.89,1.89,0,0,1-2.74-2L26.3,62.94a1.86,1.86,0,0,0-.54-1.67L5.69,41.7a1.89,1.89,0,0,1,1-3.23l27.73-4a1.89,1.89,0,0,0,1.43-1L48.3,8.27A1.9,1.9,0,0,1,51.7,8.27Z"/>
                </g>
              </svg>
              }
            </React.Fragment>
        )}
}
