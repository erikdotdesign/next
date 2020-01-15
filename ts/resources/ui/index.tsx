import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// @ts-ignore
// ignores window.renderApp
window.renderApp = (store: any) => {
  ReactDOM.render(
    <App
      artboard={store.artboard}
      images={store.images}
      svgs={store.svgs}
      notes={store.notes}
      composing={true} />,
    document.getElementById('root')
  );
};