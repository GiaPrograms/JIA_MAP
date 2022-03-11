import React from 'react'
import {Button} from "reactstrap";
import jsPDF from "jspdf";
import domtoimage from 'dom-to-image';

import './UserProfile.css'
import Details from './Details';
import SummaryPdf from '../../Summary/SummaryPdf';

const UserProfile = ({user, onCloseUser}) => {
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
              let date = new Date().toLocaleString();
              pdf.save(`Summary_${date}`);
            }
          });
      },100);
    });
  }

  return (
    <>
      <div className="user-card-header">
        <h1>{user.username}</h1>
        <Button id="savetoDev" className="next-btn" onClick={printSummary}>Download</Button>
        <Button className="next-btn top-btn" onClick={() => onCloseUser(false, null)}>Back</Button>
      </div>
      <Details user={user}/>
      <div className="back-button-container bottom-btn">
        <Button className="next-btn" onClick={() => onCloseUser(false, null)}>Back</Button>
      </div>
      <SummaryPdf />
    </>
  )
}

export default UserProfile