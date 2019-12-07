import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
const render = () => {
    ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
};
render();
