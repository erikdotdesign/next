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
const appWindowIdentifier = 'srm.appWindow';
const loadingWindowIdentifier = 'srm.loadingWindow';
export default (context) => {
    // close any existing windows
    const existingAppWindow = getWebview(appWindowIdentifier);
    const existingLoadingWindow = getWebview(loadingWindowIdentifier);
    if (existingAppWindow) {
        existingAppWindow.close();
    }
    else if (existingLoadingWindow) {
        existingLoadingWindow.close();
    }
    // get sketch document
    const document = sketch.getSelectedDocument();
    // get sketch selected page
    const page = document.selectedPage;
    // get sketch selected layers
    const selectedLayers = document.selectedLayers;
    // get sketch selected artboard
    //@ts-ignore
    const selectedArtboard = selectedLayers.layers.find((layer) => {
        return layer.type === 'Artboard' && layer.selected;
    });
    // if artboard selected, run command
    if (selectedArtboard) {
        // set base store
        let store = null;
        // base styles
        let baseStyleContent;
        // set theme
        const theme = ui.getTheme();
        // set loading modal window
        const loadingWindow = new BrowserWindow({
            identifier: loadingWindowIdentifier,
            parent: document,
            modal: true,
            show: false
        });
        // set app window
        const appWindow = new BrowserWindow({
            identifier: appWindowIdentifier,
            width: 1200,
            height: 900,
            fullscreenable: false,
            show: false
        });
        // load loading.html in loading modal
        loadingWindow.loadURL(require(`../resources/ui/loading.html`));
        // set loading window contents
        const loadingWebContents = loadingWindow.webContents;
        // display loading modal when loaded
        loadingWebContents.on('did-finish-load', () => {
            // set loading text based on theme
            loadingWebContents.executeJavaScript(`setLoadingColor('${theme}')`).then(() => {
                // show loading window after text is styled
                loadingWindow.show();
                // load app index
                appWindow.loadURL(require('../resources/ui/index.html'));
            });
        });
        // make loading window closable
        loadingWebContents.on('escape', () => {
            if (!appWebContents.isLoading()) {
                loadingWindow.close();
            }
        });
        // set app window contents
        const appWebContents = appWindow.webContents;
        // wait till app index finished loading
        appWebContents.on('did-finish-load', () => {
            // get store when index loads
            getStore(page, selectedArtboard, sketch, (appStore) => {
                // update loading text then render app
                loadingWebContents.executeJavaScript(`setLoadingText('Rendering', 'Building spec')`).then(() => {
                    // set plugin store
                    store = appStore;
                    // render react app
                    appWebContents.executeJavaScript(`renderApp(
            ${JSON.stringify(appStore)},
            ${JSON.stringify(theme)}
          )`).then(() => {
                        // embed temp fonts
                        let stylesPath = require('../resources/ui/style.css').replace('file://', '');
                        let styleName = stylesPath.substr(-36);
                        baseStyleContent = pluginExport.getFileContent(stylesPath);
                        pluginExport.writeFile({
                            content: pluginExport.embedTempFonts(appStore.fonts, `${baseStyleContent}`),
                            path: stylesPath,
                            fileName: styleName
                        });
                        // after react app renders,
                        // close loading window and show app window
                        loadingWindow.close();
                        // maximize and center app window before showing
                        appWindow.maximize();
                        appWindow.center();
                        appWindow.show();
                    });
                });
            });
        });
        // if app failed to load,
        // close windows and display alert
        appWebContents.on('did-fail-load', () => {
            loadingWindow.close();
            appWindow.close();
            ui.alert('Error', 'Spec failed to load.');
        });
        // open save prompt on save
        appWebContents.on('save', (params) => {
            var _a;
            // set save store
            let saveStore = store;
            // parse save params
            let saveParams = JSON.parse(params);
            // add notes to store
            saveStore.notes = saveParams.notes;
            // get final store
            let finalStore = pluginExport.getFinalStore(saveStore);
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
            // get html spec path
            let templatePath = require('../resources/ui/spec.html').replace('file://', '');
            // get css file name
            // 32 + . + extension
            let styleName = stylesPath.substr(-36);
            // get contents of html
            let template = pluginExport.getFileContent(templatePath);
            // get contents of css
            // let styles = pluginExport.getFileContent(stylesPath);
            // get contents of js
            let script = pluginExport.getFileContent(scriptPath);
            // add store and theme to js string
            let scriptWithGlobals = `var SRM_APP_THEME = '${saveParams.theme}'; var SRM_APP_STORE = ${finalStore}; ${script}`;
            // get contents of js map
            let scriptSourceMap = pluginExport.getFileContent(scriptSourceMapPath);
            // create final html
            pluginExport.writeFile({
                content: template,
                path: savePath,
                fileName: 'spec.html'
            });
            // create final css
            pluginExport.writeFile({
                content: pluginExport.embedFonts((_a = store) === null || _a === void 0 ? void 0 : _a.fonts, `${baseStyleContent}`),
                path: savePath,
                fileName: styleName
            });
            // create final js
            pluginExport.writeFile({
                content: scriptWithGlobals,
                path: savePath,
                fileName: 'resources_ui_spec.js'
            });
            // create final js map
            pluginExport.writeFile({
                content: scriptSourceMap,
                path: savePath,
                fileName: 'resources_ui_spec.js.map'
            });
            // move images from temp folder to spec
            if (saveStore.images.length > 0) {
                pluginExport.moveImages(saveStore.images, savePath);
            }
            // move svgs from temp folder to spec
            if (saveStore.svgs.length > 0) {
                pluginExport.moveSVGs(saveStore.svgs, savePath);
            }
            // copy fonts used in spec
            if (Object.keys(saveStore.fonts).length > 0) {
                pluginExport.moveFonts(saveStore.fonts, savePath);
            }
        });
    }
    else {
        // if artboard not selected, alert user
        ui.alert('Invalid Selection', 'Select an artboard to export.');
    }
};
export const onShutdown = () => {
    const existingAppWindow = getWebview(appWindowIdentifier);
    const existingLoadingWindow = getWebview(loadingWindowIdentifier);
    if (existingAppWindow) {
        existingAppWindow.close();
    }
    else if (existingLoadingWindow) {
        existingLoadingWindow.close();
    }
};
