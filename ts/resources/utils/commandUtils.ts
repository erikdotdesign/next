import getArtboard from './artboard';
import getImages from './images';
import getSVGs from './svgs';

export const validSelection = (selection: any): boolean => {
  const notEmpty = selection.count() == 1;
  if (notEmpty && selection.firstObject().class() == 'MSArtboardGroup') {
    return true;
  } else {
    return false;
  }
};

export const getStore = (sketch: srm.Sketch): srm.Store => {
  // get final store items
  const artboard: srm.Artboard = getArtboard(sketch);
  const images: srm.Base64Image[] = getImages(artboard.layers, sketch);
  const svgs: srm.SvgPath[] = getSVGs(artboard.layers);
  // remove duplicate artboard
  artboard.remove();
  // return final store
  return {
    artboard,
    images,
    svgs
  }
};