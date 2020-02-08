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
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/store/assets.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/store/assets.js":
/*!***********************************!*\
  !*** ./resources/store/assets.js ***!
  \***********************************/
/*! exports provided: createArtboardImage, getAssets, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createArtboardImage", function() { return createArtboardImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAssets", function() { return getAssets; });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createSvgFromLayer = function createSvgFromLayer(page, layer, sketch, id) {
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

  layerDuplicate.parent = page; // opacity and transforms will be applied on the div, not svg

  layerDuplicate.style.opacity = 1;
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
    id: id ? id : layer.id,
    // @ts-ignore
    src: "".concat(NSTemporaryDirectory()).concat(layerDuplicate.id, ".svg")
  };
};

var createShapeFromLayer = function createShapeFromLayer(layer, sketch, name) {
  // create new shape
  var shapeReplacement = new sketch.Shape({
    name: name ? name : layer.name,
    frame: layer.frame,
    style: layer.style,
    transform: {
      rotation: layer.transform.rotation,
      flippedHorizontally: layer.transform.flippedHorizontally,
      flippedVertically: layer.transform.flippedVertically
    }
  }); // return new shape

  return shapeReplacement;
};

var createShapeFromGroup = function createShapeFromGroup(layer, sketch, prefix) {
  // remove prefix from name
  var newName = layer.name.substr(prefix.length, layer.name.length - prefix.length).trim(); // create new shape

  var shapeReplacement = createShapeFromLayer(layer, sketch, newName); // return new shape

  return shapeReplacement;
};

var createImageLayerImage = function createImageLayerImage(page, layer, sketch) {
  var _sketch$export2, _src;

  var layerDuplicate = layer.duplicate(); // reset asset position on artboard

  layerDuplicate.parent = page; // export asset to temp folder

  sketch["export"](layerDuplicate, (_sketch$export2 = {
    scales: '1, 2',
    formats: 'png',
    // @ts-ignore
    output: NSTemporaryDirectory()
  }, _defineProperty(_sketch$export2, 'use-id-for-name', true), _defineProperty(_sketch$export2, 'save-for-web', true), _defineProperty(_sketch$export2, "overwriting", true), _sketch$export2)); // remove asset artboard from page

  layerDuplicate.remove(); // return AppAsset

  return {
    id: layer.image.id,
    src: (_src = {}, _defineProperty(_src, "1x", "".concat(NSTemporaryDirectory()).concat(layerDuplicate.id, ".png")), _defineProperty(_src, "2x", "".concat(NSTemporaryDirectory()).concat(layerDuplicate.id, "@2x.png")), _src)
  };
};

var createGradientFillImage = function createGradientFillImage(page, layer, sketch) {
  var _sketch$export3, _src2;

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

  sketch["export"](gradientImage, (_sketch$export3 = {
    scales: '1, 2',
    formats: 'png',
    // @ts-ignore
    output: NSTemporaryDirectory()
  }, _defineProperty(_sketch$export3, 'use-id-for-name', true), _defineProperty(_sketch$export3, 'save-for-web', true), _defineProperty(_sketch$export3, "overwriting", true), _sketch$export3)); // remove image from page

  gradientImage.remove(); // return final image

  return {
    id: layer.id,
    src: (_src2 = {}, _defineProperty(_src2, "1x", "".concat(NSTemporaryDirectory()).concat(gradientImage.id, ".png")), _defineProperty(_src2, "2x", "".concat(NSTemporaryDirectory()).concat(gradientImage.id, "@2x.png")), _src2)
  };
};

var createImageFillImage = function createImageFillImage(page, image, sketch) {
  var _sketch$export4, _src3;

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

  sketch["export"](fillImage, (_sketch$export4 = {
    scales: '1, 2',
    formats: 'png',
    // @ts-ignore
    output: NSTemporaryDirectory()
  }, _defineProperty(_sketch$export4, 'use-id-for-name', true), _defineProperty(_sketch$export4, 'save-for-web', true), _defineProperty(_sketch$export4, "overwriting", true), _sketch$export4)); // remove image from page

  fillImage.remove(); // return final image

  return {
    id: image.id,
    src: (_src3 = {}, _defineProperty(_src3, "1x", "".concat(NSTemporaryDirectory()).concat(fillImage.id, ".png")), _defineProperty(_src3, "2x", "".concat(NSTemporaryDirectory()).concat(fillImage.id, "@2x.png")), _src3)
  };
};

var processLayerFills = function processLayerFills(page, layer, images, sketch) {
  var fillImages = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  layer.style.fills.forEach(function (fill) {
    if (fill.pattern.image !== null && fill.enabled && !images.find(function (image) {
      return image.id === fill.pattern.image.id;
    })) {
      var fillImage = createImageFillImage(page, fill.pattern.image, sketch);
      fillImages.push(fillImage);
    } else if (fill.fillType === 'Gradient' && fill.enabled) {
      var gradientImage = createGradientFillImage(page, layer, sketch);
      fillImages.push(gradientImage);
    }
  });
  return fillImages;
};

var isComplexShapePath = function isComplexShapePath(layer) {
  var hasOpenPath = !layer.closed;
  var notRectangle = layer.shapeType !== 'Rectangle';
  var notOval = layer.shapeType !== 'Oval';
  var isOddShape = notRectangle && notOval;
  var hasDashPattern = layer.style.borderOptions.dashPattern.length > 0;
  return hasOpenPath || isOddShape || hasDashPattern;
};

var processShapePath = function processShapePath(page, layer, images, sketch, callback) {
  var isComplex = isComplexShapePath(layer);
  var shapePathFillImages = processLayerFills(page, layer, images, sketch);

  if (isComplex) {
    // turn complex shapePaths into shapes
    // makes things easier when divs are styled later
    var shapeReplacement = createShapeFromLayer(layer, sketch);
    var svg = createSvgFromLayer(page, layer, sketch, shapeReplacement.id);
    layer.parent.layers.splice(layer.index, 1, shapeReplacement);
    callback(shapePathFillImages, svg);
  } else {
    callback(shapePathFillImages, null);
  }
};

var processShape = function processShape(page, layer, images, sketch, callback) {
  var shapeFillImages = processLayerFills(page, layer, images, sketch);
  var svg = createSvgFromLayer(page, layer, sketch);
  callback(shapeFillImages, svg);
};

var processImage = function processImage(page, layer, images, sketch, callback) {
  if (!images.find(function (image) {
    return image.id === layer.image.id;
  })) {
    var image = createImageLayerImage(page, layer, sketch);
    callback(image);
  } else {
    callback(null);
  }
};

var processGroup = function processGroup(page, layer, sketch, callback) {
  if (layer.name.startsWith('[srm.svg]')) {
    // create shape to replace group
    var shapeReplacement = createShapeFromGroup(layer, sketch, '[srm.svg]'); // create svg from group

    var svg = createSvgFromLayer(page, layer, sketch, shapeReplacement.id); // splice in shape replacement, splice out old group

    layer.parent.layers.splice(layer.index, 1, shapeReplacement); // return callback

    callback(svg);
  } else {
    callback(null);
  }
};

var processText = function processText(layer, fonts, callback) {
  var fontFamily = layer.style.fontFamily; //@ts-ignore

  var availableFamilies = NSFontManager.sharedFontManager().availableFontFamilies();
  var availableFamiliesArray = Array.from(availableFamilies, function (item) {
    return String(item);
  });
  var fontAvailable = availableFamiliesArray.includes(fontFamily);

  if (fonts && fontAvailable && !fonts.includes(fontFamily)) {
    callback(fontFamily);
  } else {
    callback(null);
  }
};

var processLayer = function processLayer(page, layer, sketch, images, svgs, fonts, callback) {
  switch (layer.type) {
    case 'Image':
      processImage(page, layer, images, sketch, function (image) {
        if (image) {
          images.push(image);
        }
      });
      break;

    case 'Shape':
      processShape(page, layer, images, sketch, function (shapeImages, shapeSvg) {
        images.push.apply(images, _toConsumableArray(shapeImages));
        svgs.push(shapeSvg);
      });
      break;

    case 'ShapePath':
      processShapePath(page, layer, images, sketch, function (shapePathImages, shapePathSvg) {
        if (shapePathSvg) {
          svgs.push(shapePathSvg);
        }

        images.push.apply(images, _toConsumableArray(shapePathImages));
      });
      break;

    case 'Text':
      processText(layer, fonts, function (font) {
        if (font) {
          fonts.push(font);
        }
      });
      break;

    case 'Group':
      processGroup(page, layer, sketch, function (groupSvg) {
        if (groupSvg) {
          svgs.push(groupSvg);
        }
      });
      break;
  }

  callback({
    images: images,
    svgs: svgs,
    fonts: fonts
  });
};

var processLayers = function processLayers(page, layers, sketch) {
  var images = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var svgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  var fonts = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];

  if (layers.length > 0) {
    layers.forEach(function (layer) {
      processLayer(page, layer, sketch, images, svgs, fonts, function (newAssets) {
        images = newAssets.images;
        svgs = newAssets.svgs;
        fonts = newAssets.fonts;
      });

      if (layer.type === 'Group') {
        processLayers(page, layer.layers, sketch, images, svgs, fonts);
      }
    });
  }

  return {
    images: images,
    svgs: svgs,
    fonts: fonts
  };
};

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
var getAssets = function getAssets(page, artboard, sketch) {
  var artboardAssets = processLayers(page, artboard.layers, sketch);
  var artboardImage = createArtboardImage(artboard, sketch);
  return Object.assign(Object.assign({}, artboardAssets), {
    artboardImage: artboardImage
  });
};
/* harmony default export */ __webpack_exports__["default"] = (getAssets);

/***/ })

/******/ });
//# sourceMappingURL=resources_store_assets.js.map