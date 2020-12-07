import 'react-app-polyfill/ie11';//ie11兼容
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import addGlobalMethods from './utils/index'
addGlobalMethods(React)

ReactDOM.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
  ,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
