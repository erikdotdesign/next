import getArtboard from './artboard';
import getImages from './images';
import getSVGs from './svgs';
import getFonts from './fonts';

export const createArtboardImage = (artboard: srm.Artboard, sketch: srm.Sketch) => {
  const buffer = sketch.export(artboard, {
    scales: '0.10',
    formats: 'png',
    output: false,
    ['save-for-web']: true
  });
  // create image from buffer data
  const bufferImg: srm.Image = new sketch.Image({
    image: buffer
  });
  const base64 = bufferImg.image.nsdata.base64EncodedStringWithOptions(0);
  return `data:image/png;base64, ${base64}`;
}

const getStore = (page: srm.Page, selectedArtboard: srm.Artboard, sketch: srm.Sketch, callback: any) => {
  // get final store items
  const artboard: srm.Artboard = getArtboard(page, selectedArtboard, sketch);
  const images: srm.ImgAsset[] = getImages(page, artboard.layers, sketch);
  const svgs: srm.SvgAsset[] = getSVGs(page, artboard.layers, sketch);
  const artboardImage: string = createArtboardImage(artboard, sketch);
  const fonts: string[] = getFonts(artboard.layers);
  const notes: srm.Note[] = [];
  // remove duplicate artboard
  artboard.remove();
  // set store
  const store: srm.Store = {
    artboard,
    images,
    svgs,
    notes,
    fonts,
    artboardImage
  };
  // return callback
  callback(store);
};

export default getStore;