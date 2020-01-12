import React from 'react';
import ReactDOM from 'react-dom';
import gsap from 'gsap';
import App from './components/App';
import ZoomProvider from './components/ZoomProvider';
import { ZoomContext } from './components/ZoomProvider';

window.$baseZoom = 0;
window.$startZoom = 0;
window.$zoom = 1;
window.$renderZoom = () => {
  gsap.set('#artboard', {scale: window.$zoom});
};

// @ts-ignore
// ignores window.renderApp
window.renderApp = (store: any) => {
  ReactDOM.render(
    <ZoomProvider>
      <ZoomContext.Consumer>
        {(context: any) => (
          <App
            context={context}
            artboard={store.artboard}
            images={store.images}
            svgs={store.svgs} />
        )}
      </ZoomContext.Consumer>
    </ZoomProvider>,
    document.getElementById('root')
  );
};