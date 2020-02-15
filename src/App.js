import React, {Fragment} from 'react';
import  './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './views/homePage';
import About from './views/aboutPage'
import Page from './views/blogPage';
import Navi from './components/NaviCom';
import AppFooter from './components/footerCom'

function App() {
  return (
    <Fragment>
    <div className="App">
      <Router >
      
        <Navi />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/blog/:id" render={(props) => <Page {...props} />}/>
            
          
          <Route path="/">
            <Home />
          </Route>
        </Switch>
     
    </Router>
 
    </div>
    <AppFooter />
    </Fragment>
  );
}

export default App;
