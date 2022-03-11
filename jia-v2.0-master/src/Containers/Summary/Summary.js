import React, {useState, useEffect} from 'react'
import Header from '../../components/Home/Header'
import {Button} from "reactstrap";
import jsPDF from "jspdf";
import domtoimage from 'dom-to-image';

import StepOne from '../../components/Summary/StepOne';
import StepTwo from '../../components/Summary/StepTwo';
import StepThree from '../../components/Summary/StepThree';
import StepFour from '../../components/Summary/StepFour';

import Footer from '../../components/Footer';
import SummaryPdf from '../../components/Summary/SummaryPdf';
import Subheader from '../../components/UI/Subheader/Subheader';

import {logout, getUserType} from '../../components/AuthenticationService';

const Summary = props => {
  const [navTo, setNavTo] = useState('')
  const [saved, setSaved] = useState(true)
  const [navBy, setNavBy] = useState('')
  const [displayNavDialog, setDisplayNavDialog] = useState(false)

  React.useEffect(() => {
    getUserType()
  })

  const printSummary = () => {
    let nodes = document.querySelectorAll(".pdf-page");
    const pdf = new jsPDF();
    nodes.forEach((page, id) => {
      setTimeout(() => {
        domtoimage.toPng(page)
          .then(async function (dataUrl) {
            const img = new Image();
            img.src = dataUrl;

            if (id < nodes.length - 1) {
              pdf.addImage(img, 'PNG', 0, 0);
              pdf.addPage();
            } else {
              pdf.addImage(img, 'PNG', 0, 0);
              //SummaryContent.complete(pdf);
              let date = new Date().toLocaleString();
              pdf.save(`Summary_${date}`);
            }
          });
      },100);
    });
  }

  const handleStepperNav = to => {
    props.history.push(to)
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
  },[])

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  return(
    <React.Fragment>
      <div className="summary-container">
        <div className='page-header'>
          <Header current={props} handleNav={handleStepperNav} setNavTo={setNavTo}/>
        </div>
        <div className="wrapper">
          <Subheader title={lang === "English" ? "Summary" : "Résumé"}
            handleAdmin={handleSubHeaderAdminNav}
            handleUser={handleSubHeaderProgressNav}
            handleLogout={handleSubHeaderLogout}
          />
          <div className="body-container">
            <div className="notice summary-notice">
              <div>
                <h4>{lang === "English" ? "You're Done!" : "C’est terminé!"}</h4>
                <p>
                  {lang === "English" ? 
                  "Below is a summary of your information. You can save a copy to your device and share it with your health care team." : 
                  "Vous trouverez ci-dessous un résumé de vos informations. Vous pouvez en enregistrer une copie sur votre appareil et la partager avec votre équipe soignante."}
                </p>
              </div>
              <div>
                <Button id="savetoDev" className="next-btn" onClick={printSummary}>{lang === "English" ? "Download" : "Télécharger"}</Button>
              </div>
            </div>
            <StepOne/>
            <StepTwo />
            <StepThree hidden={false}/>
            <StepFour />
          </div>
          <div className="save-container">
            <div className="save-content">
              <Button id="savetoDev" className="next-btn" onClick={printSummary}>{lang === "English" ? "Download" : "Télécharger"}</Button>
            </div>
          </div>
        </div>
        <SummaryPdf />
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default Summary