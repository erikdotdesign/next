import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// @ts-ignore
// ignores window.renderApp
ReactDOM.render(
  <App
    // @ts-ignore
    theme={theme}
    // @ts-ignore
    artboard={store.artboard}
    // @ts-ignore
    images={store.images}
    // @ts-ignore
    svgs={store.svgs}
    // @ts-ignore
    notes={store.notes}
    composing={false} />,
  document.getElementById('root')
);