import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'whatwg-fetch';

import 'root/general.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppComponent } from "root/components/App";

initApp();

function initApp() {
    const root = document.getElementById('root');

    const renderApp = () => {
        return (
            <AppComponent/>
        )
    }

    const render = () => {
        if (root) {
            ReactDOM.render(
                renderApp(),
                root,
            );
        }
    };

    render();
}

