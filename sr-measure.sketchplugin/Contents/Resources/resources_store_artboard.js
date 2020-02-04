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
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/store/artboard.js");
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

/***/ })

/******/ });
//# sourceMappingURL=resources_store_artboard.js.map