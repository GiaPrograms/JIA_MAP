import React, {Component} from 'react';
import {Col, Row} from "reactstrap";
import {getRequest} from "../../API/ApiHandler"

export default class HumansvgTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jaw: false,
      wrists: false,
      elbows: false,
      shoulders: false,
      ankles: false,
      knees: false,
      hips: false,
      lower_back: false,
      neck: false,
      fingers: false,
      toes:false,
    }
  }

  /**
   * Get stored body parts from local storage
   * Set any stored body parts as active
   * setPartStatus function is called to switch the current state of the part to true
   **/
  async componentDidMount() {
    let painAreas = await getRequest(`/painAreas/user`)
    if(painAreas) {
      for(let part in painAreas.data) {
        if(painAreas.data[part] === true) {
          let domPart = document.querySelector(`#${part}`);
            domPart.setAttribute("data-selected", true);
            domPart.classList.add("part");
            this.setState({[part]: true})
        } else {
          this.setState({[part]: false})
        }
      }
    } 

    this.props.setPainAreas({
      jaw: this.state.jaw,
      wrists: this.state.wrists,
      elbows: this.state.elbows,
      shoulders: this.state.shoulders,
      ankles: this.state.ankles,
      knees: this.state.knees,
      hips: this.state.hips,
      lower_back: this.state.lower_back,
      neck: this.state.neck,
      fingers: this.state.fingers,
      toes:this.state.toes,
    })
  }

  /**
   * @Summary Handles updating local and parent state when body area is clicked.
   * @param {string} ev is the clicked on area, used to get the part name
   * setPainAreas is the passed state.
   * part values is true/false
   **/
  partClicked = ev => {
    let part = ev.target.id
    let selected = ev.target.getAttribute("data-selected");
    let value = false

    if(selected){
      ev.target.removeAttribute("data-selected")
      ev.target.classList.remove("part")
      value = false
    } else {
      ev.target.setAttribute("data-selected", true);
      ev.target.classList.add("part");
      value = true
    }

    this.setState({[part]: value}, () => {
      this.props.setPainAreas({
        jaw: this.state.jaw,
        wrists: this.state.wrists,
        elbows: this.state.elbows,
        shoulders: this.state.shoulders,
        ankles: this.state.ankles,
        knees: this.state.knees,
        hips: this.state.hips,
        lower_back: this.state.lower_back,
        neck:this.state.neck,
        fingers:this.state.fingers,
        toes:this.state.toes,

      })
    })
    this.props.setSaved(false)
    this.props.setSaveStatus('default')
  }
  
  render() {
    return (
        <div className="body-parts-container">
          <Row>
            <Col className="text-center">
              <svg id="Front" x={0} y={0} viewBox="0 0 1125 1354" xmlSpace="preserve">
                <style>
                  {
                    ".bParts{stroke-linecap:round;stroke-linejoin:round}.bParts,.prefix__st1,.prefix__st2{fill:none;stroke:#e75b27;stroke-width:4.8948;stroke-miterlimit:10}.prefix__st2{stroke:#10434f;stroke-width:2.4474;stroke-linecap:round;stroke-linejoin:round}.prefix__st3{fill:#10434f}.prefix__st4{font-family:'Roboto-Regular'}.prefix__st5{font-size:41.1997px}"
                  }
                </style>
                <g id="prefix__linesFront">

                <path
                      id="prefix__lines8"
                      className="prefix__st4"
                      d="M480.2 1180.8l-59.9 10.8H189.3"
                  />


                <path
                      id="prefix__lines7"
                      className="prefix__st4"
                      d="M770 730.6l55.3-46.1h213.4"
                  />

                  <path
                      id="prefix__lines6"
                      className="prefix__st4"
                      d="M410.2 353.8l-50-52.2H146.9"
                  />
                  <path
                      id="prefix__lines5"
                      className="prefix__st4"
                      d="M332.8 628.2l-44.3-46.3H75.1"
                  />
                  <path
                      id="prefix__lines4"
                      className="prefix__st4"
                      d="M462.5 958.8l-59.9 114.8H189.3"
                  />
                  <path
                      id="prefix__lines3"
                      className="prefix__st4"
                      d="M662 702.7l41.6 85.8h215.5"
                  />
                  <path
                      id="prefix__lines2"
                      className="prefix__st4"
                      d="M665.6 1057.9l44.4-46.3h213.3"
                  />
                  <path
                      id="prefix__lines1"
                      className="prefix__st4"
                      d="M625.9 254.6l44.3-46.3h213.4"
                  />
                </g>
                <g id="prefix__front">
                  <path
                      className="prefix__st2"
                      d="M791.3 701c-20.5-16.4-20.7-37.8-46-43-7.3-16-8.5-63.1-8.5-63.1s1-54.3-15.7-76.7c0 0-1.5-41.6-9.1-57.1.3-13 3.4-67.5-11.4-87.6-21-28.4-54-25-60.6-26s-36.1-13.4-43.7-23.8c-3-9.9-2.8-31.3-2.8-31.3s10.7-6.4 10.6-32.3c9.1 1.4 11-7.9 11.4-14.6.8-5.4 6.4-16.3-6.9-16.3 1.2-9.2 2.3-41.8-7.5-50.8-10.3-9.4-28.1-9-38.4-9.4-10.3.5-28.9 0-39.2 9.4-9.8 8.9-8.6 41.6-7.5 50.8-13.3 0-7.7 10.9-6.9 16.3.4 6.7 2.3 16 11.4 14.6-.1 25.9 10.6 32.3 10.6 32.3s.3 21.4-2.8 31.3c-7.6 10.4-37.1 22.8-43.7 23.8s-39.6-2.4-60.6 26c-14.8 20-11.7 74.6-11.4 87.6-7.5 15.4-9.1 57.1-9.1 57.1-16.8 22.5-15.7 76.7-15.7 76.7s-.8 47.1-8.1 63.1c-25.3 5.2-25.5 26.6-46 43 8 8.4 26.2-8.1 26.2-8.1s-4.4 33.4-2.5 50.7c1.2 14.3 7.8 10.3 7.8 10.3-.6 7.9 7.5 12.5 12.7 4.4 3.3 4.2 10.9 2.4 13-10.8 4.3 5.4 8.6 1.8 11.2-7.1 8.1-30.1 6.4-72.7 6.4-72.7 9.7-34.9 45.2-88.9 48.3-146.5 6.2-22.8 10-42.6 10-42.6s9.4 34.7 14.6 41.4c.1 16.7 1.7 69.2 1.7 69.2-12.8 26.1-9.6 34.1-11.5 50.2-3.8 17.1-11 58.3-7.4 101.3 1.4 31.1-4.7 80.5 31.3 148.8 0 0-.5 12.3-.8 33.9 1.8-3.4-14.7 26.5-10.4 62.4 2.8 23 27.4 102.4 29.4 131.6.7 6.6-4.3 12.9-6.5 18.3-2.4 5.8-2.4 9.6-2.6 15.7-6 5.1-14.5 22.4-20.3 26.2-6.7 5.4-8 14.1-1.6 14.1h52.8c20.9 0 9.6-29.2 9.6-29.2s-2.7-33.4-4.5-42.4c-3.1-9.9 11.5-113.7 10-133-1.2-15.1-6.7-49-11.6-57.5 2.1-12.9 2.8-36.1 2.4-47.5 11-25.7 12-156.9 12-156.9s2.4 3.3 9 2.9c6.6.4 9-2.9 9-2.9s.9 131.2 12 156.9c-.5 11.3.2 34.6 2.4 47.5-4.9 8.4-10.4 42.3-11.6 57.5-1.5 19.3 13.1 123 10 133-1.8 9-4.5 42.4-4.5 42.4s-11.2 29.2 9.6 29.2h52.8c6.5 0 5.1-8.7-1.6-14.1-5.8-3.8-14.3-21-20.3-26.2-.1-6.1-.2-9.9-2.6-15.7-2.3-5.5-7.3-11.8-6.5-18.3 1.9-29.1 26.6-108.6 29.4-131.6 4.3-35.9-12.2-65.7-10.4-62.4-.2-21.6-.8-33.9-.8-33.9 36.1-68.3 29.9-117.7 31.3-148.8 3.6-42.9-3.6-84.1-7.4-101.3-2-16.1 1.2-24.1-11.5-50.2 0 0 1.6-52.4 1.7-69.2 5.1-6.7 14.6-41.4 14.6-41.4s3.8 19.8 10 42.6c3.1 57.6 38.6 111.6 48.3 146.5 0 0-1.6 42.7 6.4 72.7 2.6 8.9 6.9 12.5 11.2 7.1 2.1 13.2 9.7 15 13 10.8 5.2 8.1 13.3 3.5 12.7-4.4 0 0 6.6 4.1 7.8-10.3 1.9-17.3-2.5-50.7-2.5-50.7s18.4 16.5 26.4 8.1z"
                  />
                  <path
                      className="prefix__st2"
                      d="M495.3 901.4c4.9 6.8 3.9 29 19.6 29 10.9 0 11.4-4.8 13.2-10.6s9.8-32.3 13.5-37.4M467 478.5s-4.6-69.2-1-76.9c3-8.1 9.2-14.7 9.2-14.7M555.5 576s3.2-4.8 7-5.5M369.9 714.4s-1.4 35.2-4.7 39.4M378 758.3c4-22.8 4-42 4-42M391 747.5c1.8-12.8 3.7-31.2 3.7-31.2M364.3 711.7c1 2.7 25.6 6 36.2 3.6M379.7 658s9 2.5 10.5 5.4M658 478.5s4.6-69.2 1-76.9c-3-8.1-9.2-14.7-9.2-14.7M569.5 576s-3.2-4.8-7-5.5M629.7 901.4c-4.9 6.8-3.9 29-19.6 29-10.9 0-11.4-4.8-13.2-10.6s-9.8-32.3-13.5-37.4M755.1 714.4s1.4 35.2 4.7 39.4M747 758.3c-4-22.8-4-42-4-42M734 747.5c-1.8-12.8-3.7-31.2-3.7-31.2M760.7 711.7c-1 2.7-25.6 6-36.2 3.6M745.3 658s-9 2.5-10.5 5.4M721.1 518.1s-2.9-2.2-9-2M403.9 518.1s2.9-2.2 9-2"
                  />
                  <text
                      transform="translate(146.853 293.008)"
                      className="prefix__st1 prefix__st2 prefix__st3"
                  >
                    {localStorage.getItem("language") === "English" ? 'shoulders' : 'épaules'}
                  </text>
                  <text
                      transform="translate(75.126 573.358)"
                      className="prefix__st1 prefix__st2 prefix__st3"
                  >
                    {localStorage.getItem("language") === "English" ? 'wrists' : 'poignets'}
                  </text>
                  <text
                      transform="translate(189.271 1065.678)"
                      className="prefix__st1 prefix__st2 prefix__st3"
                  >
                    {localStorage.getItem("language") === "English" ? 'knees' : 'genoux'}
                  </text>
                  <text
                      transform="translate(835.379 779.549)"
                      className="prefix__st1 prefix__st2 prefix__st3"
                  >
                    {localStorage.getItem("language") === "English" ? 'hips' : 'hanches'}
                  </text>
                  <text
                      transform="translate(799.776 1003.044)"
                      className="prefix__st1 prefix__st2 prefix__st3"
                  >
                    {localStorage.getItem("language") === "English" ? 'ankles' : 'chevilles'}
                  </text>
                  <text
                      transform="translate(807.467 199.707)"
                      className="prefix__st1 prefix__st2 prefix__st3"
                  >
                    {localStorage.getItem("language") === "English" ? 'jaw' : 'mâchoire'}
                  </text>

                  <text
                      transform="translate(900 670)"
                      className="prefix__st1 prefix__st2 prefix__st3"
                  >
                    {localStorage.getItem("language") === "English" ? 'fingers' : 'doigts'}
                  </text>

                  <text
                      transform="translate(200 1180)"
                      className="prefix__st1 prefix__st2 prefix__st3"
                  >
                    {localStorage.getItem("language") === "English" ? 'toes' : 'orteils'}
                  </text>


                </g>

                <g id="prefix__shoulders">
                  <circle onClick={this.partClicked} pointerEvents="visible"
                          id="shoulders"
                          className="bParts shoulders"
                          cx={464.6}
                          cy={386.9}
                          r={63.4}
                  />
                </g>
                <g id="prefix__jaw">
                  <circle onClick={this.partClicked} pointerEvents="visible"
                          id="jaw"
                          className="bParts jaw"
                          cx={562.5}
                          cy={252.2}
                          r={63.4}
                  />
                </g>
                <g id="prefix__wrists">
                  <circle onClick={this.partClicked} pointerEvents="visible"
                          id="wrists"
                          className="bParts wrists"
                          cx={394.6}
                          cy={642.4}
                          r={63.4}
                  />
                </g>
                <g id="prefix__knees">
                  <circle onClick={this.partClicked} pointerEvents="visible"
                          id="knees"
                          className="bParts knees"
                          cx={509.1}
                          cy={918.6}
                          r={63.4}
                  />
                </g>
                <g id="prefix__ankles">
                  <circle onClick={this.partClicked} pointerEvents="visible"
                          id="ankles"
                          className="bParts ankles"
                          cx={611.3}
                          cy={1092}
                          r={63.4}
                  />
                </g>
                <g id="prefix__hips">
                  <circle onClick={this.partClicked} pointerEvents="visible"
                          id="hips"
                          className="bParts hips"
                          cx={633.6}
                          cy={646}
                          r={63.4}
                  />
                </g>


                <g id="prefix__fingers">
                  <circle onClick={this.partClicked} pointerEvents="visible"
                          id="fingers"
                          className="bParts fingers"
                          cx={750}
                          cy={750}
                          r={30}
                  />
                </g>


                <g id="prefix__toes">
                  <circle onClick={this.partClicked} pointerEvents="visible"
                          id="fingers"
                          className="bParts toes"
                          cx={500}
                          cy={1170}
                          r={30}
                  />
                </g>



              </svg>
            </Col>
            <Col className="text-center">
              <svg id="Back" x={0} y={0} viewBox="0 0 1125 1354" xmlSpace="preserve">
                <style>
                  {
                    ".prefix__st0{fill:none;stroke:#10434f;stroke-width:2.4474;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}.prefix__st1{fill:#10434f}.prefix__st2{font-family:'Roboto-Regular'}.prefix__st3{font-size:41.1997px}.prefix__st4,.prefix__st5{fill:none;stroke:#ef4136;stroke-width:4.8947;stroke-miterlimit:10}.prefix__st5{stroke-linecap:round;stroke-linejoin:round}"
                  }
                </style>
                <path
                    className="prefix__st0"
                    d="M770.6 650.4c-20.5-16.4-20.7-37.8-46-43-7.3-16-8.5-63.1-8.5-63.1s1-54.3-15.7-76.7c0 0-1.5-41.6-9.1-57.1.3-13 3.4-67.5-11.4-87.6-21-28.4-54-25-60.6-26s-36.1-13.4-43.7-23.8c-3-9.9-2.8-31.3-2.8-31.3s10.7-6.4 10.6-32.3c9.1 1.4 11-7.9 11.4-14.6.8-5.4 6.4-16.3-6.9-16.3 1.2-9.2 2.3-41.8-7.5-50.8-10.3-9.4-28.1-9-38.4-9.4-10.3.5-28.9 0-39.2 9.4-9.8 8.9-8.6 41.6-7.5 50.8-13.3 0-7.7 10.9-6.9 16.3.4 6.7 2.3 16 11.4 14.6-.1 25.9 10.6 32.3 10.6 32.3s.3 21.4-2.8 31.3c-7.6 10.4-37.1 22.8-43.7 23.8s-39.6-2.4-60.6 26c-14.8 20-11.7 74.6-11.4 87.6-7.5 15.4-9.1 57.1-9.1 57.1-16.8 22.5-15.7 76.7-15.7 76.7s-1.2 47.1-8.5 63.1c-25.3 5.2-25.5 26.6-46 43 8 8.4 26.2-8.1 26.2-8.1s-4.4 33.4-2.5 50.7c1.2 14.3 7.8 10.3 7.8 10.3-.6 7.9 7.5 12.5 12.7 4.4 3.3 4.2 10.9 2.4 13-10.8 4.3 5.4 8.6 1.8 11.2-7.1 8.1-30.1 6.4-72.7 6.4-72.7 9.7-34.9 45.2-88.9 48.3-146.5 6.2-22.8 10-42.6 10-42.6s9.4 34.7 14.6 41.4c.1 16.7 1.7 69.2 1.7 69.2-12.8 26.1-9.6 34.1-11.5 50.2-3.8 17.1-11 58.3-7.4 101.3 1.4 31.1-4.7 80.5 31.3 148.8 0 0-.5 12.3-.8 33.9 1.8-3.4-14.7 26.5-10.4 62.4 2.8 23 27.4 102.4 29.4 131.6.7 6.6-4.3 12.9-6.5 18.3-2.4 5.8-2.4 9.6-2.6 15.7-6 5.1-14.5 22.4-20.3 26.2-6.7 5.4-8 14.1-1.6 14.1h52.8c20.9 0 9.6-29.2 9.6-29.2s-2.7-33.4-4.5-42.4c-3.1-9.9 11.5-113.7 10-133-1.2-15.1-6.7-49-11.6-57.5 2.1-12.9 2.8-36.1 2.4-47.5 11-25.7 11.5-158.6 11.5-158.6s9.4-3.5 9.4-22.8c0 19.4 9 23.1 9 23.1s.9 132.6 11.9 158.3c-.5 11.3.2 34.6 2.4 47.5-4.9 8.4-10.4 42.3-11.6 57.5-1.5 19.3 13.1 123 10 133-1.8 9-4.5 42.4-4.5 42.4s-11.2 29.2 9.6 29.2h52.8c6.5 0 5.1-8.7-1.6-14.1-5.8-3.8-14.3-21-20.3-26.2-.1-6.1-.2-9.9-2.6-15.7-2.3-5.5-7.3-11.8-6.5-18.3 1.9-29.1 26.6-108.6 29.4-131.6 4.3-35.9-12.2-65.7-10.4-62.4-.2-21.6-.8-33.9-.8-33.9 36.1-68.3 29.9-117.7 31.3-148.8 3.6-42.9-3.6-84.1-7.4-101.3-2-16.1 1.2-24.1-11.5-50.2 0 0 1.6-52.4 1.7-69.2 5.1-6.7 14.6-41.4 14.6-41.4s3.8 19.8 10 42.6c3.1 57.6 38.6 111.6 48.3 146.5 0 0-1.6 42.7 6.4 72.7 2.6 8.9 6.9 12.5 11.2 7.1 2.1 13.2 9.7 15 13 10.8 5.2 8.1 13.3 3.5 12.7-4.4 0 0 6.6 4.1 7.8-10.3 1.9-17.3-2.5-50.7-2.5-50.7s19 16.5 27 8.1zM573 675.8s-14 2.8-22.2-2.7M510.1 675.6s14 2.8 22.2-2.7M446.2 427.9s-5.5-52.5-6.7-56M391.8 497.1s6.8 7 16.9 2.4M435.8 375c3.7-2 12-10.5 12.9-13.8M529.8 362.5s9.6 38.5-13 54.9M346.8 656.4c3.8 1.6 1 42.6-2.3 46.9"
                />
                <path
                    className="prefix__st0"
                    d="M357.2 707.7c4-22.8 4-42 4-42s-.1-2.6 2.1-4.2M370.2 696.9c1.8-12.8 3.7-31.2 3.7-31.2s.7-4.4 2.9-4.9M474.1 872.6s10.6-17.7 10-22.5M518.4 878.9s-7.5-12.4-10.9-24M520.8 831.5s-3.5 4.6-6.4 6.2M474.9 838.7s2.7 2.5 4.2 2.5M495.5 178.7s8.4 12.6 8.2 26.5c-.2 13.9 8.5 25.3 10.5 27.3 1.9 2 10.6 5.8 27.9 5.5M637.3 427.9s5.5-52.5 6.7-56M691.7 497.1s-6.8 7-16.9 2.4M647.7 375c-3.7-2-12-10.5-12.9-13.8M553.7 362.5s-9.6 38.5 13 54.9M736.7 656.4c-3.8 1.6-1 42.6 2.3 46.9M726.3 707.7c-4-22.8-4-42-4-42s.1-2.6-2.1-4.2M713.3 696.9c-1.8-12.8-3.7-31.2-3.7-31.2s-.3-4.2-2.9-4.9M609.4 872.6s-10.6-17.7-10-22.5M565.1 878.9s7.5-12.4 10.9-24M562.7 831.5s3.5 4.6 6.4 6.2M608.6 838.7s-2.7 2.5-4.2 2.5"
                />
                <path
                    className="prefix__st0"
                    d="M586.8 178.5s-8.4 12.6-8.2 26.5-8.5 25.3-10.5 27.3c-1.9 2-8.9 6-26.2 5.7"
                />

                  

                <text
                    transform="translate(877.942 427.289)"
                    className="prefix__st1 prefix__st2 prefix__st3"
                >
                  {localStorage.getItem("language") === "English" ? 'elbows' : 'coudes'}
                </text>
                <text
                    transform="translate(725.442 794.029)"
                    className="prefix__st1 prefix__st2 prefix__st3"
                >
                  {localStorage.getItem("language") === "English" ? 'lower Back' : 'bas du dos'}
                </text>



                <text
                    transform="translate(770 190)"
                    className="prefix__st1 prefix__st2 prefix__st3"
                >
                  {localStorage.getItem("language") === "English" ? 'neck' : 'cou'}
                </text>



                <g id="prefix__lines">


                  <path
                      id="prefix__lines03"
                      className="prefix__st4"
                      d="M600 250.2l44.3-46.3h213.4"
                  />

                  <path
                      id="prefix__lines02"
                      className="prefix__st4"
                      d="M586.9 621.8l72 180.7h279.6"
                  />
                  <path
                      id="prefix__lines01"
                      className="prefix__st4"
                      d="M752.5 482.2l44.3-46.3h213.4"
                  />

                  

                </g>
                <g id="prefix__elbows">
                  <circle onClick={this.partClicked} pointerEvents="visible"
                          id="elbows"
                          className="bParts elbows"
                          cx={692.4}
                          cy={501.6}
                          r={63.4}
                  />
                </g>
                <g id="prefix__lowerBack">
                  <ellipse onClick={this.partClicked} pointerEvents="visible"
                           id="lower_back"
                           transform="rotate(-45.001 541.796 577.409)"
                           className="bParts lower-Back"
                           cx={541.8}
                           cy={577.4}
                           rx={63.4}
                           ry={63.4}
                  />
                </g>

                <g id="prefix__neck">
                  <ellipse onClick={this.partClicked} pointerEvents="visible"
                           id="neck"
                           className="bParts neck"
                           cx={540}
                           cy={260}
                           rx={63.4}
                           ry={63.4}
                  />
                </g>



              </svg>
            </Col>
          </Row>
        </div>
    )
  }
}
