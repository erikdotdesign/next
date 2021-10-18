const getFontWeight = (layer: srm.Text): any => {
  const sketchRatio = layer.style.fontWeight / 12;
  const domScale = ['thin', 'extra light', 'light', 'normal', 'medium', 'semi bold', 'bold', 'extra bold', 'black'];
  return domScale[Math.floor(sketchRatio * domScale.length)];
};

const getFontStretch = (layer: srm.Text): any => {
  switch(layer.style.fontStretch) {
    case 'compressed':
      return 'extra condensed';
    case 'condensed':
      return 'condensed';
    case 'narrow':
      return 'semi condensed';
    case 'expanded':
      return 'expanded'
    case 'poster':
      return 'extra expanded';
    default:
      return 'normal';
  };
};

const getFontStyle = (layer: srm.Text): any => {
  if (layer.style.fontStyle === 'italic') {
    return 'italic';
  } else {
    return 'normal';
  }
};

export const getSystemFontsLocation = (): string | null => {
  //@ts-ignore
  const systemLibrary = NSFileManager.defaultManager().URLsForDirectory_inDomains(NSLibraryDirectory, 8)[0];
  const systemLibraryPath = systemLibrary ? systemLibrary.absoluteString().replace('file://', '') : null;
  //@ts-ignore
  const systemFonts = systemLibraryPath ? NSFileManager.defaultManager().fileExistsAtPath(`${systemLibraryPath}Fonts`) : null;
  if (systemFonts) {
    return `${systemLibraryPath}Fonts/`;
  } else {
    return null;
  }
}

export const getUserFontsLocation = (): string | null => {
  //@ts-ignore
  const userLibrary = NSFileManager.defaultManager().URLsForDirectory_inDomains(NSLibraryDirectory, 1)[0];
  const userLibraryPath = userLibrary ? userLibrary.absoluteString().replace('file://', '') : null;
  //@ts-ignore
  const userFonts = userLibraryPath ? NSFileManager.defaultManager().fileExistsAtPath(`${userLibraryPath}Fonts`) : null;
  if (userFonts) {
    return `${userLibraryPath}Fonts/`;
  } else {
    return null;
  }
}

export const getSupplementalFontsLocation = (): string | null => {
  //@ts-ignore
  const systemLibrary = NSFileManager.defaultManager().URLsForDirectory_inDomains(NSLibraryDirectory, 8)[0];
  const systemLibraryPath = systemLibrary ? systemLibrary.absoluteString().replace('file://', '') : null;
  //@ts-ignore
  const systemFonts = systemLibraryPath ? NSFileManager.defaultManager().fileExistsAtPath(`${systemLibraryPath}Fonts/Supplemental`) : null;
  if (systemFonts) {
    return `${systemLibraryPath}Fonts/Supplemental/`;
  } else {
    return null;
  }
}

export const getUserFonts = (): string[] | null => {
  const userFontsLoc = getUserFontsLocation();
  if (userFontsLoc) {
    //@ts-ignore
    const userFonts = NSFileManager.defaultManager().contentsOfDirectoryAtPath_error(userFontsLoc, nil);
    return Array.from(userFonts, (item) => { return String(item) });
  } else {
    return null;
  }
}

export const getSystemFonts = (): string[] | null => {
  const systemFontsLoc = getSystemFontsLocation();
  if (systemFontsLoc) {
    //@ts-ignore
    const systemFonts = NSFileManager.defaultManager().contentsOfDirectoryAtPath_error(systemFontsLoc, nil);
    return Array.from(systemFonts, (item) => { return String(item) });
  } else {
    return null;
  }
}

export const getSupplimentalFonts = (): string[] | null => {
  const supplementalFontsLoc = getSupplementalFontsLocation();
  if (supplementalFontsLoc) {
    //@ts-ignore
    const supplementalFonts = NSFileManager.defaultManager().contentsOfDirectoryAtPath_error(supplementalFontsLoc, nil);
    return Array.from(supplementalFonts, (item) => { return String(item) });
  } else {
    return null;
  }
}

export const getAllFonts = (): srm.FontDir[] | null => {
  const userFontsLoc = getUserFontsLocation();
  const systemFontsLoc = getSystemFontsLocation();
  const supplementalFontsLoc = getSupplementalFontsLocation();
  const userFonts = getUserFonts();
  const systemFonts = getSystemFonts();
  const supplementalFonts = getSupplimentalFonts();
  const fontLocations = [userFontsLoc, systemFontsLoc, supplementalFontsLoc];
  const fontLocationContents = [userFonts, systemFonts, supplementalFonts];
  const availableFontLocations = fontLocations.filter((fontDir: string | null) => fontDir !== null);
  if (availableFontLocations.length > 0) {
    const allFonts = (availableFontLocations as string[]).map((fontLocation: string, index: number) => {
      return {
        location: fontLocation,
        contents: fontLocationContents[index]
      }
    });
    return allFonts as srm.FontDir[];
  } else {
    return null;
  }
}

const getFontNameVariations = (font: string): string[] => {
  const noSpace: string = font.replace(/\s/g, '');
  const hyphenCase: string = font.replace(/\s/g, '-');
  return [
    font,
    noSpace,
    hyphenCase
  ];
}

const containsFontNameVariation = (fontFileName: string, fontNameVariations: string[]): boolean => {
  let contains: boolean = false;
  const normalizedFileName: string = fontFileName.toUpperCase();
  fontNameVariations.forEach((variation: string) => {
    const normalizedNameVariant = variation.toUpperCase();
    if (normalizedFileName.indexOf(normalizedNameVariant) !== -1) {
      contains = true;
    }
  });
  return contains;
}

// export const getFontPaths = (font: srm.Font): srm.FontPaths[] => {
//   const allFonts: srm.FontDir[] | null = getAllFonts();
//   return (allFonts as any).reduce((result: any, current: srm.FontDir) => {
//     const fontNameVariations = getFontNameVariations(font.family);
//     const fontFamilyExists = current.contents.some((fontFileName: string) => {
//       return containsFontNameVariation(fontFileName, fontNameVariations);
//     });
//     if (fontFamilyExists) {
//       const fontNameVariations = getFontNameVariations(font.family);
//       const fontFiles = current.contents.filter((fontFileName: string) => {
//         return containsFontNameVariation(fontFileName, fontNameVariations);
//       });
//       result = [...result, {
//         font,
//         location: current.location,
//         fontFiles
//       }];
//     }
//     return result;
//   }, []);
// };

const processFontFile = (fontFile: string) => {
  const string = fontFile.split('').filter((str) => {
    if (str !== '-' && str !== '_' && str !== ' ') {
      return str;
    }
  }).join('').toLowerCase();
  const weights = ['thin', 'hairline', 'extra light', 'ultra light', 'light', 'regular', 'medium', 'semi bold', 'demi bold', 'extra bold', 'ultra bold', 'bold', 'black', 'heavy'];
  const stretchs = ['extra condensed', 'semi condensed', 'condensed', 'extra expanded', 'expanded'];
  const style = 'italic';
  const weight = weights.find((w) => {
    return string.indexOf(w.replace(/\s/g, '')) !== -1;
  });
  const stretch = stretchs.find((s) => {
    return string.indexOf(s.replace(/\s/g, '')) !== -1;
  });
  const italic = string.indexOf(style) !== -1;
  return {
    weight: weight ? weight === 'regular' ? 'normal' : weight : 'normal',
    stretch: stretch ? stretch : 'normal',
    style: italic ? 'italic' : 'normal'
  }
};

export const getFontFiles = (fonts: srm.PreProcessedFonts): {
  [id: string]: srm.ProcessedFont[];
} => {
  const allFonts: srm.FontDir[] | null = getAllFonts();
  return (allFonts as any).reduce((result: any, current: srm.FontDir) => {
    const fontFamily = fonts.allFontFamilies.find((ff) => {
      const fontNameVariations = getFontNameVariations(ff);
      return current.contents.some((fontFileName: string) => {
        return containsFontNameVariation(fontFileName, fontNameVariations);
      });
    });
    if (fontFamily) {
      const fontNameVariations = getFontNameVariations(fontFamily);
      const fontFiles = current.contents.filter((fontFileName: string) => {
        return containsFontNameVariation(fontFileName, fontNameVariations);
      }).map((fontFileName) => {
        const processedFontFileName = processFontFile(fontFileName);
        return {
          fileName: fontFileName,
          location: current.location,
          path: `${current.location}/${fontFileName}`,
          font: {
            family: fontFamily,
            ...processedFontFileName
          }
        }
      });
      result = {
        ...result,
        [`${fontFamily}`]: fontFiles
      };
    }
    return result;
  }, {});
};

export const processFonts = (fonts: srm.PreProcessedFonts): {
  [id: string]: srm.ProcessedFont[];
} => {
  const fontFiles = getFontFiles(fonts);
  // loop through app fonts
  return fonts.allFontFamilies.reduce((result, current) => {
    const fontFamilyFiles = fontFiles[`${current}`];
    if (fontFamilyFiles) {
      //@ts-ignore
      const tempFontFamilyDirectory = NSTemporaryDirectory();
      const tempFontFiles = fontFamilyFiles.map((fwp) => {
        const tempFilePath = `${tempFontFamilyDirectory}${fwp.fileName}`;
        //@ts-ignore
        NSFileManager.defaultManager().copyItemAtPath_toPath_error(`${fwp.path}`, `${tempFilePath}`, nil);
        return {
          fileName: fwp.fileName,
          location: tempFontFamilyDirectory,
          path: tempFilePath,
          font: fwp.font
        };
      });
      result = {
        ...result,
        [`${current}`]: tempFontFiles
      }
    }
    return result;
  }, {});
};

const createSvgFromLayer = (page: srm.Page, layer: srm.Shape | srm.ShapePath | srm.Group, sketch: srm.Sketch, id?: string): srm.SvgAsset => {
  let borderSize = 0;
  const activeBorders = layer.style.borders.filter((border: srm.Border) => border.enabled);
  if (activeBorders) {
    activeBorders.forEach((border: srm.Border) => {
      if (border.thickness > borderSize) {
        borderSize = border.thickness;
      }
    });
  }
  // duplicate layer
  const layerDuplicate = layer.duplicate();
  // set parent to page
  layerDuplicate.parent = page;
  // opacity and transforms will be applied on the div, not svg
  layerDuplicate.style.opacity = 1;
  layerDuplicate.transform.rotation = 0;
  layerDuplicate.transform.flippedHorizontally = false;
  layerDuplicate.transform.flippedVertically = false;
  // export duplicate layer
  sketch.export(layerDuplicate, {
    formats: 'svg',
    // @ts-ignore
    output: NSTemporaryDirectory(),
    ['use-id-for-name']: true,
    overwriting: true
  });
  // update layer frame to include bordersize
  layer.frame.width = Math.round(layer.frame.width + (borderSize * 1.5));
  layer.frame.height = Math.round(layer.frame.height + (borderSize * 1.5));
  layer.frame.x = Math.round(layer.frame.x - ((borderSize * 1.5) / 2));
  layer.frame.y = Math.round(layer.frame.y - ((borderSize * 1.5) / 2));
  // remove duplicate layer
  layerDuplicate.remove();
  // return AppAsset
  return {
    id: id ? id : layer.id,
    // @ts-ignore
    src: `${NSTemporaryDirectory()}${layerDuplicate.id}.svg`
  }
};

const createShapeFromLayer = (layer: srm.Group | srm.ShapePath, sketch: srm.Sketch, name?: string): srm.Shape => {
  // create new shape
  const shapeReplacement = new sketch.Shape({
    name: name ? name : layer.name,
    frame: layer.frame,
    style: layer.style,
    transform: {
      rotation: layer.transform.rotation,
      flippedHorizontally: layer.transform.flippedHorizontally,
      flippedVertically: layer.transform.flippedVertically
    }
  });
  // return new shape
  return shapeReplacement;
};

const createShapeFromGroup = (layer: srm.Group, sketch: srm.Sketch, prefix: string): srm.Shape => {
  // remove prefix from name
  const newName = layer.name.substr(prefix.length, layer.name.length - prefix.length).trim();
  // create new shape
  const shapeReplacement = createShapeFromLayer(layer, sketch, newName);
  // return new shape
  return shapeReplacement;
};

const createImageLayerImage = (page: srm.Page, layer: srm.Image, sketch: srm.Sketch): srm.ImgAsset => {
  const layerDuplicate = layer.duplicate();
  // reset asset position on artboard
  layerDuplicate.parent = page;
  // export asset to temp folder
  sketch.export(layerDuplicate, {
    scales: '1, 2',
    formats: 'png',
    // @ts-ignore
    output: NSTemporaryDirectory(),
    ['use-id-for-name']: true,
    ['save-for-web']: true,
    overwriting: true
  });
  // remove asset artboard from page
  layerDuplicate.remove();
  // return AppAsset
  return {
    id: (<srm.Image>layer).image.id,
    src: {
      // @ts-ignore
      [`1x`]: `${NSTemporaryDirectory()}${layerDuplicate.id}.png`,
      // @ts-ignore
      [`2x`]: `${NSTemporaryDirectory()}${layerDuplicate.id}@2x.png`
    },
  }
};

const createGradientFillImage = (page: srm.Page, layer: srm.Shape | srm.ShapePath, sketch: srm.Sketch): srm.ImgAsset => {
  // get enabled gradients
  const activeGradients: srm.Fill[] = layer.style.fills.filter((fill: srm.Fill) => {
    return fill.enabled && fill.fillType === 'Gradient';
  });
  // get top gradient fill
  const topGradient: srm.Fill = activeGradients[activeGradients.length - 1];
  // create new layer with gradient
  const gradientImage = new sketch.ShapePath({
    parent: page,
    frame: layer.frame,
    style: {
      fills: [topGradient],
      borders: []
    }
  });
  // export image to temp dir
  sketch.export(gradientImage, {
    scales: '1, 2',
    formats: 'png',
    // @ts-ignore
    output: NSTemporaryDirectory(),
    ['use-id-for-name']: true,
    ['save-for-web']: true,
    overwriting: true
  });
  // remove image from page
  gradientImage.remove();
  // return final image
  return {
    id: layer.id,
    src: {
      // @ts-ignore
      [`1x`]: `${NSTemporaryDirectory()}${gradientImage.id}.png`,
      // @ts-ignore
      [`2x`]: `${NSTemporaryDirectory()}${gradientImage.id}@2x.png`,
    }
  }
};

const createImageFillImage = (page: srm.Page, image: srm.ImageData, sketch: srm.Sketch): srm.ImgAsset => {
  // get image size
  const width = image.nsimage.size().width;
  const height = image.nsimage.size().height;
  // create image from fill image
  const fillImage = new sketch.Image({
    image: image,
    parent: page,
    frame: { width, height, x: 0, y: 0 }
  });
  // export image to temp dir
  sketch.export(fillImage, {
    scales: '1, 2',
    formats: 'png',
    // @ts-ignore
    output: NSTemporaryDirectory(),
    ['use-id-for-name']: true,
    ['save-for-web']: true,
    overwriting: true
  });
  // remove image from page
  fillImage.remove();
  // return final image
  return {
    id: image.id,
    src: {
      // @ts-ignore
      [`1x`]: `${NSTemporaryDirectory()}${fillImage.id}.png`,
      // @ts-ignore
      [`2x`]: `${NSTemporaryDirectory()}${fillImage.id}@2x.png`
    }
  }
};

const processLayerFills = (page: srm.Page, layer: srm.Shape | srm.ShapePath, images: srm.ImgAsset[], sketch: srm.Sketch, fillImages: srm.ImgAsset[] = []): srm.ImgAsset[] => {
  (<srm.Shape | srm.ShapePath>layer).style.fills.forEach((fill: srm.Fill) => {
    if (fill.pattern.image !== null && fill.enabled && !images.find(image => image.id === ((fill.pattern as srm.Pattern).image as srm.ImageData).id)) {
      const fillImage = createImageFillImage(page, fill.pattern.image, sketch);
      fillImages.push(fillImage);
    } else if (fill.fillType === 'Gradient' && fill.enabled) {
      const gradientImage = createGradientFillImage(page, layer as srm.ShapePath | srm.Shape, sketch);
      fillImages.push(gradientImage);
    }
  });
  return fillImages;
};

const isComplexShapePath = (layer: srm.ShapePath): boolean => {
  const hasOpenPath: boolean = !(<srm.ShapePath>layer).closed;
  const notRectangle: boolean = (<srm.ShapePath>layer).shapeType !== 'Rectangle';
  const notOval: boolean = (<srm.ShapePath>layer).shapeType !== 'Oval';
  const isOddShape: boolean = notRectangle && notOval;
  const hasDashPattern: boolean = (<srm.ShapePath>layer).style.borderOptions.dashPattern.length > 0;
  return hasOpenPath || isOddShape || hasDashPattern;
};

const processShapePath = (page: srm.Page, layer: srm.ShapePath, images: srm.ImgAsset[], sketch: srm.Sketch, callback: any): void => {
  const isComplex = isComplexShapePath(layer);
  const shapePathFillImages = processLayerFills(page, layer, images, sketch);
  if (isComplex) {
    // turn complex shapePaths into shapes
    // makes things easier when divs are styled later
    const shapeReplacement = createShapeFromLayer(layer as srm.ShapePath, sketch);
    const svg = createSvgFromLayer(page, layer as srm.ShapePath, sketch, shapeReplacement.id);
    layer.parent.layers.splice(layer.index, 1, shapeReplacement);
    callback(shapePathFillImages, svg);
  } else {
    callback(shapePathFillImages, null);
  }
};

const processShape = (page: srm.Page, layer: srm.Shape, images: srm.ImgAsset[], sketch: srm.Sketch, callback: any): void => {
  const shapeFillImages = processLayerFills(page, layer, images, sketch);
  const svg = createSvgFromLayer(page, layer, sketch);
  callback(shapeFillImages, svg);
};

const processImage = (page: srm.Page, layer: srm.Image, images: srm.ImgAsset[], sketch: srm.Sketch, callback: any): void => {
  if (!images.find(image => image.id === layer.image.id)) {
    const image = createImageLayerImage(page, layer, sketch);
    callback(image);
  } else {
    callback(null);
  }
};

const processGroup = (page: srm.Page, layer: srm.Group, sketch: srm.Sketch, callback: any): void => {
  if (layer.name.startsWith('[srm.svg]')) {
    // create shape to replace group
    const shapeReplacement = createShapeFromGroup(layer as srm.Group, sketch, '[srm.svg]');
    // create svg from group
    const svg = createSvgFromLayer(page, layer as srm.Group, sketch, shapeReplacement.id);
    // splice in shape replacement, splice out old group
    layer.parent.layers.splice(layer.index, 1, shapeReplacement);
    // return callback
    callback(svg);
  } else {
    callback(null);
  }
};

const processText = (layer: srm.Text, fonts: srm.PreProcessedFonts, callback: any): void => {
  const fontFamily = (<srm.Text>layer).style.fontFamily;
  const fontWeight = getFontWeight(layer);
  const fontStretch = getFontStretch(layer);
  const fontStyle = getFontStyle(layer);
  //@ts-ignore
  const availableFamilies = NSFontManager.sharedFontManager().availableFontFamilies();
  const availableFamiliesArray: string[] = Array.from(availableFamilies, item => String(item));
  const fontAvailable = availableFamiliesArray.includes(fontFamily);
  const fontExists = fonts.allFontFamilies.includes(fontFamily);
  const variantExists = fontExists && fonts.byFamily[`${fontFamily}`].find((variant: srm.PreProcessedFontVariant) => {
    return variant.weight === fontWeight &&
    variant.stretch === fontStretch &&
    variant.style === fontStyle;
  });
  if (fonts && fontAvailable && (!fontExists || !variantExists)) {
    if (!fontExists) {
      fonts = {
        ...fonts,
        allFontFamilies: [...fonts.allFontFamilies, fontFamily],
        byFamily: {
          ...fonts.byFamily,
          [`${fontFamily}`]: []
        }
      }
    }
    if (!variantExists) {
      fonts = {
        ...fonts,
        byFamily: {
          ...fonts.byFamily,
          [`${fontFamily}`]: [
            ...fonts.byFamily[`${fontFamily}`],
            {
              weight: fontWeight,
              style: fontStyle,
              stretch: fontStretch
            }
          ]
        }
      }
    }
    callback(fonts);
  } else {
    callback(fonts);
  }
};

const processLayer = (page: srm.Page, layer: srm.SketchLayer, sketch: srm.Sketch, images: srm.ImgAsset[], svgs: srm.SvgAsset[], fonts: srm.PreProcessedFonts, callback: any): void => {
  switch(layer.type) {
    case 'Image':
      processImage(page, layer as srm.Image, images, sketch, (image: srm.ImgAsset | null) => {
        if (image) {
          images.push(image);
        }
      });
      break;
    case 'Shape':
      processShape(page, layer as srm.Shape, images, sketch, (shapeImages: srm.ImgAsset[] | [], shapeSvg: srm.SvgAsset) => {
        images.push(...shapeImages);
        svgs.push(shapeSvg);
      });
      break;
    case 'ShapePath':
      processShapePath(page, layer as srm.ShapePath, images, sketch, (shapePathImages: srm.ImgAsset[] | [], shapePathSvg: srm.SvgAsset | null) => {
        if (shapePathSvg) {
          svgs.push(shapePathSvg as srm.SvgAsset);
        }
        images.push(...shapePathImages);
      });
      break;
    case 'Text':
      processText(layer as srm.Text, fonts, (newFonts: srm.PreProcessedFonts) => {
        fonts = newFonts;
      });
      break;
    case 'Group':
      processGroup(page, layer as srm.Group, sketch, (groupSvg: srm.SvgAsset | null) => {
        if (groupSvg) {
          svgs.push(groupSvg);
        }
      });
      break;
  }
  callback({
    images,
    svgs,
    fonts
  });
};

const processLayers = (page: srm.Page, layers: srm.SketchLayer[], sketch: srm.Sketch, images: srm.ImgAsset[] = [], svgs: srm.SvgAsset[] = [], fonts: srm.PreProcessedFonts = { allFontFamilies: [], byFamily: {} }): any => {
  if (layers.length > 0) {
    layers.forEach((layer: srm.SketchLayer) => {
      processLayer(page, layer, sketch, images, svgs, fonts, (newAssets: any) => {
        images = newAssets.images;
        svgs = newAssets.svgs;
        fonts = newAssets.fonts;
      });
      if (layer.type === 'Group') {
        processLayers(page, (layer as srm.Group).layers, sketch, images, svgs, fonts);
      }
    });
  }
  return {
    images,
    svgs,
    fonts
  }
};

export const createArtboardImage = (artboard: srm.Artboard, sketch: srm.Sketch): string => {
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
};

export const getAssets = (page: srm.Page, artboard: srm.Artboard, sketch: srm.Sketch) => {
  const artboardAssets: srm.ArtboardPreProcessedAssets = processLayers(page, artboard.layers, sketch);
  const processedFonts = processFonts(artboardAssets.fonts);
  const artboardImage: string = createArtboardImage(artboard, sketch);
  return {
    ...artboardAssets,
    fonts: processedFonts,
    artboardImage
  };
};

export default getAssets;