import getArtboard from './artboard';
import getImages from './images';
import getSVGs from './svgs';

const getStore = (page: srm.Page, selectedArtboard: srm.Artboard, sketch: srm.Sketch): srm.Store => {
  // get final store items
  const artboard: srm.Artboard = getArtboard(page, selectedArtboard, sketch);
  const images: srm.AppAsset[] = getImages(page, artboard.layers, sketch);
  const svgs: srm.AppAsset[] = getSVGs(page, artboard.layers, sketch);
  const notes: any = {};
  // remove duplicate artboard
  artboard.remove();
  // run callback
  return {
    artboard,
    images,
    svgs,
    notes
  }
};

export default getStore;