import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoutesHOC/PrivateRoute'
import AdminRoute from './components/PrivateRoutesHOC/AdminRoute'

import Login from './Containers/Login/Login'
import Home from './Containers/Home/Home'
import Notice from './Containers/Notice/Notice'
import Intro from './Containers/Intro/Intro'
import Questionnaire from './Containers/Questionnaire/Questionnaire'
import WhatsImportant from './Containers/WhatsImportant/WhatsImportant'
import ReviewAndSelect from './Containers/Review/ReviewAndSelect'
import TreatmentDetails from './components/Review/TreatmentDetails';
import Plan from './Containers/Plan/Plan';
import Summary from './Containers/Summary/Summary';
// import Dashboard from './Containers/Admin/Dashboard/Dashboard';
import UsersList from './Containers/Admin/Users/UsersList';
import TreatmentsList from './Containers/Admin/Treatments/TreatmentsList';
import Studies from './Containers/Admin/Treatments/Studies';
import studyResults from './Containers/Admin/Treatments/StudyResults';
import TreatmentClassifications from './Containers/Admin/Treatments/Classifications';
import MedicationsList from './Containers/Admin/Medications/MedicationsList';
import MedicationsClassifications from './Containers/Admin/Medications/Classifications';
import WhatsImportantList from './Containers/Admin/WhatsImportant/WhatsImportantList';
import FactorsList from './Containers/Admin/Factors/FactorsList';
import SuggestionsList from './Containers/Admin/Suggestions/SuggestionsList';
import Categories from './Containers/Admin/Categories/Categories';
import NotFoundPage from './components/PageNotFound/PageNotFound';

import PainAvg from './Containers/UserDash/PainAvg/PainAvg';
import Plots from './Containers/UserDash/Plots/Plots';
//import PastSum from './Containers/UserDash/PastSum/PastSum';
import TreatmentAvg from './Containers/UserDash/TreatmentAvg/TreatmentAvg';

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};

const App = () => {
  return (
    <BrowserRouter basename="/">
      <div className="App">
        <Route component={ScrollToTop}/>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <PrivateRoute exact path="/home" component={Home}/>
          <PrivateRoute exact path="/notice" component={Notice}/>
          <PrivateRoute exact path="/intro" component={Intro}/>
          <PrivateRoute exact path="/questionnaire" component={Questionnaire}/>
          <PrivateRoute exact path="/whats-important-to-you" component={WhatsImportant}/>
          <Route path='/treatment-details/:treatment' render={(c) => <TreatmentDetails data={c}/>}/>
          <Redirect exact from='/review-and-select' to='/review-and-select/recommendations' />
          <PrivateRoute path="/review-and-select/:tab" component={ReviewAndSelect}/>
          <PrivateRoute exact path="/make-your-plan" component={Plan}/>
          <PrivateRoute exact path="/summary" component={Summary}/>

          <Redirect exact from='/adminPanel' to='/adminPanel/users' />
          {/* <AdminRoute exact path="/adminPanel/dashboard" component={Dashboard}/> */}
          <AdminRoute exact path="/adminPanel/users" component={UsersList}/>
          <AdminRoute exact path="/adminPanel/treatments" component={TreatmentsList}/>
          <AdminRoute exact path="/adminPanel/studies" component={Studies}/>
          <AdminRoute exact path="/adminPanel/studyResults" component={studyResults}/>
          <AdminRoute exact path="/adminPanel/treatmentClassifications" component={TreatmentClassifications}/>
          <AdminRoute exact path="/adminPanel/medications" component={MedicationsList}/>
          <AdminRoute exact path="/adminPanel/medicationClassifications" component={MedicationsClassifications}/>
          <AdminRoute exact path="/adminPanel/whatsimportant" component={WhatsImportantList}/>
          <AdminRoute exact path="/adminPanel/factors" component={FactorsList}/>
          <AdminRoute exact path="/adminPanel/suggestions" component={SuggestionsList}/>
          <AdminRoute exact path="/adminPanel/categories" component={Categories}/>

          <Redirect exact from='/userPanel' to='/userPanel/average'/>
          <PrivateRoute exact path="/userPanel/average" component={PainAvg}/>
          <PrivateRoute exact path="/userPanel/manage" component={Plots}/>
          <PrivateRoute exact path="/userPanel/treatments" component={TreatmentAvg}/>
         {/*  <PrivateRoute exact path="/userPanel/summary" component={PastSum}/> */}

          <Route path="" component={NotFoundPage} />

          {/* <Redirect to="" /> */}
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
