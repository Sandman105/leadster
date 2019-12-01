import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Community from './pages/Community';
import Leads from './pages/Leads';
import CommunityDetail from './pages/CommunityDetail';
import EmployerProfile from './pages/EmployerProfile';
import NoMatch from './pages/NoMatch';

const App = () => {
  return (
    <Router>
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/community" component={Community} />
          <Route exact path="/leads" component={Leads} />
          <Route exact path="community-detail" component={CommunityDetail} />
          <Route exact path="/employer-profile" component={EmployerProfile} />
          <Route component={NoMatch} />
        </Switch>
      </React.Fragment>
    </Router>
  );
};



export default App;
