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
  // flattenGroups(artboard.layers);
  // round layer frame dimensions

  roundFrameDimensions(artboard.layers); // return final artboard

  return artboard;
};

/* harmony default export */ __webpack_exports__["default"] = (getArtboard);

/***/ })

/******/ });
//# sourceMappingURL=resources_store_artboard.js.map