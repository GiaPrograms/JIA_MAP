import React, {Component} from 'react'
import {NavLink} from 'react-router-dom';
export default class TabNavReview extends Component{

render(){

    //Get value of language from local storage
    let lang = localStorage.getItem("language")

    return(
        <div className="reviewDiv-nav">
            {this.props.current.match.url === "/review-and-select/recommendations" &&
            <React.Fragment>
            <NavLink to="/review-and-select/recommendations" className="review-active"><h3><strong>{lang === "English" ? "Suggested treatments" : "Traitements suggérés"}</strong></h3></NavLink>
            <NavLink to="/review-and-select/allTreatments"><h3>{lang === "English" ? "All Treatments" : "Tous les traitements"}</h3></NavLink>
            <NavLink to="/review-and-select/favorites"><h3>{lang === "English" ? "My Favourites" : "Mes favoris"}</h3></NavLink>
            </React.Fragment>
            }
            {this.props.current.match.url === "/review-and-select/allTreatments" &&
            <React.Fragment>
            <NavLink to="/review-and-select/recommendations"><h3>{lang === "English" ? "Suggested treatments" : "Traitements suggérés"}</h3></NavLink>
            <NavLink to="/review-and-select/allTreatments" className="review-active"><h3><strong>{lang === "English" ? "All Treatments" : "Tous les traitements"}</strong></h3></NavLink>
            <NavLink to="/review-and-select/favorites"><h3>{lang === "English" ? "My Favourites" : "Mes favoris"}</h3></NavLink>
            </React.Fragment>
            }
            {this.props.current.match.url === "/review-and-select/favorites" &&
            <React.Fragment>
            <NavLink to="/review-and-select/recommendations"><h3>{lang === "English" ? "Suggested treatments" : "Traitements suggérés"}</h3></NavLink>
            <NavLink to="/review-and-select/allTreatments"><h3>{lang === "English" ? "All Treatments" : "Tous les traitements"}</h3></NavLink>
            <NavLink to="/review-and-select/favorites" className="review-active"><h3><strong>{lang === "English" ? "My Favourites" : "Mes favoris"}</strong></h3></NavLink>
            </React.Fragment>
            }
        </div>
    )}
}

