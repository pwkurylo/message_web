import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import MessageIndex from './MessageIndex';
import MessageShow from './MessageShow';

ReactDOM.render(
  <Router> 
    {/* <Route path="/id/:id" component={MessageShow} /> */}
    <Route path="/app" component={MessageIndex} />  
    <Route path="/id/:id" component={MessageShow} />
  </Router>,
  document.getElementById('root')
);

