import getArtboard from './artboard';
import getImages from './images';
import getSVGs from './svgs';

const getStore = (page: srm.Page, selectedArtboard: srm.Artboard, sketch: srm.Sketch): srm.Store => {
  // get final store items
  const artboard: srm.Artboard = getArtboard(page, selectedArtboard, sketch);
  const images: srm.ImgAsset[] = getImages(page, artboard.layers, sketch);
  const svgs: srm.SvgAsset[] = getSVGs(page, artboard.layers, sketch);
  const notes: srm.Note[] = [];
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