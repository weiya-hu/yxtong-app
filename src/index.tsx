import React from 'react';
import ReactDOM from 'react-dom';
import 'index.scss';
import Router from 'router/index'
import reportWebVitals from 'reportWebVitals';
import {util} from 'utils/news'
import 'lib-flexible'

util.firstTokenUserinfo().then(()=>{
  ReactDOM.render(
      <Router />,
    document.getElementById('root')
  );
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// util.firstToken()
