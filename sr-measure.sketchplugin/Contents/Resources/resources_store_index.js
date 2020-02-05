/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/store/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/store/artboard.js":
/*!*************************************!*\
  !*** ./resources/store/artboard.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var removeIrrelevantLayers = function removeIrrelevantLayers(layers) {
  if (layers.length > 0) {
    layers.forEach(function (layer) {
      if (layer.type === 'Group') {
        removeIrrelevantLayers(layer.layers);
      } else if (layer.type === 'HotSpot' || layer.type === 'Slice' || layer.type === 'Artboard') {
        layer.remove();
      }
    });
  }
};

var detatchSymbols = function detatchSymbols(layers) {
  if (layers.length > 0) {
    layers.forEach(function (layer) {
      if (layer.type === 'Group') {
        detatchSymbols(layer.layers);
      } else if (layer.type === 'SymbolInstance') {
        layer.detach({
          recursively: true
        });
      }
    });
  }
};

var removeHiddenLayers = function removeHiddenLayers(layers) {
  if (layers.length > 0) {
    layers.forEach(function (layer) {
      var hidden = layer.hidden;

      if (layer.type === 'Group' && !hidden) {
        removeHiddenLayers(layer.layers);
      } else if (hidden) {
        layer.remove();
      }
    });
  }
};

var createMaskLayer = function createMaskLayer(layer, sketch) {
  // duplicate layer and reset styles
  // layer needs a fill and 100% opacity,
  // to correctly mimic sketch masking
  var duplicate = layer.duplicate();
  duplicate.style.fills = [{
    color: '#000',
    fillType: 'Color'
  }];
  duplicate.frame.x = 0;
  duplicate.frame.y = 0;
  duplicate.style.borders = [];
  duplicate.style.shadows = [];
  duplicate.style.innerShadows = [];
  duplicate.style.opacity = 1; // flatten shape

  var shapeBuffer = sketch["export"](duplicate, {
    formats: 'svg',
    output: false
  });
  var shapeGroup = sketch.createLayerFromData(shapeBuffer, 'svg'); // get shape in flattened shape group

  var maskShape = shapeGroup.layers[0]; // rename layer

  maskShape.name = "srm.mask.shape"; // remove duplicate

  duplicate.remove(); // return final mask

  return maskShape;
};

var getMaskShape = function getMaskShape(layer) {
  var lastLayer = layer;

  while (lastLayer.type === 'Group') {
    lastLayer = lastLayer.layers[0];
  }

  return lastLayer;
};

var createMaskGroups = function createMaskGroups(page, layers, sketch) {
  if (layers.length > 0) {
    layers.forEach(function (layer) {
      var hasClippingMask = layer.sketchObject.hasClippingMask();

      if (hasClippingMask) {
        var maskIndex = layer.index;
        var maskParent = layer.parent; // get mask shape

        var maskShape = getMaskShape(layer); // flatten shape if polygon, star, or triangle

        var flatMaskShape = createMaskLayer(maskShape, sketch); // add prefix to name
        // add offset to group if flat mask shape if slimmer than mask shape

        var maskGroupOffset = flatMaskShape.frame.width !== maskShape.frame.width ? (maskShape.frame.width - flatMaskShape.frame.width) / 2 : maskShape.frame.x; // create new group to mimic mask behavior
        // app will apply overflow hidden to groups with the name srm.mask

        var maskGroup = new sketch.Group({
          name: 'srm.mask',
          frame: Object.assign(Object.assign({}, flatMaskShape.frame), {
            x: maskGroupOffset
          }),
          layers: [flatMaskShape]
        }); // splice in mask group, splice out old mask

        maskParent.layers.splice(maskIndex, 1, maskGroup); // if mask is a group, push group layers to mask group

        if (layer.type === 'Group') {
          layer.layers.forEach(function (maskedLayer) {
            maskGroup.layers.push(maskedLayer);
          });
        } // loop through mask parent layers,
        // any layer with an index higher than the mask will be masked
        // push masked layers to maskGroup


        maskParent.layers.forEach(function (maskedLayer, index) {
          if (index > maskIndex) {
            maskedLayer.frame.x = maskedLayer.frame.x - maskGroup.frame.x;
            maskedLayer.frame.y = maskedLayer.frame.y - maskGroup.frame.y;
            maskGroup.layers.push(maskedLayer);
          }
        });
      } else if (layer.type === "Group") {
        createMaskGroups(page, layer.layers, sketch);
      }
    });
  }
};

var flattenGroups = function flattenGroups(layers) {
  if (layers.length > 0) {
    layers.forEach(function (layer) {
      if (layer.type === "Group") {
        layer.sketchObject.ungroup();
        flattenGroups(layer.layers);
      }
    });
  }
};

var roundFrameDimensions = function roundFrameDimensions(layers) {
  if (layers.length > 0) {
    layers.forEach(function (layer) {
      layer.frame.x = Math.round(layer.frame.x);
      layer.frame.y = Math.round(layer.frame.y);
      layer.frame.width = Math.round(layer.frame.width);
      layer.frame.height = Math.round(layer.frame.height);

      if (layer.type === "Group") {
        roundFrameDimensions(layer.layers);
      }
    });
  }
};

var getArtboard = function getArtboard(page, selectedArtboard, sketch) {
  // duplicate artboard
  var artboard = selectedArtboard.duplicate(); // reset duplicated artboard position

  artboard.frame.x = 0;
  artboard.frame.y = 0;
  artboard.background.includedInExport = true; // removes hotspots, slices, and artboards

  removeIrrelevantLayers(artboard.layers); // detach all symbols from artboard, returns layer groups

  detatchSymbols(artboard.layers); // remove hidden layers

  removeHiddenLayers(artboard.layers); // create mask groups

  createMaskGroups(page, artboard.layers, sketch); // round layer frame dimensions

  roundFrameDimensions(artboard.layers); // return final artboard

  return artboard;
};

/* harmony default export */ __webpack_exports__["default"] = (getArtboard);

/***/ }),

/***/ "./resources/store/fonts.js":
/*!**********************************!*\
  !*** ./resources/store/fonts.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var getFonts = function getFonts(layers) {
  var fonts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (layers.length > 0) {
    layers.forEach(function (layer) {
      if (layer.type === 'Group') {
        getFonts(layer.layers, fonts);
      } else if (layer.type === 'Text') {
        var fontFamily = layer.style.fontFamily; //@ts-ignore

        var availableFamilies = NSFontManager.sharedFontManager().availableFontFamilies();
        var availableFamiliesArray = Array.from(availableFamilies, function (item) {
          return String(item);
        });
        var fontAvailable = availableFamiliesArray.includes(fontFamily);

        if (fonts && fontAvailable && !fonts.includes(fontFamily)) {
          fonts.push(fontFamily);
        }
      }
    });
  }

  return fonts;
};

/* harmony default export */ __webpack_exports__["default"] = (getFonts);

/***/ }),

/***/ "./resources/store/images.js":
/*!***********************************!*\
  !*** ./resources/store/images.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var imageLayerToImage = function imageLayerToImage(page, layer, sketch) {
  var _sketch$export, _src;

  var layerDuplicate = layer.duplicate(); // reset asset position on artboard

  layerDuplicate.parent = page; // export asset to temp folder

  sketch["export"](layerDuplicate, (_sketch$export = {
    scales: '1, 2',
    formats: 'png',
    // @ts-ignore
    output: NSTemporaryDirectory()
  }, _defineProperty(_sketch$export, 'use-id-for-name', true), _defineProperty(_sketch$export, 'save-for-web', true), _defineProperty(_sketch$export, "overwriting", true), _sketch$export)); // remove asset artboard from page

  layerDuplicate.remove(); // return AppAsset

  return {
    id: layer.image.id,
    src: (_src = {}, _defineProperty(_src, "1x", "".concat(NSTemporaryDirectory()).concat(layerDuplicate.id, ".png")), _defineProperty(_src, "2x", "".concat(NSTemporaryDirectory()).concat(layerDuplicate.id, "@2x.png")), _src)
  };
};

var fillGradientToImage = function fillGradientToImage(page, layer, sketch) {
  var _sketch$export2, _src2;

  // get enabled gradients
  var activeGradients = layer.style.fills.filter(function (fill) {
    return fill.enabled && fill.fillType === 'Gradient';
  }); // get top gradient fill

  var topGradient = activeGradients[activeGradients.length - 1]; // create new layer with gradient

  var gradientImage = new sketch.ShapePath({
    parent: page,
    frame: layer.frame,
    style: {
      fills: [topGradient],
      borders: []
    }
  }); // export image to temp dir

  sketch["export"](gradientImage, (_sketch$export2 = {
    scales: '1, 2',
    formats: 'png',
    // @ts-ignore
    output: NSTemporaryDirectory()
  }, _defineProperty(_sketch$export2, 'use-id-for-name', true), _defineProperty(_sketch$export2, 'save-for-web', true), _defineProperty(_sketch$export2, "overwriting", true), _sketch$export2)); // remove image from page

  gradientImage.remove(); // return final image

  return {
    id: layer.id,
    src: (_src2 = {}, _defineProperty(_src2, "1x", "".concat(NSTemporaryDirectory()).concat(gradientImage.id, ".png")), _defineProperty(_src2, "2x", "".concat(NSTemporaryDirectory()).concat(gradientImage.id, "@2x.png")), _src2)
  };
};

var fillImageToImage = function fillImageToImage(page, image, sketch) {
  var _sketch$export3, _src3;

  // get image size
  var width = image.nsimage.size().width;
  var height = image.nsimage.size().height; // create image from fill image

  var fillImage = new sketch.Image({
    image: image,
    parent: page,
    frame: {
      width: width,
      height: height,
      x: 0,
      y: 0
    }
  }); // export image to temp dir

  sketch["export"](fillImage, (_sketch$export3 = {
    scales: '1, 2',
    formats: 'png',
    // @ts-ignore
    output: NSTemporaryDirectory()
  }, _defineProperty(_sketch$export3, 'use-id-for-name', true), _defineProperty(_sketch$export3, 'save-for-web', true), _defineProperty(_sketch$export3, "overwriting", true), _sketch$export3)); // remove image from page

  fillImage.remove(); // return final image

  return {
    id: image.id,
    src: (_src3 = {}, _defineProperty(_src3, "1x", "".concat(NSTemporaryDirectory()).concat(fillImage.id, ".png")), _defineProperty(_src3, "2x", "".concat(NSTemporaryDirectory()).concat(fillImage.id, "@2x.png")), _src3)
  };
};

var createTempImages = function createTempImages(page, layers, sketch) {
  var images = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  if (layers.length > 0) {
    layers.forEach(function (layer) {
      if (layer.type === 'Group') {
        createTempImages(page, layer.layers, sketch, images);
      } else if (layer.type === 'Image') {
        var image = imageLayerToImage(page, layer, sketch);
        images.push(image);
      } else if (layer.type === 'Shape' || layer.type === 'ShapePath') {
        layer.style.fills.forEach(function (fill) {
          if (fill.pattern.image !== null && fill.enabled) {
            // create image from fill image
            var fillImage = fillImageToImage(page, fill.pattern.image, sketch); // push final image

            images.push(fillImage);
          } else if (fill.fillType === 'Gradient' && fill.enabled) {
            // create gradient image
            var gradientImage = fillGradientToImage(page, layer, sketch); // push final image

            images.push(gradientImage);
          }
        });
      }
    });
  }

  return images;
};

var getImages = function getImages(page, layers, sketch) {
  var layerImages = createTempImages(page, layers, sketch);
  return layerImages;
};

/* harmony default export */ __webpack_exports__["default"] = (getImages);

/***/ }),

/***/ "./resources/store/index.js":
/*!**********************************!*\
  !*** ./resources/store/index.js ***!
  \**********************************/
/*! exports provided: createArtboardImage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createArtboardImage", function() { return createArtboardImage; });
/* harmony import */ var _artboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./artboard */ "./resources/store/artboard.js");
/* harmony import */ var _images__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./images */ "./resources/store/images.js");
/* harmony import */ var _svgs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./svgs */ "./resources/store/svgs.js");
/* harmony import */ var _fonts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fonts */ "./resources/store/fonts.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var createArtboardImage = function createArtboardImage(artboard, sketch) {
  var buffer = sketch["export"](artboard, _defineProperty({
    scales: '0.10',
    formats: 'png',
    output: false
  }, 'save-for-web', true)); // create image from buffer data

  var bufferImg = new sketch.Image({
    image: buffer
  });
  var base64 = bufferImg.image.nsdata.base64EncodedStringWithOptions(0);
  return "data:image/png;base64, ".concat(base64);
};

var getStore = function getStore(page, selectedArtboard, sketch, callback) {
  // get final store items
  var artboard = Object(_artboard__WEBPACK_IMPORTED_MODULE_0__["default"])(page, selectedArtboard, sketch);
  var images = Object(_images__WEBPACK_IMPORTED_MODULE_1__["default"])(page, artboard.layers, sketch);
  var svgs = Object(_svgs__WEBPACK_IMPORTED_MODULE_2__["default"])(page, artboard.layers, sketch);
  var artboardImage = createArtboardImage(artboard, sketch);
  var fonts = Object(_fonts__WEBPACK_IMPORTED_MODULE_3__["default"])(artboard.layers);
  var notes = []; // remove duplicate artboard

  artboard.remove(); // set store

  var store = {
    artboard: artboard,
    images: images,
    svgs: svgs,
    notes: notes,
    fonts: fonts,
    artboardImage: artboardImage
  }; // return callback

  callback(store);
};

/* harmony default export */ __webpack_exports__["default"] = (getStore);

/***/ }),

/***/ "./resources/store/svgs.js":
/*!*********************************!*\
  !*** ./resources/store/svgs.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var shapeToSVG = function shapeToSVG(page, layer, sketch) {
  var _sketch$export;

  var borderSize = 0;
  var activeBorders = layer.style.borders.filter(function (border) {
    return border.enabled;
  });

  if (activeBorders) {
    activeBorders.forEach(function (border) {
      if (border.thickness > borderSize) {
        borderSize = border.thickness;
      }
    });
  } // duplicate layer


  var layerDuplicate = layer.duplicate(); // set parent to page

  layerDuplicate.parent = page; // remove transforms
  // transforms will be applied on the div, not svg

  layerDuplicate.transform.rotation = 0;
  layerDuplicate.transform.flippedHorizontally = false;
  layerDuplicate.transform.flippedVertically = false; // export duplicate layer

  sketch["export"](layerDuplicate, (_sketch$export = {
    formats: 'svg',
    // @ts-ignore
    output: NSTemporaryDirectory()
  }, _defineProperty(_sketch$export, 'use-id-for-name', true), _defineProperty(_sketch$export, "overwriting", true), _sketch$export)); // update layer frame to include bordersize

  layer.frame.width = Math.round(layer.frame.width + borderSize * 1.5);
  layer.frame.height = Math.round(layer.frame.height + borderSize * 1.5);
  layer.frame.x = Math.round(layer.frame.x - borderSize * 1.5 / 2);
  layer.frame.y = Math.round(layer.frame.y - borderSize * 1.5 / 2); // remove duplicate layer

  layerDuplicate.remove(); // return AppAsset

  return {
    id: layer.id,
    // @ts-ignore
    src: "".concat(NSTemporaryDirectory()).concat(layerDuplicate.id, ".svg")
  };
};

var createTempSVGs = function createTempSVGs(page, layers, sketch) {
  var svgs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  if (layers.length > 0) {
    layers.forEach(function (layer) {
      if (layer.type === 'Group') {
        createTempSVGs(page, layer.layers, sketch, svgs);
      } else if (layer.type === 'Shape') {
        var svg = shapeToSVG(page, layer, sketch);
        svgs.push(svg);
      } else if (layer.type === 'ShapePath') {
        var hasOpenPath = !layer.closed;
        var notRectangle = layer.shapeType !== 'Rectangle';
        var notOval = layer.shapeType !== 'Oval';
        var isOddShape = notRectangle && notOval;
        var hasDashPattern = layer.style.borderOptions.dashPattern.length > 0;

        if (hasOpenPath || isOddShape || hasDashPattern) {
          var _svg = shapeToSVG(page, layer, sketch);

          svgs.push(_svg);
        }
      }
    });
  }

  return svgs;
};

var getSVGs = function getSVGs(page, layers, sketch) {
  var shapeSvgs = createTempSVGs(page, layers, sketch);
  return shapeSvgs;
};

/* harmony default export */ __webpack_exports__["default"] = (getSVGs);

/***/ })

/******/ });
//# sourceMappingURL=resources_store_index.js.map