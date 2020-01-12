import React from 'react';
import ReactDOM from 'react-dom';
import gsap from 'gsap';
import App from './components/App';
window.$baseZoom = 0;
window.$startZoom = 0;
window.$zoom = 1;
window.$renderZoom = () => {
    gsap.set('#artboard', { scale: window.$zoom });
};
// @ts-ignore
// ignores window.renderApp
window.renderApp = (store) => {
    ReactDOM.render(React.createElement(App, { artboard: store.artboard, images: store.images, svgs: store.svgs }), document.getElementById('root'));
};
