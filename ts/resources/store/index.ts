import getArtboard from './artboard';
import getAssets from './assets';

const getStore = (page: next.Page, selectedArtboard: next.Artboard, sketch: next.Sketch, callback: any) => {
  // get final store items
  const artboard: next.Artboard = getArtboard(selectedArtboard, sketch);
  const assets: next.ArtboardAssets = getAssets(page, artboard, sketch);
  const notes: next.Note[] = [];
  // remove duplicate artboard
  artboard.remove();
  // return callback
  callback({
    ...assets,
    artboard,
    notes
  } as next.Store);
};

export default getStore;