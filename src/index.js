import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Button } from 'patternfly-react'

ReactDOM.render(<App/>, document.getElementById('root'));
ReactDOM.render(<Button> {document.getElementById('inputButton').textContent} </Button>, document.getElementById('inputButton'));
registerServiceWorker();
