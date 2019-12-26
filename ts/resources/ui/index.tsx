import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// @ts-ignore
// ignores window.renderApp
window.renderApp = (artboard: any, layers: any, images: any) => {
  ReactDOM.render(
    <App artboard={artboard} layers={layers} images={images} />,
    document.getElementById('root')
  );
};