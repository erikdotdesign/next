import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// @ts-ignore
// ignores window.renderApp
window.renderApp = (artboard, layers) => {
    ReactDOM.render(React.createElement(App, { artboard: artboard, layers: layers }), document.getElementById('root'));
};
