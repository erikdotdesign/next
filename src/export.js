// @ts-ignore
import sketch from 'sketch/dom';
// @ts-ignore
import ui from 'sketch/ui';
// @ts-ignore
import BrowserWindow from 'sketch-module-web-view';
// @ts-ignore
import { getWebview } from 'sketch-module-web-view/remote';
import { validSelection, getStore } from '../resources/utils/commandUtils';
const webviewIdentifier = 'measure.webview';
export default (context) => {
    if (validSelection(context.selection)) {
        // get store
        const store = getStore(sketch);
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
        browserWindow.loadURL(require('../resources/ui/index.html'));
        // show browser window when ready
        browserWindow.once('ready-to-show', () => {
            browserWindow.show();
        });
        // render app once webview contents loaded
        webContents.on('did-finish-load', () => {
            webContents.executeJavaScript(`renderApp(${JSON.stringify(store)})`);
        });
    }
    else {
        ui.alert('Invalid Selection', 'Select an artboard to export.');
    }
};
export const onShutdown = () => {
    const existingWebview = getWebview(webviewIdentifier);
    if (existingWebview) {
        existingWebview.close();
    }
};
