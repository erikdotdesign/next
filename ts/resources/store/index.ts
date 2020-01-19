import getArtboard from './artboard';
import getImages from './images';
import getSVGs from './svgs';

const getStore = (selectedArtboard: srm.Artboard, sketch: srm.Sketch): srm.Store => {
  // get final store items
  const artboard: srm.Artboard = getArtboard(selectedArtboard, sketch);
  const images: srm.Base64Image[] = getImages(artboard.layers, sketch);
  const svgs: srm.SvgPath[] = getSVGs(artboard.layers, sketch);
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