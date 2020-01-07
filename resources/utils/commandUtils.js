import getArtboard from './artboard';
import getImages from './images';
import getSVGs from './svgs';
export const validSelection = (selection) => {
    const notEmpty = selection.count() == 1;
    if (notEmpty && selection.firstObject().class() == 'MSArtboardGroup') {
        return true;
    }
    else {
        return false;
    }
};
export const getStore = (sketch, callback) => {
    // get final store items
    const artboard = getArtboard(sketch);
    const images = getImages(artboard.layers, sketch);
    const svgs = getSVGs(artboard.layers);
    // remove duplicate artboard
    artboard.remove();
    // run callback
    callback({
        artboard,
        images,
        svgs
    });
};
