import { HashRouter } from 'react-router-dom';
import App from './components/App/App.js';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import store from './store.js';
import './vendor/normalize.css'
import './vendor/fonts.css'
import React from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
    <Provider store={store}>
    <App />
    </Provider>
    </HashRouter>
);
