import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// @ts-ignore
// ignores window.renderApp
window.renderApp = (store) => {
    ReactDOM.render(React.createElement(App, { artboard: store.artboard, images: store.images, svgs: store.svgs }), document.getElementById('root'));
};
