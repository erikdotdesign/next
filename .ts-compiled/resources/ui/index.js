import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// @ts-ignore
window.setupApp = (artboard) => {
    ReactDOM.render(React.createElement(App, { artboard: artboard }), document.getElementById('root'));
};
