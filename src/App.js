import React, { Component } from "react";
import "./App.css";
import VideoList from "./components/VideoList.js";
import { Navbar } from "./components/Navbar.js";
import Stats from "./components/Stats.js";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Route exact path="/" component={VideoList} />
          <Route exact path="/stats" component={Stats} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
