import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// @ts-ignore
// ignores window.renderApp
window.renderApp = (artboard: any, images: any, svgs: any) => {
  ReactDOM.render(
    <App
      artboard={artboard}
      images={images}
      svgs={svgs} />,
    document.getElementById('root')
  );
};