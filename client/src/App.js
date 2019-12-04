import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Community from './pages/Community';
import JobDetail from './pages/JobDetail';
import CommunityDetail from './pages/CommunityDetail';
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

          <Route exact path="/community" component={Community} />
          <Route exact path="/community-detail" component={CommunityDetail} />

          <Route exact path="/employer-posts" component={EmployerPosts} />
          <Route exact path="/job-detail" component={JobDetail} />

          <Route component={NoMatch} />
        </Switch>
      </React.Fragment>
    </Router>
  );
};



export default App;
