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
      if (layer.type === 'Group' && !hidden) {
        removeHiddenLayers((<srm.Group>layer).layers);
      } else if (hidden) {
        layer.remove();
      }
    });
  }
};

const createMaskGroups = (page: srm.Page, layers: srm.SketchLayer[], sketch: srm.Sketch): void => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer) => {
      const hasClippingMask: boolean = layer.sketchObject.hasClippingMask();
      if (hasClippingMask) {
        // get mask index and parent
        const maskIndex = layer.index;
        const maskParent = layer.parent;
        // create new group to mimic mask behavior
        // app will apply overflow hidden to groups with the name srm.mask
        const maskGroup = new sketch.Group({
          name: 'srm.mask',
          frame: layer.frame,
          layers: [layer.duplicate()]
        });
        // splice in mask group, splice out old mask
        maskParent.layers.splice(maskIndex, 1, maskGroup);
        maskGroup.layers[0].frame.x = 0;
        maskGroup.layers[0].frame.y = 0;
        // loop through mask parent layers,
        // any layer with an index higher than the mask will be masked
        // push masked layers to maskGroup
        maskParent.layers.forEach((maskedLayer: srm.SketchLayer, index: number) => {
          if (index > maskIndex) {
            maskedLayer.frame.x = maskedLayer.frame.x - maskGroup.frame.x;
            maskedLayer.frame.y = maskedLayer.frame.y - maskGroup.frame.y;
            maskGroup.layers.push(maskedLayer);
          }
        });
      } else if (layer.type === "Group") {
        createMaskGroups(page, (<srm.Group>layer).layers, sketch);
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
  const artboard: srm.Artboard = selectedArtboard.duplicate();
  // reset duplicated artboard position
  artboard.frame.x = 0;
  artboard.frame.y = 0;
  artboard.background.includedInExport = true;
  // removes hotspots, slices, and artboards
  removeIrrelevantLayers(artboard.layers);
  // detach all symbols from artboard, returns layer groups
  detatchSymbols(artboard.layers);
  // remove hidden layers
  removeHiddenLayers(artboard.layers);
  // create mask groups
  createMaskGroups(page, artboard.layers, sketch);
  // round layer frame dimensions
  roundFrameDimensions(artboard.layers);
  // return final artboard
  return artboard;
};

export default getArtboard;