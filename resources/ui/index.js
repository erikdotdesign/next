import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// @ts-ignore
// ignores window.renderApp
window.renderApp = (artboard, images) => {
    ReactDOM.render(React.createElement(App, { artboard: artboard, images: images }), document.getElementById('root'));
};
