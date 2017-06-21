import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { init, getManifest } from 'd2/lib/d2';

import configureStore from './configureStore';
import App from './App';

import './index.css';

// material-ui
injectTapEventPlugin();

// d2
getManifest('manifest.webapp').then((manifest) => {
    const baseUrl = process.env.NODE_ENV === 'production' ? manifest.getBaseUrl() : 'http://localhost:8080';

    init({
        baseUrl: baseUrl + '/api',
        headers: {
            Authorization: 'Basic YWRtaW46ZGlzdHJpY3Q='
        },
        schemas: []
    }).then((d2) => {
        indexRender(d2);
    });
});

const store = configureStore();

const indexRender = (d2) => {
    render(
        <MuiThemeProvider>
            <Provider store={ store }>
                <App d2={d2} />
            </Provider>
        </MuiThemeProvider>,
        document.getElementById('root')
    );
};