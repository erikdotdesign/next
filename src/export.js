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
            getStore(sketch, (store) => {
                webContents.executeJavaScript(`renderApp(${JSON.stringify(store)})`);
            });
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
