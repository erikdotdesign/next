// @ts-ignore
import BrowserWindow from 'sketch-module-web-view';
// @ts-ignore
import { getWebview } from 'sketch-module-web-view/remote';
// @ts-ignore
import UI from 'sketch/ui';

const webviewIdentifier = 'measure.webview';

export default () => {
  const options = {
    identifier: webviewIdentifier,
    width: 768,
    height: 480,
    show: false
  }

  const browserWindow = new BrowserWindow(options);

  browserWindow.once('ready-to-show', () => {
    browserWindow.show();
  });

  browserWindow.loadURL(require('../../resources/webview.html'));
}

// When the plugin is shutdown by Sketch (for example when the user disable the plugin)
// we need to close the webview if it's open
export const onShutdown = () => {
  const existingWebview = getWebview(webviewIdentifier);
  if (existingWebview) {
    existingWebview.close();
  }
}
