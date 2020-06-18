import 'styles/index.scss';
import 'typeface-roboto';

import { CssBaseline } from '@material-ui/core';
import AppRouter from 'components/base/AppRouter';
import ThemeProvider from 'components/base/ThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <ThemeProvider>
        <CssBaseline />
        <AppRouter />
    </ThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
