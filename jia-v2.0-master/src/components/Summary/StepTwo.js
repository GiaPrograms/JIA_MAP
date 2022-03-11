import React, {useState, useEffect} from 'react'
import {getRequest} from "../../API/ApiHandler"
import Spinner from '../UI/Spinner'
import "./Summary.css"

const StepTwo = () => {
  const [whatsImportant, setWhatsImportant] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserPrefs = async () => {
    let data = await getRequest(`/userPreferences/user`);
    if (data) {
      const prefs = data.map((item) => {
        return {
          id: item.user_preference.preferenceId,
          description: item.description,
          fr_description: item.fr_description,
          value: item.user_preference.value,
          left_label: item.left_label,
          fr_left_label: item.fr_left_label,
          fr_right_label: item.fr_right_label,
          right_label: item.right_label,
          reversed: item.reversed

        };
      });
      setWhatsImportant(prefs);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getUserPrefs();
  }, []);

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  // Message to display if no input was provided
  const notProvidedEN = "No Input was provided";
  const notProvidedFR = "Aucune information n’a été fournie.";

  const sliders = whatsImportant.length ? (
   whatsImportant.map((slider, i) => (
    <div key={slider.id}>
      <h5>
        <strong>{i + 1}. </strong>
        {lang === "English" ? slider.description : slider.fr_description}
      </h5>
      <p className="text-center">
        <div className="circle-radio-group-summary">
          <h5 style={{color: slider.reversed ? '#4DAA33' : '#B10921'}}>{lang === "English" ? slider.left_label : slider.fr_left_label}</h5>
          <h5 style={{color: slider.reversed ? '#B10921' : '#4DAA33'}}>{lang === "English" ? slider.right_label : slider.fr_right_label}</h5>
        </div>

        {slider.value} / 5
        <img
          style={{ width: "60%" }}
          src={require(`../../img/${slider.value}.png`)}
          alt="manage your pain"
        />
      </p>
    </div>
   ))
  ) : (
    <p className="notFilled">{lang === "English" ? notProvidedEN : notProvidedFR}</p>
  )

  return (
    <div className="box-container-numbered">
      <h4 className="title_summary numbered-subheading">
        {lang === "English" ? "Step 2: What’s important to you" : "Étape 2: ce qui est important pour vous"}
      </h4>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="padding-class">
          <div className="summary-slider-container">{sliders}</div>
        </div>
      )}
    </div>
  );
};

export default StepTwo