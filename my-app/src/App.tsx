import React from 'react';
import './App.css';
import Nav from "./components/NavBar"
import Component from "./components/Campaign"
function App() {
  return (
    <div className="App">
      <Nav/>
      <h5>This is main page!</h5>
      <Component/>
      </div>
  );
}

export default App;
