import React from 'react';
import logo from './logo.svg';
import Dashboard from './containers/Dashboard';
import Signup from './containers/Signup';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <ErrorBoundary>
              <Dashboard />
            </ErrorBoundary>
          </Route>
          <Route path="/signup">
            <ErrorBoundary>
              <Signup />
            </ErrorBoundary>
          </Route>
          <Route path="/dashboard">
            <ErrorBoundary>
              <Dashboard />
            </ErrorBoundary>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
