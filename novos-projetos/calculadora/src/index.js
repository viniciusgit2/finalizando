import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calculator from './main/Calculator';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <div>
        <h1>Calculadora modificada</h1>
        <Calculator />
    </div>
, document.getElementById('root'));
registerServiceWorker();
