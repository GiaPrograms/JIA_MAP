import React, {useState, useEffect} from 'react'
import {getRequest} from "../../API/ApiHandler"
import Spinner from '../UI/Spinner'
import "./Summary.css"

const StepOne = () => {
  // Q1 pain level value
  const [painLevel, setPainLevel] = useState();
  // Q2 pain areas values
  const [painAreas, setPainAreas] = useState([]);
  // Q3 selected meds
  const [prescribedMeds, setPrescribedMeds] = useState([]);
  const [otherMeds, setOtherMeds] = useState([]);
  // Q4 other selected meds and treatments
  const [treatments, setTreatments] = useState([]);
  // Q5 how often do you use your treatments values
  const [howOftenMeds, setHowOftenMeds] = useState();
  const [howOftenTreats, setHowOftenTreats] = useState();
  // Q6 how well does your treatment
  const [controlArthritis, setControlArthritis] = useState();
  const [managePain, setManagePain] = useState();

  const [isLoading, setIsLoading] = useState(true)

  const getPainLevel = async () => {
    let data = await getRequest(`/painLevels/user`);
    if (data) {
      let {
        data: { level },
      } = data;
      setPainLevel(level);
    }
    setIsLoading(false);
  };

  const getPainAreas = async () => {
    const data = await getRequest(`/painAreas/user`);
    if (data) {
      for (let part in data.data) {
        if (data.data[part] === true) {
          setPainAreas((prev) => [...prev, { name: part }]);
        }
      }
    }
    setIsLoading(false);
  };

  const getSelectedMeds = async () => {
    const meds = await getRequest(`/userMedications/user`);
    if (meds) {
      const { data } = meds;
      const prescribed = data.filter(
        (med) => med.classification.section === "prescribed"
      );
      const other = data.filter(
        (med) => med.classification.section === "other"
      );
      setPrescribedMeds(prescribed);
      setOtherMeds(other);
    }
    setIsLoading(false);
  };

  const getSelectedTreatments = async () => {
    const treatments = await getRequest(`/userTreatments/user`);
    if (treatments) {
      let { data } = treatments;
      setTreatments(data);
    }
    setIsLoading(false);
  };

  const getHowOften = async () => {
    let data = await getRequest(`/frequently/user`);
    if (data) {
      if(data.data.frequently) {
        setHowOftenMeds(lang === "English" ? data.data.frequently.prescribed_meds : data.data.frequently.fr_prescribed_meds);
        setHowOftenTreats(lang === "English" ? data.data.frequently.other_treatments : data.data.frequently.fr_other_treatments);
      }
    }
    setIsLoading(false);
  };

  const getHowWell = async () => {
    const data = await getRequest(`/effectiveness/user`);
    if (data) {
      const {
        data: { control_arthritis, manage_pain },
      } = data;
      setControlArthritis(control_arthritis);
      setManagePain(manage_pain);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getPainLevel();
    getPainAreas();
    getSelectedMeds();
    getSelectedTreatments();
    getHowOften();
    getHowWell();
  }, []);

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  // Message to display if no input was provided
  const notProvidedEN = "No Input was provided";
  const notProvidedFR = "Aucune information n’a été fournie.";

  // Pain level
  const painLevelItem =
    painLevel != null ? (
      <p className="text-center">
        <div className="circle-radio-group-summary-no-zero">
          <h5 style={{color: '#4DAA33'}}>{lang === "English" ? "No Pain" : "Aucune douleur"}</h5>
          <h5 style={{color: '#B10921'}}>{lang === "English" ? "Very Severe Pain" : "Douleur très sévère "} </h5>
        </div>

        {painLevel} / 5
        <img
          style={{ width: "60%" }}
          src={require(`../../img/${painLevel}_no_zero.png`)}
          alt="How much pain on average"
        />
      </p>
    ) : (
      <p className="notFilled">{lang === "English" ? notProvidedEN : notProvidedFR}</p>
    );

  // Pain Areas
  const painAreasItem = painAreas.length ? (
    painAreas.map((area, i) => (
      <span key={i}>
        {(i ? ", " : "") + (lang === "English" ? area.name === 'lower_back' ? 'lower back' : area.name : 
                           area.name === 'shoulders' ? 'épaules' : 
                           area.name === 'wrists' ? 'poignets' :
                           area.name === 'knees' ? 'genoux' :
                           area.name === 'hips' ? 'hanches' :
                           area.name === 'ankles' ? 'chevilles' :
                           area.name === 'jaw' ? 'mâchoire' :
                           area.name === 'fingers' ? 'doigts' :
                           area.name === 'toes' ? 'orteils' :
                           area.name === 'elbows' ? 'coudes' :
                           area.name === 'lower_back' ? 'bas du dos' :
                           area.name === 'neck' ? 'cou' : 'unknown')}
      </span>
    ))
  ) : (
    <p className="notFilled">{lang === "English" ? notProvidedEN : notProvidedFR}</p>
  );

  // Prescribed meds
  const presMedsItem = prescribedMeds.length ? (
    prescribedMeds.map((med, i) => (
      <span key={med.id}>{(i ? ", " : "") + (lang === "English" ? med.name : med.fr_name)}</span>
    ))
  ) : (
    <p className="notFilled">{lang === "English" ? notProvidedEN : notProvidedFR}</p>
  );

  // Other treatments
  const otherTreatmentsItem = [...otherMeds, ...treatments].length ? (
    [...otherMeds, ...treatments].map((treat, i) => (
      <span key={treat.id}>{(i ? ", " : "") + (lang === "English" ? treat.name : treat.fr_name)}</span>
    ))
  ) : (
    <p className="notFilled">{lang === "English" ? notProvidedEN : notProvidedFR}</p>
  );

  // How often do you use prescribed arthritis medications
  const howOftenMedsItem =
    howOftenMeds != null ? (
      <p>{howOftenMeds}</p>
    ) : (
      <p className="notFilled">{lang === "English" ? notProvidedEN : notProvidedFR}</p>
    );

  // How often do you use other pain treatments
  const howOftenTreatsItem =
    howOftenTreats != null ? (
      <p>{howOftenTreats}</p>
    ) : (
      <p className="notFilled">{lang === "English" ? notProvidedEN : notProvidedFR}</p>
    );

  // How well do does your treatments control your arthritis
  const controlItem =
    controlArthritis != null ? (
      <p className="text-center">
        <div className="circle-radio-group-summary">
          <h5 style={{color: '#B10921'}}>{lang === "English" ? "Not Well at All" : "Pas bien du tout"} </h5>
          <h5 style={{color: '#4DAA33'}}>{lang === "English" ? "Very Well" : "Très bien"}</h5>
        </div>

        {controlArthritis} / 5
        <img
          style={{ width: "60%" }}
          src={require(`../../img/${controlArthritis}.png`)}
          alt="How much pain on average"
        />
      </p>
    ) : (
      <p className="notFilled">{lang === "English" ? notProvidedEN : notProvidedFR}</p>
    );

  // How well do does your treatments manage your pain
  const manageItem =
    managePain != null ? (
      <p className="text-center">
        <div className="circle-radio-group-summary">
          <h5 style={{color: '#B10921'}}>{lang === "English" ? "Not Well at All" : "Pas bien du tout"} </h5>
          <h5 style={{color: '#4DAA33'}}>{lang === "English" ? "Very Well" : "Très bien"}</h5>
        </div>

        {managePain} / 5
        <img
          style={{ width: "60%" }}
          src={require(`../../img/${managePain}.png`)}
          alt="How much pain on average"
        />
      </p>
    ) : (
      <p className="notFilled">{lang === "English" ? notProvidedEN : notProvidedFR}</p>
    );

  return (
    <div className="box-container-numbered summary-container">
      <h4 className="title_summary numbered-subheading">
        {lang === "English" ? "Step 1: Your pain and your treatments" : "Étape 1: Votre douleur et vos traitements"}
      </h4>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="padding-class">
          <h5> 
            {lang === "English" ? 
              "1. In the past 7 days, how much pain on average did you have because of your arthritis?" : 
              "1. Au cours des sept derniers jours, quel niveau de douleur avez-vous ressenti en moyenne à cause de votre arthrite?"}
          </h5>
          <div className="summary-slider-container">{painLevelItem}</div>

          <h5> {lang === "English" ? "2. Where is your arthritis pain?" : "2. Où avez-vous de la douleur dûe à votre arthrite?"} </h5>
          {painAreasItem}
          <h5> {lang === "English" ? "3. What prescribed arthritis medication are you using?" : "3. Quels médicaments prescrits pour l’arthrite prenez-vous?"} </h5>
          {presMedsItem}

          <h5>
            {lang === "English" ? 
              "4. What other treatments are you using when you have arthritis pain?" : 
              "4. Quels autres traitements suivez-vous lorsque vous avez des douleurs arthritiques?"}
          </h5>
          {otherTreatmentsItem}

          <h5>
            {lang === "English" ? 
              "5. How often do you use your treatments?" : 
              "5. À quelle fréquence utilisez-vous ces traitements?"}
          </h5>
          <h6>
            {lang === "English" ? 
              "How often are you taking your prescribed arthritis medication?" : 
              "À quelle fréquence utilisez-vous vos médicaments sous ordonnance contre l’arthrite?"}
          </h6>
          {howOftenMedsItem}
          <h6>
            {lang === "English" ? 
              "When you have pain, how often do you use pain treatments?" : 
              "Lorsque vous avez de la douleur, à quelle fréquence utilisez-vous vos traitements contre la douleur?"}
          </h6>
          {howOftenTreatsItem}
          <h5>
            {lang === "English" ? 
            "6. How well do your treatments work?" : 
            "6. Dans quelle mesure vos traitements sont-ils efficaces?"}
          </h5>

          <h6>
            {lang === "English" ? 
              "How well does your treatment control your arthritis?" : 
              "Dans quelle mesure vos traitements contrôlent-ils efficacement votre arthrite?"}
          </h6>
          <div className="summary-slider-container">{controlItem}</div>

          <h6>
            {lang === "English" ? 
              "How well does your treatment manage your pain?" : 
              "Dans quelle mesure vos traitements soulagent-ils votre douleur?"}
          </h6>
          <div className="summary-slider-container"> {manageItem}</div>
        </div>
      )}
    </div>
  );
};

export default StepOne