const removeIrrelevantLayers = (layers: srm.SketchLayer[]): void => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer) => {
      if (layer.type === 'Group') {
        removeIrrelevantLayers((<srm.Group>layer).layers);
      } else if (layer.type === 'HotSpot' || layer.type === 'Slice' || layer.type === 'Artboard') {
        layer.remove();
      }
    });
  }
};

const detatchSymbols = (layers: srm.SketchLayer[]): void => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer) => {
      if (layer.type === 'Group') {
        detatchSymbols((<srm.Group>layer).layers);
      } else if (layer.type === 'SymbolInstance') {
        (<srm.SymbolInstance>layer).detach({
          recursively: true
        });
      }
    });
  }
};

const removeHiddenLayers = (layers: srm.SketchLayer[]): void => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer) => {
      const hidden = (<srm.Group | srm.Shape | srm.Image | srm.ShapePath | srm.Text | srm.SymbolInstance>layer).hidden;
      const transparent = (<srm.Group | srm.Shape | srm.Image | srm.ShapePath | srm.Text | srm.SymbolInstance>layer).style.opacity === 0;
      const hiddenOrTransparent = hidden || transparent;
      if (layer.type === 'Group' && !hiddenOrTransparent) {
        removeHiddenLayers((<srm.Group>layer).layers);
      } else if (hiddenOrTransparent) {
        layer.remove();
      }
    });
  }
};

const maskGroupToImageLayer = (page: srm.Page, maskGroup: srm.Group, sketch: srm.Sketch): srm.Image => {
  // exporting an image with dims that exceed the artboard dims,
  // will only export the portion within the artboard
  // solution: create artboard for each image to make sure,
  // whole image is exported
  const maskArtboard = new sketch.Artboard({
    name: `${maskGroup.id}-mask-artboard`,
    frame: maskGroup.frame,
    parent: page,
    layers: [maskGroup.duplicate()]
  });
  // get image from artboard
  let maskDuplicate = maskArtboard.layers[0];
  // reset image position on artboard
  maskDuplicate.frame.x = 0;
  maskDuplicate.frame.y = 0;
  // create image buffer from layer
  const buffer: srm.Buffer = sketch.export(maskDuplicate, {
    formats: 'png',
    output: false,
  });
  // create image layer from buffer data
  const imageLayer: srm.Image = new sketch.Image({
    name: 'masked-group',
    image: buffer,
    frame: maskGroup.frame
  });
  // remove artboard
  maskArtboard.remove();
  // return image layer
  return imageLayer;
};

const masksToImages = (page: srm.Page, layers: srm.SketchLayer[], sketch: srm.Sketch): void => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer) => {
      const hasClippingMask: boolean = layer.sketchObject.hasClippingMask();
      const hasParentGroup: boolean = layer.parent && layer.parent.type === 'Group';
      if (layer.type === 'Group' && !hasClippingMask) {
        masksToImages(page, (<srm.Group>layer).layers, sketch);
      } else if (hasClippingMask && hasParentGroup) {
        // @ts-ignore
        const parent: srm.Group = layer.parent;
        const parentIndex: number = parent.index;
        const parentsParent: srm.Group | srm.Artboard = parent.parent;
        const imageLayer: srm.Image = maskGroupToImageLayer(page, parent, sketch);
        // splice in new image, splice out old mask group
        parentsParent.layers.splice(parentIndex, 1, imageLayer);
      }
    });
  }
};

const flattenGroups = (layers: srm.SketchLayer[]): void => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer) => {
      if (layer.type === "Group") {
        layer.sketchObject.ungroup();
        flattenGroups((<srm.Group>layer).layers);
      }
    });
  }
};

const roundFrameDimensions = (layers: srm.SketchLayer[]): void => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer) => {
      layer.frame.x = Math.round(layer.frame.x);
      layer.frame.y = Math.round(layer.frame.y);
      layer.frame.width = Math.round(layer.frame.width);
      layer.frame.height = Math.round(layer.frame.height);
      if (layer.type === "Group") {
        roundFrameDimensions((<srm.Group>layer).layers);
      }
    });
  }
};

const getArtboard = (page: srm.Page, selectedArtboard: srm.Artboard, sketch: srm.Sketch): srm.Artboard => {
  // duplicate artboard
  let artboard: srm.Artboard = selectedArtboard.duplicate();
  // reset duplicated artboard position
  artboard.frame.x = 0;
  artboard.frame.y = 0;
  // removes hotspots, slices, and artboards
  removeIrrelevantLayers(artboard.layers);
  // detach all symbols from artboard, returns layer groups
  detatchSymbols(artboard.layers);
  // remove hidden layers
  removeHiddenLayers(artboard.layers);
  // turn masks into image layers
  masksToImages(page, artboard.layers, sketch);
  // round layer frame dimensions
  roundFrameDimensions(artboard.layers);
  // return final artboard
  return artboard;
};

export default getArtboard;