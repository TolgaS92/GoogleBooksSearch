import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Search from './pages/Search';
import Saved from './pages/Saved';
import Wrapper from './components/Wrapper';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Wrapper>
          {/* <Route exact path="/" component={Search} /> */}
          {/* <Route exact path="/search" component={Search} /> */}
          <Route exact path={["/", "/search"]}>
            <Search />
          </Route>
          <Route exact path={["/saved","/books/:id"]}>
            <Saved />
          </Route>
          {/* <Route exact path="/saved" component={Saved} /> */}
        </Wrapper>
      </div>
    </Router>
  );
}

export default App;
