import React from "react";

const PlanPDF = ({passPlan}) => {
  return (
    <>
      {passPlan &&
        passPlan.map((treatment, i) => (
          <div key={treatment.id}>
            <div className="plan-pdf">
              <h2>{treatment.name}</h2>
              <p>{treatment.description}</p>
              <h4>Effectiveness</h4>
              <p>{treatment.traffic_description}</p>
              <h4>What do experts suggest?</h4>
              <p>{treatment.experts_suggest}</p>
              <h4>How can I use this treatment?</h4>
              <p>{treatment.how_use}</p>
              <h4>How soon will I feel better?</h4>
              <p>{treatment.how_soon}</p>
              <h4>How much does this treatment cost?</h4>
              <p>{treatment.cost}</p>
              <h4>Where can I get this treatment?</h4>
              <p>{treatment.where}</p>
              <h4>What else should I consider?</h4>
              <p>{treatment.consider}</p>
            </div>
            <div key={treatment.id} className="plan-pdf">
              <h4>What does the research say?</h4>
              {treatment.studies && treatment.studies.map((study, i) =>
                study.name ? (
                  <div key={study.id}>
                    <h4>
                      Study {i + 1}: {study.name}
                    </h4>
                    <h4>Does it work?</h4>
                    <p>{study.does_work}</p>
                    {study.results &&
                      study.results.map((result) => (
                        <div key={result.id}>
                          <span>
                            <h4>Treatment: </h4>
                            <p>{result.name}</p>
                          </span>
                          <span>
                            <h4>Results: </h4> <p>{result.statistics}</p>
                          </span>
                        </div>
                      ))}
                    <h4>Is it safe?</h4>
                    <p>{study.is_safe}</p>
                    <h4>Should I believe this research?</h4>
                    <p>{study.believe_research}</p>
                  </div>
                ) : (
                  <div key={study.id}>
                    <h4>Does it work?</h4>
                    <p>{study.does_work}</p>
                    <h4>Is it safe?</h4>
                    <p>{study.is_safe}</p>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
    </>
  );
};

export default PlanPDF;
