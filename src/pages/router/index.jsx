import React from 'react';
import ReactDom from 'react-dom';

import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Home</h1>
    <ul>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/inbox">Inbox</Link></li>
    </ul>
  </div>
);

const About = () => (
  <p>About page</p>
);

const Inbox = () => (
  <p>Inbox page</p>
);

const App = () => (
  <Switch>
    <Route exact path="/router.html" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/inbox" component={Inbox} />
  </Switch>
);

ReactDom.render(
  (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById('root'),
);
