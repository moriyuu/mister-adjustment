import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { handleAuthClick, handleSignoutClick } from "./cal";

class App extends Component {
  
  render() {    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Mr. Adjustment</h1>
        </header>
        <button id="authorize-button" onClick={handleAuthClick}>
          Authorize
        </button>
        <button id="signout-button" onClick={handleSignoutClick}>
          Sign Out
        </button>
        <pre
          id="content"
          style={{
            textAlign: "right",
            maxWidth: "400px",
            margin: "0 auto"
          }}
        />
      </div>
    );
  }
}

export default App;
