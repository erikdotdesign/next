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
export default (context) => {
    const selection = context.selection;
    const validSelection = utils.validSelection(selection);
    if (validSelection) {
        // get artboard
        const artboard = utils.getArtboard(sketch, context);
        // get images from artboard
        const images = utils.getImages(artboard.layers, sketch);
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
            webContents.executeJavaScript(`renderApp(
        ${JSON.stringify(artboard)},
        ${JSON.stringify(images)}
      )`);
        });
    }
    else {
        // display alert if no artboard is selected
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
