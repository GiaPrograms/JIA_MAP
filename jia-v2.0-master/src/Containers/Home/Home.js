import React, {useState, useEffect} from "react";
import Header from "../../components/Home/Header";
import Main from "../../components/Home/Main";
import Footer from "../../components/Footer";
import PurposeDialog from "../../components/Home/PurposeDialog";
import {type} from '../../components/AuthenticationService';

const Home = props => {
  const [didSelect, setDidSelect] = useState(false)

  useEffect(() => {
    if(sessionStorage.getItem('purpose')) setDidSelect(true)
  },[])

  return (
    <div>
      <div className="home-page-header">
        <Header current={props} />
      </div>
      <Main />
      <Footer />
      {(!didSelect && type === 'user') && <PurposeDialog/>}
    </div>
  );
};

export default Home;
