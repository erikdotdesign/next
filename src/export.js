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
    const store = utils.getStore(sketch);
    if (store.artboard !== undefined) {
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
        const webContents = browserWindow.webContents;
        browserWindow.loadURL(require('../resources/ui/index.html'));
        browserWindow.once('ready-to-show', () => {
            browserWindow.show();
        });
        webContents.on('did-finish-load', () => {
            webContents.executeJavaScript(`renderApp(
        ${JSON.stringify(store.artboard)},
        ${JSON.stringify(store.layers)}
      )`);
        });
        webContents.on('getImage', function (id) {
            const image = store.images.find((img) => img.id === id);
            return image.url;
        });
    }
    else {
        ui.alert('Select artboard', 'Select an artboard to export.');
    }
};
// When the plugin is shutdown by Sketch (for example when the user disable the plugin)
// we need to close the webview if it's open
export const onShutdown = () => {
    const existingWebview = getWebview(webviewIdentifier);
    if (existingWebview) {
        existingWebview.close();
    }
};
