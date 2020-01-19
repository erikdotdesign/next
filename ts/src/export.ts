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

export default (context: any) => {
  // get document, selectedLayers, and artboard
  const document: srm.Document = sketch.getSelectedDocument();
  const selectedLayers: srm.Selection = document.selectedLayers;
  const artboard = selectedLayers.layers.find((layer: srm.SketchLayer) => {
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
    // open save prompt on save
    webContents.on('save', (notes: string) => {
      // add notes to store
      store.notes = JSON.parse(notes);
      // stringify store for export
      let data = JSON.stringify(store);
      // get save path
      let savePath = pluginExport.getSavePath(context);
      // get plugin root
      let pluginRoot = pluginExport.getRoot(context);
      // get js path
      let scriptPath = `${pluginRoot}/Contents/Resources/resources_ui_spec.js`;
      // get js map path
      let scriptSourceMapPath = `${pluginRoot}/Contents/Resources/resources_ui_spec.js.map`;
      // get css path
      let stylesPath = require('../resources/ui/style.css').replace('file://', '');
      // get html path
      let templatePath = require('../resources/ui/spec.html').replace('file://', '');
      // get css file name
      // 32 + . + extension
      let styleName = stylesPath.substr(-36);
      // get contents of html
      let template = pluginExport.getFileContent(templatePath);
      // get contents of css
      let styles = pluginExport.getFileContent(stylesPath);
      // get contents of js
      let script = pluginExport.getFileContent(scriptPath);
      // add store to js string
      let scriptWithStore = `var store = ${data}; ${script}`;
      // get contents of js map
      let scriptSourceMap = pluginExport.getFileContent(scriptSourceMapPath);
      // create final html
      pluginExport.writeFile({
        content: template,
        path: `${savePath}`,
        fileName: 'spec.html'
      });
      // create final css
      pluginExport.writeFile({
        content: styles,
        path: `${savePath}`,
        fileName: styleName
      });
      // create final js
      pluginExport.writeFile({
        content: scriptWithStore,
        path: `${savePath}`,
        fileName: 'resources_ui_spec.js'
      });
      // create final js map
      pluginExport.writeFile({
        content: scriptSourceMap,
        path: `${savePath}`,
        fileName: 'resources_ui_spec.js.map'
      });
    });
  } else {
    // if artboard not selected, alert user
    ui.alert('Invalid Selection', 'Select an artboard to export.');
  }
}

export const onShutdown = () => {
  const existingWebview = getWebview(webviewIdentifier);
  if (existingWebview) {
    existingWebview.close();
  }
}