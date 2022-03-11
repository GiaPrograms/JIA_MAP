/**
 * @file
 * Component for the content on the summary which gets downloaded.
 * Has styling adjusted to fit in the pdf format page.
 * @author <akel.ms93@gmail.com>
 */
import React from 'react';

import StepOne from '../../components/Summary/StepOne';
import StepTwo from '../../components/Summary/StepTwo';
import StepThree from '../../components/Summary/StepThree';
import StepFour from '../../components/Summary/StepFour';

const SummaryPdf = () => (
  <div className="hidden-print-container">
    <div className="hidden-print">
      <div className="pdf-page">
        <StepOne />
      </div>
      <div className="pdf-page">
        <StepTwo />
      </div>
      <div className="pdf-page">
        <StepThree hidden={true}/>
      </div>
      <div className="pdf-page">
        <StepFour />
      </div>
    </div>
  </div>
)
export default SummaryPdf