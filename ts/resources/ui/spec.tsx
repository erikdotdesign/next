import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

let SRM_ARTBOARD_IMAGE = new Image();
// @ts-ignore
SRM_ARTBOARD_IMAGE.src = SRM_APP_STORE.artboardImage;
SRM_ARTBOARD_IMAGE.onload = () => {
  ReactDOM.render(
    <App
    composing={false}
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
    // @ts-ignore
    artboardImage={SRM_ARTBOARD_IMAGE} />,
    document.getElementById('root')
  );
};