import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from '../Components/LandingPage/LandingPage';
import AdoptionPage from '../Components/AdoptionPage/AdoptionPage';
import './root.css';

function Root() {
  return (
    <div className='root'>
      <Switch>
        <Route exact path={'/'} component={LandingPage} />
        <Route path={'/adopt'} component={AdoptionPage} />
      </Switch>
    </div>
  )
}

export default Root
