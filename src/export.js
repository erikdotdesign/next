// @ts-ignore
import sketch from 'sketch/dom';
// @ts-ignore
import ui from 'sketch/ui';
// @ts-ignore
import BrowserWindow from 'sketch-module-web-view';
// @ts-ignore
import { getWebview } from 'sketch-module-web-view/remote';
import getStore from '../resources/store';
import * as pluginExport from '../resources/export';
const webviewIdentifier = 'measure.webview';
export default (context) => {
    // get document, selectedLayers, and artboard
    const document = sketch.getSelectedDocument();
    const selectedLayers = document.selectedLayers;
    const artboard = selectedLayers.layers.find((layer) => {
        return layer.type === 'Artboard' && layer.selected;
    });
    // if artboard selected, run command
    if (artboard) {
        //@ts-ignore
        let store = getStore(artboard, sketch);
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
            webContents.executeJavaScript(`renderApp(${JSON.stringify(store)})`);
        });
        webContents.on('save', (notes) => {
            //@ts-ignore
            store.notes = JSON.parse(notes);
            let data = JSON.stringify(store);
            let savePath = pluginExport.getSavePath(context);
            let pluginRoot = pluginExport.getRoot(context);
            let scriptPath = `${pluginRoot}/Contents/Resources/resources_ui_spec.js`;
            let scriptSourceMapPath = `${pluginRoot}/Contents/Resources/resources_ui_spec.js.map`;
            let stylesPath = require('../resources/ui/style.css').replace('file://', '');
            let templatePath = require('../resources/ui/spec.html').replace('file://', '');
            // 32 + . + extension
            let styleName = stylesPath.substr(-36);
            //@ts-ignore
            let template = NSString.stringWithContentsOfFile_encoding_error(templatePath, 4, nil);
            //@ts-ignore
            let styles = NSString.stringWithContentsOfFile_encoding_error(stylesPath, 4, nil);
            //@ts-ignore
            let script = NSString.stringWithContentsOfFile_encoding_error(scriptPath, 4, nil);
            let scriptWithStore = `var store = ${data}; ${script}`;
            //@ts-ignore
            let scriptSourceMap = NSString.stringWithContentsOfFile_encoding_error(scriptSourceMapPath, 4, nil);
            pluginExport.writeFile({
                content: template,
                path: `${savePath}`,
                fileName: 'spec.html'
            });
            pluginExport.writeFile({
                content: styles,
                path: `${savePath}`,
                fileName: styleName
            });
            pluginExport.writeFile({
                content: scriptWithStore,
                path: `${savePath}`,
                fileName: 'spec.js'
            });
            pluginExport.writeFile({
                content: scriptSourceMap,
                path: `${savePath}`,
                fileName: 'resources_ui_spec.js.map'
            });
        });
    }
    else {
        // if artboard not selected, alert user
        ui.alert('Invalid Selection', 'Select an artboard to export.');
    }
};
export const onShutdown = () => {
    const existingWebview = getWebview(webviewIdentifier);
    if (existingWebview) {
        existingWebview.close();
    }
};
