import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ThemeProvider from './components/ThemeProvider';
// @ts-ignore
// ignores window.renderApp
window.renderApp = (store, theme) => {
    ReactDOM.render(React.createElement(ThemeProvider, { theme: theme },
        React.createElement(App, { artboard: store.artboard, images: store.images, svgs: store.svgs, notes: store.notes, composing: true })), document.getElementById('root'));
};
