import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// @ts-ignore
// ignores window.renderApp
window.renderApp = (artboard, images, svgs) => {
    ReactDOM.render(React.createElement(App, { artboard: artboard, images: images, svgs: svgs }), document.getElementById('root'));
};
