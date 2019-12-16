import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// @ts-ignore
// ignores window.setupApp
window.setupApp = (artboard: any) => {
  ReactDOM.render(
    <App artboard={artboard} />,
    document.getElementById('root')
  );
};