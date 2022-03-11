import React, {useState} from 'react'
import { withRouter } from 'react-router-dom'
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import { useForm } from "react-hook-form";

import Footer from '../../components/Footer';
import {postRequest} from '../../API/ApiHandler'

import './Login.css';
import {getUserType, getCurrentUser, type} from '../../components/AuthenticationService';
import TranslateButton from "../../components/UI/TranslateButton";

import ChooseLang from "../../components/Home/ChooseLang";

const Login = ({history}) => {
  const { register, handleSubmit, errors} = useForm();
  const [invalidUser, setInvalidUser] = useState(false)

  //Get value of language from local storage
  let lang = localStorage.getItem("language")
  let popup = localStorage.getItem("popup")

  if (popup == null) {
    localStorage.setItem("popup", true)
    window.location.reload()
  }

  const onSubmit = async(data) => {
    const signInInput = {
      username: data.userID,
      password: data.password
    }
    let success = await postRequest("/auth/tokens", signInInput)
    if(success) {
      await getCurrentUser()
      await getUserType()
      setInvalidUser(false)
      type === 'user' ? history.push(`/home`) : history.push(`/adminPanel/users`)
      localStorage.setItem("popup", true)
    } else {
      setInvalidUser(true)
    }
  }

  return(
    <div className="login-page">
      <div className="title-section">
        <div>
          <div className="login-translation"> <TranslateButton/> </div>
        </div>
        <h1>JIA Option Map</h1>
      </div>

      {popup === "true" ? 
        <ChooseLang/>
        :
        ""
      }

      <div className="form-section">
        <h2>{lang === "English" ? "Login" : "Connexion"}</h2>
        {invalidUser &&
        <p className="error-message">{lang === "English" ? "Invalid user ID or password" : "ID utilisateur ou mot de passe invalide"}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="form-content">
          <div className="input-container">
          <label><PersonIcon style={{fill: "#10434F"}}/>{lang === "English" ? "User ID" : "Nom d’utilisateur"}</label>
            <input 
              type="text" 
              name="userID" 
              ref={register({ required: true})}
            />
            {errors.userID && <p className="error-message">{lang === "English" ? "User ID is required" : "L'ID utilisateur est requis"}</p>}
          </div>
          <div className="input-container">
            <label><LockIcon style={{fill: "#10434F"}}/>{lang === "English" ? "Password" : "Mot de passe"}</label>
              <input 
                type="password" 
                name="password" 
                ref={register({ required: true })}
              />
              {errors.password && <p className="error-message">{lang === "English" ? "Password is required" : "Mot de passe requis"}</p>}
          </div>
        
          <input type="submit" value={lang === "English" ? "Log in" : "Connexion"} className="submit-btn" />
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default  withRouter(Login)