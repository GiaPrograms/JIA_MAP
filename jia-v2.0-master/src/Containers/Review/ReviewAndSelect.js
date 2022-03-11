import React, {useState, useEffect} from 'react';
import Header from '../../components/Home/Header';
import AllTreatments from "../../components/Review/AllTreatments";
import Recommendations from "../../components/Review/Recommendations";
import Favourites from "../../components/Review/Favourites";
import TabNavReview from '../../components/Review/TabNavReview';
import BottomTabNavReview from '../../components/Review/BottomTabNavReview';
import DialogBox from "../../components/UI/DialogBox";
import FailedSaveDialog from "../../components/UI/FailedSaveDialog";

import Footer from "../../components/Footer";
import Subheader from '../../components/UI/Subheader/Subheader';
import NavigationButton from '../../components/UI/Buttons/NavigationButton';
import {getRequest} from "../../API/ApiHandler"
import NavigationDialog from "../../components/UI/NavigationDialog"

import {logout, getUserType} from '../../components/AuthenticationService';

const ReviewAndSelect = props => {
  const [treatments, setTreatments] = useState([])
  const [favourites, setFavourites] = useState()
  const [navTo, setNavTo] = useState('')
  const [navBy, setNavBy] = useState('')
  const [saved, setSaved] = useState(true)
  const [displayNavDialog, setDisplayNavDialog] = useState(false)
  const [didSelect, setDidSelect] = useState(false)
  const [open, setOpen] = useState(false)

  React.useEffect(() => {
    getUserType()
  })
  
  const getUserFavourite = async() => {
    let data = await getRequest(`/userFavourites/user`)
    if(data) {
      const ids = data.map(treatment => {return {id: treatment.id}})
      setFavourites(ids)
    }
  }

  const getTreatments = async() => {
    let data = await getRequest("/treatments")
    if(data.length > 0) setTreatments(data)
  }

  // const handleStepperNav = to => {
  //   props.history.push(to)
  // }

  const handleButtonNav = () => {
    if (saved) {
      props.history.push(`/make-your-plan`)
    } else {
      setNavBy('button')
      setDisplayNavDialog(true)
    }
  }

  const handleStepperNav = to => {
    if (saved) {
      props.history.push(to)
    } else {
      setNavBy('stepper')
      setDisplayNavDialog(true)
    }
  }

  const handleSubHeaderAdminNav = () => {
    if(saved) {
      props.history.push(`/adminPanel/users`)
    } else {
      setNavBy('admin')
      setDisplayNavDialog(true)
    }
  }

  const handleSubHeaderProgressNav = () => {
    if(saved) {
      props.history.push(`/userPanel/average`)
    } else {
      setNavBy('user')
      setDisplayNavDialog(true)
    }
  }

  const handleSubHeaderLogout = () => {
    if(saved) {
      logout()
      props.history.push(`/`)
    } else {
      setNavBy('logout')
      setDisplayNavDialog(true)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getTreatments()
    getUserFavourite()
  },[])

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  return (
    <div className="reviewDiv wrapper">
      <div className='page-header'>
        <Header current={props} handleNav={handleStepperNav} setNavTo={setNavTo}/>
      </div>
      <Subheader title={lang === "English" ? "Review & select treatment options" : "Réviser et sélectionner"}
        handleAdmin={handleSubHeaderAdminNav}
        handleUser={handleSubHeaderProgressNav}
        handleLogout={handleSubHeaderLogout}
      />
      <div className="body-container">

        <div className='more-option-notice'>
          <h5>
            {lang === "English" ? 
              <>You can click on the <strong>“All Treatments”</strong> tab to see all treatments, or click on the <strong>“My Favourites”</strong> tab to review your favourites. You can also go back to Step 2 to change your answers and see new treatments.</>: 
              <>Pour voir l’ensemble des traitements, cliquez sur l’onglet <strong>“Tous les traitements”</strong>. Pour consulter vos favoris, cliquez sur l’onglet <strong>“Mes favoris”</strong>. Vous pouvez aussi retourner à l’étape 2 pour changer vos réponses et voir de nouveaux traitements.</>}
          </h5>
        </div>

        <TabNavReview current={props}/>
        <div className="review-box-container">
          {/* RECOMMENDATIONS COMPONENT */}
          {props.match.params.tab === "recommendations" && 
            <Recommendations 
              favs={favourites}
              setFavs={setFavourites}
              treatments={treatments}
            />
          }
          {/* ALL TREATMENTS COMPONENT */}
          {props.match.params.tab === "allTreatments" && 
            <AllTreatments 
              favs={favourites}
              setFavs={setFavourites}
              treatments={treatments}
            />
          }
          {/* FAVOURITES COMPONENT */}
          {props.match.params.tab === "favorites" && 
            <Favourites 
              favs={favourites}
              setFavs={setFavourites}
              treatments={treatments}
            />
          }
        </div>
        <BottomTabNavReview current={props}/>
      </div>
      <NavigationButton 
        btnText={lang === "English" ? "Continue to Step 4" : "Passez à l'étape 4"}
        handleNavigation={handleButtonNav}
      />
      <Footer/>
      {/* {!didSelect && <DialogBox description="The selected information will be saved in the trial database. You can modify the information as needed." step='s3Trial' />}
      <NavigationDialog open={displayNavDialog} handleClose={closeNavDialog} />
      <FailedSaveDialog open={open} setOpen={setOpen} /> */}
    </div>
  )
}

export default ReviewAndSelect 
