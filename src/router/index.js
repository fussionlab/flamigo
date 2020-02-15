import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BlogPage from '../views/blogPage'
<Router> 
     <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/blog/:id" >
            <BlogPage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
     
</Router>

  export default router