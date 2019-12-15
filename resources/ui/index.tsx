import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// @ts-ignore
window.setupApp = (artboard: any) => {
  ReactDOM.render(
    <App artboard={artboard} />,
    document.getElementById('root')
  );
};