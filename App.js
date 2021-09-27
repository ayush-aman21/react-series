
// import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import React, { Component } from 'react'
import Navbar from './Component/Navbar';
import News from './Component/News';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        
        <Switch>
          <Route exact path="/"><News pagesize={6} key="home" country='in' category="general"/></Route>
          <Route exact path="/business"><News key="business" pagesize={6} country='in' category="business"/></Route>
          <Route exact path="/entertainment"><News keys="entertainment" pagesize={6} country='in' category="entertainment"/></Route>
          <Route exact path="/general"><News keys="general" pagesize={6} country='in' category="general"/></Route>
          <Route exact path="/health"><News keys="health" pagesize={6} country='in' category="health"/></Route>
          <Route exact path="/science"><News keys="science" pagesize={6} country='in' category="science"/></Route>
          <Route exact path="/sports"><News keys="sports" pagesize={6} country='in' category="sports"/></Route>
          <Route exact path="/technology"><News keys="technology" pagesize={6} country='in' category="technology"/></Route>
        </Switch>
        </Router>
        </div>
    )
  }
}



