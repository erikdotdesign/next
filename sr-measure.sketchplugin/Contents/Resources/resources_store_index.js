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

/***/ "./resources/export/index.js":
/*!***********************************!*\
  !*** ./resources/export/index.js ***!
  \***********************************/
/*! exports provided: getRoot, getFileContent, getSavePath, writeFile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRoot", function() { return getRoot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFileContent", function() { return getFileContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSavePath", function() { return getSavePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeFile", function() { return writeFile; });
var getRoot = function getRoot(context) {
  return context.scriptPath.stringByDeletingLastPathComponent().stringByDeletingLastPathComponent().stringByDeletingLastPathComponent();
};
var getFileContent = function getFileContent(filePath) {
  //@ts-ignore
  return NSString.stringWithContentsOfFile_encoding_error(filePath, 4, nil);
};
var getSavePath = function getSavePath(context) {
  var filePath = context.document.fileURL() ? context.document.fileURL().path().stringByDeletingLastPathComponent() : "~";
  var fileName = context.document.displayName().stringByDeletingPathExtension(); //@ts-ignore

  var savePanel = NSSavePanel.savePanel();
  savePanel.setTitle("Export spec");
  savePanel.setNameFieldLabel("Export to:");
  savePanel.setPrompt("Export");
  savePanel.setCanCreateDirectories(true);
  savePanel.setNameFieldStringValue(fileName); //@ts-ignore

  if (savePanel.runModal() != NSOKButton) {
    return false;
  }

  return savePanel.URL().path();
}; //@ts-ignore

var writeFile = function writeFile(options) {
  //@ts-ignore
  var content = NSString.stringWithString(options.content);
  var savePathName = []; //@ts-ignore

  NSFileManager.defaultManager().createDirectoryAtPath_withIntermediateDirectories_attributes_error(options.path, true, nil, nil);
  savePathName.push(options.path, "/", options.fileName);
  savePathName = savePathName.join("");
  content.writeToFile_atomically_encoding_error(savePathName, false, 4, null);
};

/***/ }),

/***/ "./resources/store/artboard.js":
/*!*************************************!*\
  !*** ./resources/store/artboard.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      var transparent = layer.style.opacity === 0;
      var hiddenOrTransparent = hidden || transparent;

      if (layer.type === 'Group' && !hiddenOrTransparent) {
        removeHiddenLayers(layer.layers);
      } else if (hiddenOrTransparent) {
        layer.remove();
      }
    });
  }
};

var maskGroupToImageLayer = function maskGroupToImageLayer(maskGroup, sketch) {
  // create image buffer from layer
  var buffer = sketch["export"](maskGroup, _defineProperty({
    formats: 'png',
    output: false
  }, 'save-for-web', true)); // create image layer from buffer data

  var imageLayer = new sketch.Image({
    name: 'masked-group',
    image: buffer
  }); // set image layer frame to match mask group frame

  imageLayer.frame = maskGroup.frame; // return image layer

  return imageLayer;
};

var masksToImages = function masksToImages(layers, sketch) {
  if (layers.length > 0) {
    layers.forEach(function (layer) {
      var hasClippingMask = layer.sketchObject.hasClippingMask();
      var hasParentGroup = layer.parent && layer.parent.type === 'Group';

      if (layer.type === 'Group' && !hasClippingMask) {
        masksToImages(layer.layers, sketch);
      } else if (hasClippingMask && hasParentGroup) {
        // @ts-ignore
        var parent = layer.parent;
        var parentIndex = parent.index;
        var parentsParent = parent.parent;
        var imageLayer = maskGroupToImageLayer(parent, sketch); // splice in new image, splice out old mask group

        parentsParent.layers.splice(parentIndex, 1, imageLayer);
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
  layers.forEach(function (layer) {
    layer.frame.x = Math.round(layer.frame.x);
    layer.frame.y = Math.round(layer.frame.y);
    layer.frame.width = Math.round(layer.frame.width);
    layer.frame.height = Math.round(layer.frame.height);
  });
};

var getArtboard = function getArtboard(selectedArtboard, sketch) {
  // duplicate artboard
  var artboard = selectedArtboard.duplicate(); // reset duplicated artboard position

  artboard.frame.x = 0;
  artboard.frame.y = 0; // removes hotspots, slices, and artboards

  removeIrrelevantLayers(artboard.layers); // detach all symbols from artboard, returns layer groups

  detatchSymbols(artboard.layers); // remove hidden layers

  removeHiddenLayers(artboard.layers); // turn masks into image layers

  masksToImages(artboard.layers, sketch); // flatten all groups

  flattenGroups(artboard.layers); // round layer frame dimensions

  roundFrameDimensions(artboard.layers); // return final artboard

  return artboard;
};

/* harmony default export */ __webpack_exports__["default"] = (getArtboard);

/***/ }),

/***/ "./resources/store/images.js":
/*!***********************************!*\
  !*** ./resources/store/images.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createBase64Image = function createBase64Image(nsdata, id) {
  var newImageBase64 = nsdata.base64EncodedStringWithOptions(0);
  var newImage = 'data:image/png;base64,' + newImageBase64;
  return {
    id: id,
    src: newImage
  };
};

var base64ImageBatch = function base64ImageBatch(images) {
  return images.map(function (image) {
    return createBase64Image(image.nsdata, image.id);
  });
};

var layerToBase64 = function layerToBase64(layer, id, sketch) {
  // create image buffer from layer
  var buffer = sketch["export"](layer, _defineProperty({
    formats: 'png',
    output: false
  }, 'save-for-web', true)); // create image from buffer data

  var bufferImg = new sketch.Image({
    image: buffer
  }); // return base64 image

  return createBase64Image(bufferImg.image.nsdata, id);
};

var gradientToBase64 = function gradientToBase64(layer, id, sketch) {
  // get enabled gradients
  var activeGradients = layer.style.fills.filter(function (fill) {
    return fill.enabled && fill.fillType === 'Gradient';
  }); // get top gradient fill

  var topGradient = activeGradients[activeGradients.length - 1]; // only keep layer gradient styles

  layer.style.fills = [topGradient];
  layer.style.borders = [];
  layer.style.shadows = [];
  layer.style.innerShadows = [];
  layer.transform.rotation = 0;
  layer.transform.flippedHorizontally = false;
  layer.transform.flippedVertically = false;

  if (layer.type === 'ShapePath') {
    layer.points.forEach(function (point) {
      return point.cornerRadius = 0;
    });
  } // return base64 image


  return layerToBase64(layer, id, sketch);
};

var getBase64Gradients = function getBase64Gradients(layers, sketch) {
  var images = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  layers.forEach(function (layer) {
    if (layer.type === 'Shape' || layer.type === 'ShapePath') {
      // check if fills contain any enabled gradients
      var hasActiveGradient = layer.style.fills.some(function (fill) {
        return fill.fillType === 'Gradient' && fill.enabled;
      }); // generate gradient base64

      if (hasActiveGradient) {
        // duplicate layer
        // all styles but the gradient will be removed
        var layerDuplicate = layer.duplicate(); // create base64 from duplicate layer

        var base64Gradient = gradientToBase64(layerDuplicate, layer.id, sketch); // push base64 gradient to images

        images.push(base64Gradient); // remove duplicate

        layerDuplicate.remove();
      }
    }
  });
  return images;
};

var getLayerImages = function getLayerImages(layers) {
  var images = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  layers.forEach(function (layer) {
    if (layer.type === 'Image') {
      images.push(layer.image);
    }
  });
  return images;
};

var getFillImages = function getFillImages(layers) {
  var images = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  layers.forEach(function (layer) {
    if (layer.type === 'Shape' || layer.type === 'ShapePath') {
      layer.style.fills.forEach(function (fill) {
        if (fill.pattern.image !== null && fill.enabled) {
          images.push(fill.pattern.image);
        }
      });
    }
  });
  return images;
};

var getImages = function getImages(layers, sketch) {
  // get layers to turn into base64
  var layerImages = getLayerImages(layers);
  var fillImages = getFillImages(layers); // generate base64 images from layers

  var base64LayerImages = base64ImageBatch(layerImages);
  var base64FillImages = base64ImageBatch(fillImages);
  var base64Gradients = getBase64Gradients(layers, sketch); // return final base64 image store

  return [].concat(_toConsumableArray(base64LayerImages), _toConsumableArray(base64FillImages), _toConsumableArray(base64Gradients));
};

/* harmony default export */ __webpack_exports__["default"] = (getImages);

/***/ }),

/***/ "./resources/store/index.js":
/*!**********************************!*\
  !*** ./resources/store/index.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _artboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./artboard */ "./resources/store/artboard.js");
/* harmony import */ var _images__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./images */ "./resources/store/images.js");
/* harmony import */ var _svgs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./svgs */ "./resources/store/svgs.js");




var getStore = function getStore(selectedArtboard, sketch) {
  // get final store items
  var artboard = Object(_artboard__WEBPACK_IMPORTED_MODULE_0__["default"])(selectedArtboard, sketch);
  var images = Object(_images__WEBPACK_IMPORTED_MODULE_1__["default"])(artboard.layers, sketch);
  var svgs = Object(_svgs__WEBPACK_IMPORTED_MODULE_2__["default"])(artboard.layers, sketch);
  var notes = {}; // remove duplicate artboard

  artboard.remove(); // run callback

  return {
    artboard: artboard,
    images: images,
    svgs: svgs,
    notes: notes
  };
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
/* harmony import */ var _export__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../export */ "./resources/export/index.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var getOddShapePathSVGs = function getOddShapePathSVGs(layers, sketch) {
  var svgs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  layers.forEach(function (layer) {
    if (layer.type === 'ShapePath') {
      var hasOpenPath = !layer.closed;
      var notRectangle = layer.shapeType !== 'Rectangle';
      var notOval = layer.shapeType !== 'Oval';
      var isOddShape = notRectangle && notOval;

      if (hasOpenPath || isOddShape) {
        var _sketch$export;

        // create svg in temp directory
        sketch["export"](layer, (_sketch$export = {
          formats: 'svg',
          // @ts-ignore
          output: NSTemporaryDirectory()
        }, _defineProperty(_sketch$export, 'use-id-for-name', true), _defineProperty(_sketch$export, "compact", true), _defineProperty(_sketch$export, "overwriting", true), _sketch$export)); // get new svg path
        // @ts-ignore

        var filePath = "".concat(NSTemporaryDirectory()).concat(layer.id, ".svg"); // read contents of svg

        var svgContent = Object(_export__WEBPACK_IMPORTED_MODULE_0__["getFileContent"])(filePath); // set contents in svgs

        svgs.push({
          id: layer.id,
          svg: "".concat(svgContent)
        });
      }
    }
  });
  return svgs;
};

var getShapeSVGs = function getShapeSVGs(layers, sketch) {
  var svgs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  layers.forEach(function (layer) {
    if (layer.type === 'Shape') {
      var _sketch$export2;

      // create svg in temp directory
      sketch["export"](layer, (_sketch$export2 = {
        formats: 'svg',
        // @ts-ignore
        output: NSTemporaryDirectory()
      }, _defineProperty(_sketch$export2, 'use-id-for-name', true), _defineProperty(_sketch$export2, "compact", true), _defineProperty(_sketch$export2, "overwriting", true), _sketch$export2)); // get new svg path
      // @ts-ignore

      var filePath = "".concat(NSTemporaryDirectory()).concat(layer.id, ".svg"); // read contents of svg

      var svgContent = Object(_export__WEBPACK_IMPORTED_MODULE_0__["getFileContent"])(filePath); // set contents in svgs

      svgs.push({
        id: layer.id,
        svg: "".concat(svgContent)
      });
    }
  });
  return svgs;
};

var getSVGs = function getSVGs(layers, sketch) {
  var shapeSvgs = getShapeSVGs(layers, sketch);
  var oddShapePathSvgs = getOddShapePathSVGs(layers, sketch);
  return [].concat(_toConsumableArray(shapeSvgs), _toConsumableArray(oddShapePathSvgs));
};

/* harmony default export */ __webpack_exports__["default"] = (getSVGs);

/***/ })

/******/ });
//# sourceMappingURL=resources_store_index.js.map