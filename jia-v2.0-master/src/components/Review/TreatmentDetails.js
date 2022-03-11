/**
 * @file
 * Component for displaying the treatment details when it is viewed 
 * @author <akel.ms93@gmail.com>
 */

import React, {useState, useEffect} from 'react'
import Study from './Study'
import TrafficLight from '../UI/TrafficLight';
import Header from '../Home/Header';
import FavouriteIcon from '../UI/Icons/FavouriteIcon'
import {Button} from "reactstrap";
import Footer from "../Footer";
import {baseUrl, getRequest, postRequest, deleteRequest} from "../../API/ApiHandler"

import placeholder from "../../img/default_placeholder.png"

const TreatmentDetails = (props) => {
  const [treatment, setTreatment] = useState([])
  const [isSelected, setIsSelected] = useState(false)
  const [studies, setStudies] = useState([])
  const [webLinks, setWebLinks] = useState([])
  const [videoLinks, setVideoLinks] = useState([])
  const [navTo, setNavTo] = useState('')

  const  toggleFavourite = ev => {
    const path = "/userFavourites"
    const input = {treatment_id: treatment.id}
    if (ev.target.getAttribute('data-active') === 'false') {
      postRequest(path, input)
      setIsSelected(true)
    } else {
      deleteRequest(path, input)
      setIsSelected(false)
    }
  }

  const getWebLinks = async () => {
    let data = await getRequest(`/learn/${treatment.id}`)
    if(data.length) setWebLinks(data)
  }

  const getVideoLinks = async () => {
    let data = await getRequest(`/videos/${treatment.id}`)
    if(data.length) setVideoLinks(data)
  }

  const getStudies = async () => {
    let data = await getRequest(`/studies/${treatment.id}`)
    if(data.length) setStudies(data)
  }

  function getNumOfLinksByLang(lang){
    let numOfLinks = 0
    webLinks.map((web) =>
      {
        if(web.language === lang && web.is_app === false){
          numOfLinks += 1
        }
      }
    )
    return numOfLinks
  }

  function getNumOfLinksByNationAndLang(nation, lang){
    let numOfLinks = 0
    webLinks.map((web) =>
      {
        if(web.nationality === nation && web.language === lang && web.is_app === false){
          numOfLinks += 1
        }
      }
    )
    return numOfLinks
  }

  function getNumOfAppByLang(lang){
    let numOfApps = 0
    webLinks.map((web) =>
      {
        if(web.is_app === true && web.language === lang){
          numOfApps += 1
        }
      }
    )
    return numOfApps
  }

  function getNumOfVids(lang){
    let numOfVids = 0
    videoLinks.map((video) =>
      {
        if(video.language === lang){
          numOfVids += 1
        }
      }
    )
    return numOfVids
  }


  const handleStepperNav = to => {
    props.data.history.push(to)
  }

  useEffect(() => {
    setTreatment(props.data.location.state[0])
    setIsSelected(props.data.location.state[1])
  },[])

  useEffect(() => {
    if(treatment) {
      getWebLinks()
      getVideoLinks()
      getStudies()
    }
  },[treatment])

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  const makePage = () => {
    return (
      <React.Fragment>
        <div className="wrapper">
          <div className='page-header'>
            <Header current={props.data} handleNav={handleStepperNav} setNavTo={setNavTo}/>
          </div>
          <div className='sub-header'>
            <div className="subheader-content">
              <h3>{lang === "English" ? "Treatment details" : "Détails du traitement"}</h3>
            </div>
          </div>
          <div className="body-container treatment_details">
            <div className="back-button-container">
              <Button className="next-btn" onClick={() => {props.data.history.goBack()}}>{lang === "English" ? "Go Back" : "Retourner"}</Button>
            </div>
            <div className="box-container">
              {/* Image and description */}
              <div id="image_and_description">
                <img alt={treatment.name} src={treatment.image ? `${baseUrl}/${treatment.image}` : placeholder}/>
                <div className="description">
                  <div className="description-title">
                    <h2>{lang === "English" ? treatment.name : treatment.fr_name}</h2>
                    <span>
                        <FavouriteIcon 
                          toggleFav={toggleFavourite}
                          isFav={isSelected}
                        />
                    </span>
                  </div>
                  <p>{lang === "English" ? treatment.description : treatment.fr_description}</p>
                </div>
              </div>
              {/* traffic level and description */}
              <div id="traffic_and_description">
                <div className="traffic-light-container">
                  <TrafficLight level={treatment.traffic_level}/>
                </div>
                <div className="traffic-description">
                  <p>{lang === "English" ? treatment.traffic_description : treatment.fr_traffic_description}</p>
                </div>
              </div>

              <div className="treatment_details_overview">
                <h3 id="experts_suggest">{lang === "English" ? "What do experts suggest?" : "Que suggèrent les experts?"}</h3>
                <p>{lang === "English" ? treatment.experts_suggest : treatment.fr_experts_suggest}</p>
              </div>
              {/* Studies section */}
              <div className="research_heading"> 
                <h3>{lang === "English" ? "What does the research say?" : "Que dit la recherche?"}</h3>
              </div>
              {studies &&
                <div className="treatment_details_study_container">
                  {studies.map((study, i) => (
                    <Study 
                        key={study.id} 
                        study={study} 
                        studyNo={i+1}
                      />
                    )
                  )}
                </div>
              }
              {/* treatment details section */}
              <div className="treatment-details-texts">
                <h3>{lang === "English" ? "How can I use this treatment?" : "Comment puis-je utiliser ce traitement?"}</h3>
                <p>{lang === "English" ? treatment.how_use : treatment.fr_how_use}</p>
                <h3>{lang === "English" ? "How soon will I feel better?" : "Quand vais-je me sentir mieux?"}</h3>
                <p>{lang === "English" ? treatment.how_soon : treatment.fr_how_soon}</p>
                <h3>{lang === "English" ? "How much does this treatment cost?" : "Combien coûte ce traitement?"}</h3>
                <p>{lang === "English" ? treatment.cost : treatment.fr_cost}</p>
                <h3>{lang === "English" ? "Where can I get this treatment?" : "Où puis-je obtenir ce traitement?"}</h3>
                <p>{lang === "English" ? treatment.where : treatment.fr_where}</p>
                <h3>{lang === "English" ? "What else should I consider?" : "Que dois-je envisager d'autre?"}</h3>
                <p>{lang === "English" ? treatment.consider : treatment.fr_consider}</p>

                <h3>{lang === "English" ? "Learn more:" : "Apprendre encore plus:"}</h3>

                {getNumOfLinksByLang("English") > 0 && lang === "English" ? <h4>Web pages:</h4> : ""}
                {getNumOfLinksByLang("French") + getNumOfLinksByLang("English") > 0 && lang === "French" ? <h4>Pages web:</h4> : ""}

                <div className="treatment_details_links">
                  {getNumOfLinksByNationAndLang("Canadian", "English") > 0 && lang === "English" ? <h5>Canadian web pages:</h5> : ""}
                  {getNumOfLinksByNationAndLang("Canadian", "French") + getNumOfLinksByNationAndLang("Canadian", "English") > 0 && lang === "French" ? <h5>Pages web canadiennes:</h5> : ""}
                  {webLinks.map((web, i) =>
                    <div key={web.id}>
                      {lang === "English" && web.language === "English" && web.nationality === "Canadian" && web.is_app === false ?
                        <p key={i}><a href={`${web.link}`} target="_blank" rel="noopener noreferrer">{web.name ? `${web.name}` : `${web.link}`}</a></p>
                      :
                      lang === "French" && web.nationality === "Canadian" && web.is_app === false ?
                        <p key={i}><a href={`${web.link}`} target="_blank" rel="noopener noreferrer">{web.name ? `${web.name}` : `${web.link}`}</a></p>
                      :
                        ""
                      }
                    </div>
                  )}

                  {getNumOfLinksByNationAndLang("American", "English") > 0 && lang === "English" ? <h5>American web pages:</h5> : ""}
                  {getNumOfLinksByNationAndLang("American", "French") + getNumOfLinksByNationAndLang("American", "English") > 0 && lang === "French" ? <h5>Pages web américaines:</h5> : ""}
                  {webLinks.map((web, i) =>
                    <div key={web.id}>
                      {lang === "English" && web.language === "English" && web.nationality === "American" && web.is_app === false ?
                        <p key={i}><a href={`${web.link}`} target="_blank" rel="noopener noreferrer">{web.name ? `${web.name}` : `${web.link}`}</a></p>
                      :
                      lang === "French" && web.nationality === "American" && web.is_app === false ?
                        <p key={i}><a href={`${web.link}`} target="_blank" rel="noopener noreferrer">{web.name ? `${web.name}` : `${web.link}`}</a></p>
                      :
                        ""
                      }
                    </div>
                  )}

                  {getNumOfLinksByNationAndLang("Other", "English") > 0 && lang === "English" ? <h5>Web pages from other countries:</h5> : ""}
                  {getNumOfLinksByNationAndLang("Other", "French") + getNumOfLinksByNationAndLang("Other", "English") > 0 && lang === "French" ? <h5>Pages web d'autres pays:</h5> : ""}
                  {webLinks.map((web, i) =>
                    <div key={web.id}>
                      {lang === "English" && web.language === "English" && web.nationality === "Other" && web.is_app === false ?
                        <p key={i}><a href={`${web.link}`} target="_blank" rel="noopener noreferrer">{web.name ? `${web.name}` : `${web.link}`}</a></p>
                      :
                      lang === "French" && web.nationality === "Other" && web.is_app === false ?
                        <p key={i}><a href={`${web.link}`} target="_blank" rel="noopener noreferrer">{web.name ? `${web.name}` : `${web.link}`}</a></p>
                      :
                        ""
                      }
                    </div>
                  )}
                </div>

                {getNumOfVids("English") > 0 && lang === "English" ? <h4>Videos:</h4> : ""}
                {getNumOfVids("French") + getNumOfVids("English") > 0 && lang === "French" ? <h4>Vidéos:</h4> : ""}
                <div className="treatment_details_links">
                  {videoLinks.map((video, i) =>
                    lang === "English" && video.language === "English" ?
                      <p key={i}><a href={`${video.link}`} target="_blank" rel="noopener noreferrer">{video.name ? `${video.name}` : `${video.link}`}</a></p>
                    :
                    lang === "French" ?
                      <p key={i}><a href={`${video.link}`} target="_blank" rel="noopener noreferrer">{video.name ? `${video.name}` : `${video.link}`}</a></p>
                    :
                      ""
                  )}
                </div>

                {getNumOfAppByLang("English") > 0 && lang === "English" ? <h4>Apps:</h4> : ""}
                {getNumOfAppByLang("French") + getNumOfAppByLang("English") > 0 && lang === "French" ? <h4>Applis:</h4> : ""}
                {webLinks.map((web, i) =>
                  <div key={web.id}>
                    {lang === "English" && web.language === "English" && web.is_app === true ?
                      <p key={i}><a href={`${web.link}`} target="_blank" rel="noopener noreferrer">{web.name ? `${web.name}` : `${web.link}`}</a></p>
                    :
                    lang === "French" && web.is_app === true ?
                      <p key={i}><a href={`${web.link}`} target="_blank" rel="noopener noreferrer">{web.name ? `${web.name}` : `${web.link}`}</a></p>
                    :
                      ""
                    }
                  </div>
                )}

              </div>

              <div className="save-as-favourite">
                <h5>
                  {lang === "English" ? "Save to favourites" : "Enregistrer dans les favoris"}
                </h5>
                <span>
                  <FavouriteIcon 
                    toggleFav={toggleFavourite}
                    isFav={isSelected}
                  />
                </span>
              </div>
            </div>
            <div className="back-button-container">
              <Button className="next-btn" onClick={() => props.data.history.goBack()}>{lang === "English" ? "Go Back" : "Retourner"}</Button>
            </div>
          </div>
        </div>
        <Footer/>
      </React.Fragment>
    )
  }

  return (
    <div id="treatment_details_div">{treatment && makePage()}</div>
  )
}

export default TreatmentDetails