// @ts-ignore
import BrowserWindow from 'sketch-module-web-view';
// @ts-ignore
import { getWebview } from 'sketch-module-web-view/remote';
// @ts-ignore
import dom from 'sketch/dom';

const webviewIdentifier = 'measure.webview';

export default () => {

  const document = dom.getSelectedDocument();
  const selectedPage = document.selectedPage;
  const getSelectedArtboard = () => {
    return selectedPage.layers.find((layer: any) => {
      if (layer.type === 'Artboard' && layer.selected) {
        return layer;
      }
    });
  };
  const selectedArtboard = getSelectedArtboard();

  const browserWindow = new BrowserWindow({
    identifier: webviewIdentifier,
    width: 1024,
    height: 768,
    show: false
  });

  browserWindow.loadURL(require('../resources/ui/index.html'));

  browserWindow.once('ready-to-show', () => {
    browserWindow.show();
  });

  const webContents = browserWindow.webContents;

  webContents.on('did-finish-load', () => {
    webContents.executeJavaScript(`setupApp(${JSON.stringify(selectedArtboard)})`);
  });

  webContents.on('nativeLog', (s: any) => {
    console.log(s);
  });
}

// When the plugin is shutdown by Sketch (for example when the user disable the plugin)
// we need to close the webview if it's open
export const onShutdown = () => {
  const existingWebview = getWebview(webviewIdentifier);
  if (existingWebview) {
    existingWebview.close();
  }
}
