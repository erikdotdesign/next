// @ts-ignore
import BrowserWindow from 'sketch-module-web-view';
// @ts-ignore
import { getWebview } from 'sketch-module-web-view/remote';
// @ts-ignore
import sketch from 'sketch/dom';
// @ts-ignore
import ui from 'sketch/ui';

import * as utils from '../resources/utils/commandUtils';

const webviewIdentifier = 'measure.webview';

export default () => {
  // get sketch document
  const document = sketch.getSelectedDocument();
  // get selected sketch artboard
  let selectedArtboard = utils.getSelectedArtboard(document.selectedPage);
  // load plugin if artboard selected
  if (selectedArtboard !== undefined) {
    // get store
    const store = utils.getStore(sketch, selectedArtboard);
    // set webview browser window
    const browserWindow = new BrowserWindow({
      identifier: webviewIdentifier,
      width: 1024,
      height: 768,
      minimizable: false,
      maximizable: false,
      resizable: false,
      fullscreenable: false,
      show: false
    });
    // set webview contents
    const webContents = browserWindow.webContents;
    // load react app
    browserWindow.loadURL(require('../resources/ui/index.html'));
    // show browser window when ready
    browserWindow.once('ready-to-show', () => {
      browserWindow.show();
    });
    // render app once webview contents loaded
    webContents.on('did-finish-load', () => {
      webContents.executeJavaScript(`renderApp(
        ${JSON.stringify(store.artboard)},
        ${JSON.stringify(store.images)}
      )`);
    });
  } else {
    // display alert if no artboard is selected
    ui.alert('Select artboard', 'Select an artboard to export.');
  }
}
// When the plugin is shutdown by Sketch (for example when the user disable the plugin)
// we need to close the webview if it's open
export const onShutdown = () => {
  const existingWebview = getWebview(webviewIdentifier);
  if (existingWebview) {
    existingWebview.close();
  }
}
