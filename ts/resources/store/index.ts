import getArtboard from './artboard';
import getAssets from './assets';

const getStore = (page: srm.Page, selectedArtboard: srm.Artboard, sketch: srm.Sketch, callback: any) => {
  // get final store items
  const artboard: srm.Artboard = getArtboard(selectedArtboard, sketch);
  const assets: srm.ArtboardAssets = getAssets(page, artboard, sketch);
  const notes: srm.Note[] = [];
  // remove duplicate artboard
  artboard.remove();
  // return callback
  callback({
    ...assets,
    artboard,
    notes
  } as srm.Store);
};

export default getStore;