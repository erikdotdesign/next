import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// @ts-ignore
window.setupApp = (artboard) => {
    ReactDOM.render(<App artboard={artboard}/>, document.getElementById('root'));
};
