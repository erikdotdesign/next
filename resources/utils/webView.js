// @ts-ignore
import BrowserWindow from 'sketch-module-web-view';
// @ts-ignore
import { getWebview } from 'sketch-module-web-view/remote';
const webviewIdentifier = 'measure.webview';
export const createWebView = (app) => {
    // set webview browser window
    const browserWindow = new BrowserWindow({
        identifier: webviewIdentifier,
        width: 1200,
        height: 900,
        minimizable: false,
        maximizable: false,
        resizable: false,
        fullscreenable: false,
        show: false
    });
    // set webview contents
    const webContents = browserWindow.webContents;
    // load react app
    browserWindow.loadURL(require('../ui/index.html'));
    // show browser window when ready
    browserWindow.once('ready-to-show', () => {
        browserWindow.show();
    });
    // render app once webview contents loaded
    webContents.on('did-finish-load', () => {
        webContents.executeJavaScript(`renderApp(
      ${JSON.stringify(app.artboard)},
      ${JSON.stringify(app.images)}
    )`);
    });
};
export const webViewShutdown = () => {
    const existingWebview = getWebview(webviewIdentifier);
    if (existingWebview) {
        existingWebview.close();
    }
};
