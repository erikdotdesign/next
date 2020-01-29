import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ThemeProvider from './components/ThemeProvider';

// @ts-ignore
// ignores window.renderApp
window.renderApp = (store: srm.Store, theme: string) => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <App
        artboard={store.artboard}
        images={store.images}
        svgs={store.svgs}
        notes={store.notes}
        composing={true} />
    </ThemeProvider>,
    document.getElementById('root')
  );
};