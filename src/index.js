import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import 'antd/dist/antd.min.css';
import { Provider } from 'react-redux';
import store from './App/store.js'

ReactDOM.render(
    <Router>
  <Provider store={store}>
  <App />
</Provider>
 

</Router>
, document.getElementById('root'));


