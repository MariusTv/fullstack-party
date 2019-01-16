import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AppRouter from '../routers/AppRouter';
import 'normalize.css/normalize.css';
import '../../sass/app.scss';

ReactDOM.render(<AppRouter/>, document.getElementById('app'));
