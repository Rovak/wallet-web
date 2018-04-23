import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import "./scripts.js";
import App from './components/App';
import {unregister} from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
unregister();
