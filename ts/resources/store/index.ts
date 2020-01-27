import getArtboard from './artboard';
import getImages from './images';
import getSVGs from './svgs';

export const exportWholeAsset = (page: srm.Page, layer: srm.SketchLayer, id: string, format: string, sketch: srm.Sketch): srm.AppAsset => {
  // exporting an asset with dims that exceed the artboard dims,
  // will only export the portion within the artboard
  // solution: create artboard for each asset to make sure,
  // whole asset is exported
  const assetArtboard = new sketch.Artboard({
    name: `${layer.id}-asset-artboard`,
    frame: layer.frame,
    parent: page,
    layers: [layer.duplicate()]
  });
  // get asset from artboard
  let assetDuplicate = assetArtboard.layers[0];
  // reset asset position on artboard
  assetDuplicate.frame.x = 0;
  assetDuplicate.frame.y = 0;
  // export asset to temp folder
  sketch.export(assetDuplicate, {
    formats: format,
    // @ts-ignore
    output: NSTemporaryDirectory(),
    ['use-id-for-name']: true,
    overwriting: true
  });
  // get asset temp path
  // @ts-ignore
  const filePath = `${NSTemporaryDirectory()}${assetDuplicate.id}.${format}`;
  // remove asset artboard from page
  assetArtboard.remove();
  // return AppAsset
  return {
    id: id,
    src: filePath
  }
}

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