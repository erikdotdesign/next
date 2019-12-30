// @ts-ignore
import sketch from 'sketch/dom';
// @ts-ignore
import ui from 'sketch/ui';

import { validSelection, getArtboard, getImages } from '../resources/utils/commandUtils';
import { createWebView, webViewShutdown } from '../resources/utils/webView';

export default (context: any) => {
  if (validSelection(context.selection)) {
    const artboard = getArtboard(sketch, context);
    const images = getImages(artboard.layers, sketch);
    createWebView({artboard, images});
  } else {
    ui.alert('Invalid Selection', 'Select an artboard to export.');
  }
}

export const onShutdown = () => {
  webViewShutdown();
}