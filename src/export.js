// @ts-ignore
import BrowserWindow from 'sketch-module-web-view';
// @ts-ignore
// import { getWebview } from 'sketch-module-web-view/remote';
// @ts-ignore
import dom from 'sketch/dom';
// @ts-ignore
import ui from 'sketch/ui';
const webviewIdentifier = 'measure.webview';
export default () => {
    const document = dom.getSelectedDocument();
    const selectedPage = document.selectedPage;
    const getSelectedArtboard = () => {
        return selectedPage.layers.find((layer) => {
            if (layer.type === 'Artboard' && layer.selected) {
                return layer;
            }
        });
    };
    const selectedArtboard = getSelectedArtboard();
    if (selectedArtboard !== undefined) {
        const browserDims = {
            width: 1024,
            height: 768
        };
        const browserWindow = new BrowserWindow(Object.assign(Object.assign({}, browserDims), { identifier: webviewIdentifier, minimizable: false, maximizable: false, resizable: false, fullscreenable: false, show: false }));
        const webContents = browserWindow.webContents;
        browserWindow.loadURL(require('../resources/ui/index.html'));
        browserWindow.once('ready-to-show', () => {
            browserWindow.show();
        });
        webContents.on('did-finish-load', () => {
            webContents.executeJavaScript(`setupApp(${JSON.stringify(selectedArtboard)})`);
        });
        webContents.on('nativeLog', (s) => {
            console.log(s);
        });
    }
    else {
        ui.alert('Select artboard', 'Select an artboard to export.');
    }
};
// When the plugin is shutdown by Sketch (for example when the user disable the plugin)
// we need to close the webview if it's open
// export const onShutdown = () => {
//   const existingWebview = getWebview(webviewIdentifier);
//   if (existingWebview) {
//     existingWebview.close();
//   }
// }
