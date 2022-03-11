import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import "./Header.css"
import TranslateButton from "../../components/UI/TranslateButton";
import logo from '../../img/logo.png';
import { Button } from "reactstrap";
import { NavLink as RRNav } from "react-router-dom";

//Get value of language from local storage
let lang = localStorage.getItem("language")

export default class Header extends Component{
  handleClick(ev, link){
    ev.preventDefault()
    this.props.handleNav(link)
    this.props.setNavTo(link)
  }

  render(){
    return(
      <div>
        {(this.props.current.match.path === "/home" || this.props.current.match.path === "/notice") &&
          <div className='home-header'>
            <div className="home-logo-header">
              <NavLink to="/home"><img className="logo-home" alt="logo" src={logo}/></NavLink>
              <div>
                <div className="home-logo-header-translation"> <TranslateButton/> </div>
              </div>
            </div>
            <div className='sub-header'>
              <div className="home-subheader-content">
                <h3>{lang === "English" ? "Managing Pain in Juvenile Idiopathic Arthritis" : "Prendre en charge la douleur associée à l’arthrite juvénile idiopathique"}</h3>
                {/* <Button className="newnext-btn" tag={RRNav} to="/intro">
                  Next
                </Button> */}
              </div>
            </div>
          </div>
        }
        <div className="header">
        {(this.props.current.match.path !== "/home" && this.props.current.match.path !== "/notice") &&
        <div>
          <ul className="tab-nav-header">
            <div className="tab-steps">
              <NavLink className="tab-nav-header-item" to="/home">
                <img className="logo-link" alt="logo" src={logo}/>
              </NavLink>
              <NavLink className="tab-nav-header-item tab-nav-header-navlink" to='/questionnaire' onClick={(ev)=>this.handleClick(ev, "/questionnaire")}>
                <p>{lang === "English" ? "Pain & treatments" : "Douleur et traitements"}</p>
                <div className="tab-navlink-div">
                  <h2>1</h2>
                </div>
              </NavLink>
              <NavLink className="tab-nav-header-item tab-nav-header-navlink" to='/whats-important-to-you' onClick={(ev)=>this.handleClick(ev, "/whats-important-to-you")}>
                <p>{lang === "English" ? "What's important" : "Ce qui est important pour vous"}</p>
                <div className="tab-navlink-div">
                  <h2>2</h2>
                </div>
              </NavLink>

              {this.props.current.match.path === "/treatment-details/:treatment" ? 
                <NavLink className="tab-nav-header-item tab-nav-header-navlink" to='/treatment-details' onClick={(ev)=>this.handleClick(ev, "/review-and-select")}>
                  <p>{lang === "English" ? "Review & select" : "Réviser et sélectionner"}</p>
                  <div className="tab-navlink-div">
                    <h2>3</h2>
                  </div>
                </NavLink>
              
              :

                <NavLink className="tab-nav-header-item tab-nav-header-navlink" to='/review-and-select' onClick={(ev)=>this.handleClick(ev, "/review-and-select")}>
                  <p>{lang === "English" ? "Review & select" : "Réviser et sélectionner"}</p>
                  <div className="tab-navlink-div">
                    <h2>3</h2>
                  </div>
                </NavLink>
              
              }

              <NavLink className="tab-nav-header-item tab-nav-header-navlink" to='/make-your-plan' onClick={(ev)=>this.handleClick(ev, "/make-your-plan")}>
                <p>{lang === "English" ? "Plan" : "Plan"}</p>
                <div className="tab-navlink-div">
                  <h2>4</h2>
                </div>
              </NavLink>
              <NavLink className="tab-nav-header-item tab-nav-header-navlink" to='/summary' onClick={(ev)=>this.handleClick(ev, "/summary")}>
                <p>{lang === "English" ? "Summary" : "Résumé"}</p>
                <div className="tab-navlink-div">
                  <h2>5</h2>
                </div>
              </NavLink>

              <div>
                <div className="tab-nav-header-translation"> <TranslateButton/> </div>
              </div>
              
            </div>
          </ul>
        </div>
        }
        </div>
      </div>
    )
  }
}
