import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// @ts-ignore
// ignores window.renderApp
ReactDOM.render(
  <App
    // @ts-ignore
    theme={SRM_APP_THEME}
    // @ts-ignore
    artboard={SRM_APP_STORE.artboard}
    // @ts-ignore
    images={SRM_APP_STORE.images}
    // @ts-ignore
    svgs={SRM_APP_STORE.svgs}
    // @ts-ignore
    notes={SRM_APP_STORE.notes}
    composing={false} />,
  document.getElementById('root')
);