import React, { Component } from 'react';
import './App.css';
import './media/theme.css';
import Conversation from './components/Conversation';
import ToolKit from './components/ToolKit';
import TheoryMap from './components/TheoryMap';
import About from './components/About';
import AppBar from './components/AppBar';
import { Route } from 'react-router-dom';
import MessageForm from './components/MessageForm';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <AppBar />
          <Route exact path="/" component={ Conversation } />
          <Route exact path="/dialog" component={ Conversation } />
          <Route exact path="/toolkit" component={ ToolKit } />
          <Route exact path="/map" component={ TheoryMap } />
          <Route exact path="/about" component={ About } />
          <Route exact path="/admin/edit" component={ MessageForm } />
        </div>
      </Router>
    );
  }
}

export default App;
