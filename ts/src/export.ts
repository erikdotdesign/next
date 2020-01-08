// @ts-ignore
import sketch from 'sketch/dom';
// @ts-ignore
import ui from 'sketch/ui';
// @ts-ignore
import BrowserWindow from 'sketch-module-web-view';
// @ts-ignore
import { getWebview } from 'sketch-module-web-view/remote';

import getStore from '../resources/store';

const webviewIdentifier = 'measure.webview';

export default () => {
  // get document, selectedLayers, and artboard
  const document: srm.Document = sketch.getSelectedDocument();
  const selectedLayers: srm.Selection = document.selectedLayers;
  const artboard = selectedLayers.layers.find((layer: srm.SketchLayer) => {
    return layer.type === 'Artboard' && layer.selected;
  });
  // if artboard selected, run command
  if (artboard) {
    // set webview browser window
    const browserWindow = new BrowserWindow({
      identifier: webviewIdentifier,
      width: 1200,
      height: 900,
      fullscreenable: false,
      show: false
    });
    //browserWindow.setAspectRatio(1.33);
    browserWindow.maximize();
    browserWindow.center();
    browserWindow.show();
    // set webview contents
    const webContents = browserWindow.webContents;
    // load react app
    browserWindow.loadURL(require('../resources/ui/index.html'));
    // render app once webview contents loaded
    webContents.on('did-finish-load', () => {
      //@ts-ignore
      getStore(artboard, sketch, (store: srm.Store) => {
        webContents.executeJavaScript(`renderApp(${JSON.stringify(store)})`);
      });
    });
  } else {
    // if artboard not selected, alert user
    ui.alert('Invalid Selection', 'Select an artboard to export.');
  }
}

export const onShutdown = () => {
  const existingWebview = getWebview(webviewIdentifier);
  if (existingWebview) {
    existingWebview.close();
  }
}