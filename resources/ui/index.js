import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// @ts-ignore
// ignores window.renderApp
window.renderApp = (artboard, layers, images) => {
    ReactDOM.render(React.createElement(App, { artboard: artboard, layers: layers, images: images }), document.getElementById('root'));
};
