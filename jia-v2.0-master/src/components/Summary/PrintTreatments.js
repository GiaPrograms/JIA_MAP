import React from 'react';
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import PrintIcon from '@material-ui/icons/Print';
import Tooltip from '@material-ui/core/Tooltip';

import ScPDF from "./ScPDF";
import HcpPDF from "./HcpPDF";
import FavsPDF from "./FavsPDF";
import PlanPDF from "./PlanPDF";

const PrintTreatments = ({type, passSC, passHCP, passFavs, passPlan}) => {
  /** Convert to PDF */
  const printList = () => {
    let nodes = document.querySelectorAll(`.${type}-pdf`)
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
              // PrintTreatments.complete(pdf);
              let date = new Date().toLocaleString();
              pdf.save(`Summary_${date}`);
            }
          });
      }, 100);
    });
  }

  return (
    <React.Fragment>
      <Tooltip title="Download treatments details">
      <PrintIcon className="material-icons print-icon"
        onClick={() => {printList(type)}}>
      </PrintIcon>
      </Tooltip>
      <div className="hidden-print-container">
        <div className="hidden-print">
          <div className="treatments-pdf">
            <div className="padding-class">
              {passSC && <ScPDF passSC={passSC}/>}
              {passHCP && <HcpPDF passHCP={passHCP}/>}
              {passFavs && <FavsPDF passFavs={passFavs}/> }
              {passPlan && <PlanPDF passPlan={passPlan}/> }
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default PrintTreatments