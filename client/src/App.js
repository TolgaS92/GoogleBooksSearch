import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar';
import Search from './components/Search';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path={["/", "/books"]}>
          
          </Route>
          <Route exact path="/books/:id">
          
          </Route>
          <Route>
          
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
