import chroma from 'chroma-js';

const checkIfRelevant = (layer: srm.SketchLayer, callback: any) => {
  switch(layer.type) {
    case 'Group':
    case 'Shape':
    case 'Image':
    case 'ShapePath':
    case 'Text':
    case 'SymbolInstance':
      callback(layer);
      break;
    case 'HotSpot':
    case 'Slice':
    case 'Artboard':
      layer.remove();
      callback(null);
      break;
  }
};

const checkIfHidden = (layer: srm.SketchLayer, callback: any) => {
  const isHidden = (<srm.Group | srm.Shape | srm.Image | srm.ShapePath | srm.Text | srm.SymbolInstance>layer).hidden;
  if (layer && isHidden) {
    layer.remove();
    callback(null);
  } else {
    callback(layer);
  }
};

const checkIfSymbol = (layer: srm.SketchLayer, callback: any) => {
  if (layer && layer.type === 'SymbolInstance') {
    callback((<srm.SymbolInstance>layer).detach({
      recursively: true
    }));
  } else {
    callback(layer);
  }
};

const createMaskLayer = (layer: srm.ShapePath | srm.Shape, sketch: srm.Sketch): srm.ShapePath | srm.Shape => {
  // duplicate layer and reset styles
  // layer needs a fill and 100% opacity,
  // to correctly mimic sketch masking
  let duplicate = layer.duplicate();
  // check if layer has active fill
  const activeFills = duplicate.style.fills.filter((fill: srm.Fill) => fill.enabled);
  const topFill = activeFills ? activeFills[activeFills.length - 1] : null;
  // if layer has active fill,
  // return fill at 100% alpha
  if (topFill) {
    topFill.color = `${chroma(topFill.color).alpha(1)}`;
  } else {
    // if layer has no active fill,
    // add black fill
    duplicate.style.fills = [{
      color: '#000',
      fillType: 'Color'
    }];
  }
  // reset position and styles
  duplicate.frame.x = 0;
  duplicate.frame.y = 0;
  duplicate.style.borders = [];
  duplicate.style.shadows = [];
  duplicate.style.innerShadows = [];
  duplicate.style.opacity = 1;
  // flatten shape
  let shapeBuffer = sketch.export(duplicate, {
    formats: 'svg',
    output: false
  });
  let shapeGroup = sketch.createLayerFromData(shapeBuffer, 'svg');
  // get shape in flattened shape group
  let maskShape = shapeGroup.layers[0];
  // rename layer
  maskShape.name = `srm.mask.shape`;
  // remove duplicate
  duplicate.remove();
  // return final mask
  return maskShape;
};

const getMaskShape = (layer: srm.SketchLayer): srm.Shape | srm.ShapePath => {
  let lastLayer = layer;
  while(lastLayer.type === 'Group') {
    lastLayer = (lastLayer as srm.Group).layers[0];
  }
  return lastLayer as srm.ShapePath | srm.Shape;
};

const checkIfMask = (layer: srm.SketchLayer, sketch: srm.Sketch, callback: any) => {
  if (layer && layer.sketchObject.hasClippingMask()) {
    const maskIndex = layer.index;
    const maskParent = layer.parent;
    const maskShape = getMaskShape(layer);
    const flatMaskShape = createMaskLayer(maskShape as srm.Shape | srm.ShapePath, sketch);
    // add offset to group if flat mask shape if slimmer than mask shape
    const maskGroupOffset = flatMaskShape.frame.width !== maskShape.frame.width
                            ? (maskShape.frame.width - flatMaskShape.frame.width) / 2
                            : maskShape.frame.x;
    // create new group to mimic mask behavior
    const maskGroup = new sketch.Group({
      name: 'srm.mask',
      frame: {
        ...flatMaskShape.frame,
        x: maskGroupOffset
      },
      layers: [flatMaskShape]
    });
    // splice in mask group, splice out old mask
    maskParent.layers.splice(maskIndex, 1, maskGroup);
    // if mask is a group, push group layers to mask group
    if (layer.type === 'Group') {
      (layer as srm.Group).layers.forEach((maskedLayer: srm.SketchLayer) => {
        maskGroup.layers.push(maskedLayer);
      });
    }
    // loop through mask parent layers,
    // any layer with an index higher than the mask will be masked
    // push masked layers to maskGroup
    maskGroup.parent.layers.forEach((maskedLayer: srm.SketchLayer, index: number) => {
      if (index > maskIndex) {
        maskedLayer.frame.x = maskedLayer.frame.x - maskGroup.frame.x;
        maskedLayer.frame.y = maskedLayer.frame.y - maskGroup.frame.y;
        maskGroup.layers.push(maskedLayer);
      }
    });
    callback(layer);
  } else {
    callback(layer);
  }
};

const roundFrameDimensions = (layer: srm.SketchLayer, callback: any) => {
  if (layer) {
    layer.frame.x = Math.round(layer.frame.x);
    layer.frame.y = Math.round(layer.frame.y);
    layer.frame.width = Math.round(layer.frame.width);
    layer.frame.height = Math.round(layer.frame.height);
  }
  callback(layer);
};

const processLayers = (layers: srm.SketchLayer[], sketch: srm.Sketch): void => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer) => {
      checkIfRelevant(layer, (rLayer: any) => {
        checkIfHidden(rLayer, (hLayer: any) => {
          checkIfSymbol(hLayer, (sLayer: any) => {
            checkIfMask(sLayer, sketch, (mLayer: any) => {
              roundFrameDimensions(mLayer, (fLayer: any) => {
                if (fLayer && fLayer.type === 'Group') {
                  processLayers(fLayer.layers, sketch);
                }
              });
            });
          });
        });
      });
    });
  }
};

const getArtboard = (selectedArtboard: srm.Artboard, sketch: srm.Sketch): srm.Artboard => {
  // duplicate artboard
  const artboard: srm.Artboard = selectedArtboard.duplicate();
  // reset duplicated artboard position
  artboard.frame.x = 0;
  artboard.frame.y = 0;
  artboard.background.includedInExport = true;
  // process artboard layers
  processLayers(artboard.layers, sketch);
  // return final artboard
  return artboard;
};

export default getArtboard;