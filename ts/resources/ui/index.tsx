import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// @ts-ignore
// ignores window.renderApp
window.renderApp = (store: any, theme: srm.Theme) => {
  let image = new Image();
  image.src = store.artboardImage;
  image.onload = () => {
    ReactDOM.render(
      <App
        artboard={store.artboard}
        images={store.images}
        svgs={store.svgs}
        notes={store.notes}
        theme={theme}
        composing={true}
        artboardImage={image} />,
      document.getElementById('root')
    );
  };
  // ReactDOM.render(
  //   <App
  //     artboard={store.artboard}
  //     images={store.images}
  //     svgs={store.svgs}
  //     notes={store.notes}
  //     theme={theme}
  //     composing={true} />,
  //   document.getElementById('root')
  // );
};