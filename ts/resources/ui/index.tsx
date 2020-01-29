import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// @ts-ignore
// ignores window.renderApp
window.renderApp = (store: srm.Store, theme: srm.Theme) => {
  ReactDOM.render(
    <App
      artboard={store.artboard}
      images={store.images}
      svgs={store.svgs}
      notes={store.notes}
      theme={theme}
      composing={true} />,
    document.getElementById('root')
  );
};