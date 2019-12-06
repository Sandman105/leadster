import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Community from './pages/Community';
import EmployerJobDetail from './pages/EmployerJobDetail';
import CommunityJobDetail from './pages/CommunityJobDetail';
import CommunitySavedDetail from './pages/CommunitySavedDetail';
import EmployerPosts from './pages/EmployerPosts';
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

          <Route path="/community" component={Community} />
          <Route path="/community-job-detail" component={CommunityJobDetail} />
          {/* <Route path="/community-saved-detail" component={CommunitySavedDetail} /> */}

          <Route path="/employer-posts" component={EmployerPosts} />
          <Route path="/employer-job-detail" component={EmployerJobDetail} />

          <Route component={NoMatch} />
        </Switch>
      </React.Fragment>
    </Router>
  );
};

export default App;
