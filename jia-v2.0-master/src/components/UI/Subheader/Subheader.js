import React from 'react'
import {NavLink, withRouter} from 'react-router-dom';

import "./Subheader.css"
import { type, logout, getUserType } from '../../AuthenticationService';

import Tooltip from '@material-ui/core/Tooltip';
import {withStyles} from '@material-ui/core/styles';

const Subheader = ({title, history, handleAdmin, handleUser, handleLogout}) => {

  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.text.secondary,
      color: 'rgba(255, 255, 255, 1)',
      boxShadow: theme.shadows[3],
      fontSize: 12,
    },
  }))(Tooltip);
  
  // const handleLogout = () => {
  //   logout()
  //   history.push('/')
  // }

  React.useEffect(() => {
    getUserType()
  })

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  return(
    <div className='sub-header'>
      <div className="subheader-content">
        <h3>{title}</h3>
        <div className="subheader-right">
          {type === 'admin' && <LightTooltip title={lang === "English" ? "Click to access the admin panel" : "Cliquez pour accéder au panneau d'administration"} placement="top" arrow>
            <h5 onClick={handleAdmin}>{lang === "English" ? "Admin panel" : "Panneau d'administration"}</h5>
            {/* {<NavLink to='/adminPanel/users'><h5>{lang === "English" ? "Admin Panel" : "panneau d'administration"}</h5></NavLink>} */}
          </LightTooltip>}

          <LightTooltip title={lang === "English" ? "Click to view your progress" : "Cliquez pour voir votre progression"} placement="top" arrow>
            <h5 onClick={handleUser}>{lang === "English" ? "Your progress" : "Votre progression"}</h5>
            {/* {<NavLink to='/userPanel/average'><h5>{lang === "English" ? "Your Progress" : "Votre Progression"}</h5></NavLink>} */}
          </LightTooltip>

          <LightTooltip title={lang === "English" ? "Click to logout" : "Cliquez pour vous déconnecter"} placement="top" arrow>
            <h5 onClick={handleLogout}>{lang === "English" ? "Logout" : "Se déconnecter"}</h5>
            {/* <h5 onClick={handleLogout}> {lang === "English" ? "Logout" : "Se déconnecter"}</h5> */}
          </LightTooltip>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Subheader)