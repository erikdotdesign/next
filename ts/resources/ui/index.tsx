import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// @ts-ignore
// ignores window.renderApp
window.renderApp = (store: any, theme: next.Theme) => {
  let image = new Image();
  image.src = store.artboardImage;
  image.onload = () => {
    ReactDOM.render(
      <App
        composing={true}
        artboard={store.artboard}
        images={store.images}
        svgs={store.svgs}
        notes={store.notes}
        theme={theme}
        artboardImage={image} />,
      document.getElementById('root')
    );
  };
};