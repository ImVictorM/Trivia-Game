import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';

class App extends Component {
  render() {
    return (
      <main className="App">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/settings" component={ Settings } />
          {/* <Route path="/formdisplay" component={ FormDataDisplay } /> */}
        </Switch>
      </main>
    );
  }
}
export default App;
