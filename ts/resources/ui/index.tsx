import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// @ts-ignore
// ignores window.renderApp
window.renderApp = (artboard: any, layers: any) => {
  ReactDOM.render(
    <App artboard={artboard} layers={layers} />,
    document.getElementById('root')
  );
};