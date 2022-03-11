import React, { useState, useEffect } from "react";
import PrintTreatments from "./PrintTreatments";
import { getRequest } from "../../API/ApiHandler";
import Spinner from "../UI/Spinner";

const StepThree = ({ hidden }) => {
  const [sc, setSc] = useState([]);
  const [hcp, setHcp] = useState([]);
  const [favs, setFavs] = useState([]);
  const [plans, setPlan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserSc = async () => {
    let data = await getRequest(`/userScs/user`);
    if (data) setSc(data);
    setIsLoading(false);
  };

  const getUserHcp = async () => {
    let data = await getRequest(`/userHcps/user`);
    if (data) setHcp(data);
    setIsLoading(false);
  };

  const getUserFavs = async () => {
    let data = await getRequest(`/userFavourites/user`);
    if (data) setFavs(data);
    setIsLoading(false);
  };

  const getUserPlans = async () => {
    let data = await getRequest(`/userPlans/user`);
    if (data) setPlan(data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getUserSc();
    getUserHcp();
    getUserFavs();
    getUserPlans();
  }, []);

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  const topThreeSC = sc && sc.map((sc) => <li key={sc.id}>{lang === "English" ? sc.name : sc.fr_name}</li>);

  const topThreeHCP = hcp && hcp.map((hcp) => <li key={hcp.id}>{lang === "English" ? hcp.name : hcp.fr_name}</li>);

  const favoritesList = favs.length ? (
      favs.map((fav) => <li key={fav.id}>{lang === "English" ? fav.name : fav.fr_name}</li>)
    ) : (
      <p className="text-left">{lang === "English" ? "Your favourites list is empty" : "Votre liste de favoris est vide"}</p>
    );

  const planList = plans.length ? (
      plans.map((plan) => <li key={plan.id}>{lang === "English" ? plan.name : plan.fr_name}</li>)
    ) : (
      <p className="text-left">{lang === "English" ? "Your plan list is empty" : "Votre liste de plans est vide"}</p>
    );

  return (
    <div className="box-container-numbered">
      <h4 className="title_summary numbered-subheading">
        {lang === "English" ? "Step 3: Review and select treatment options" : "Étape 03: Révisez et sélectionnez les options de traitement"}
      </h4>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="padding-class">
          <h5>
            <strong>1. </strong>
            {lang === "English" ? "Treatments you could try now:" : "Traitements que vous pouvez essayer maintenant:"}
            {!hidden && <PrintTreatments type={"sc"} passSC={sc} />}
          </h5>
          {topThreeSC}

          <h5>
            <strong>2. </strong>
            {lang === "English" ? 
              "Treatments you could talk about with your health care team before trying:" : 
              "Traitements dont vous pourriez parler avec votre équipe soignante avant de les essayer:"}
            {!hidden && <PrintTreatments type={"hcp"} passHCP={hcp} />}
          </h5>
          {topThreeHCP}

          <h5>
            <strong>3. </strong>
            {lang === "English" ? 
              "Treatments in your Favourites list:" : 
              "Traitements dans votre liste de favoris:"}
            {!hidden && <PrintTreatments type={"favs"} passFavs={favs} />}
          </h5>
          {favoritesList}

          <h5>
            <strong>4. </strong>
            {lang === "English" ? "Your treatment plan:" : "Votre plan de traitement:"}
            {!hidden && <PrintTreatments type={"plan"} passPlan={plans} />}
          </h5>
          {planList}
        </div>
      )}
    </div>
  );
};

export default StepThree;
