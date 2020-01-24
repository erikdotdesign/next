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
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/store/images.js");
/******/ })
/************************************************************************/
/******/ ({

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

  if (layers.length > 0) {
    layers.forEach(function (layer) {
      if (layer.type === 'Group') {
        getBase64Gradients(layer.layers, sketch, images);
      } else if (layer.type === 'Shape' || layer.type === 'ShapePath') {
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
  }

  return images;
};

var getLayerImages = function getLayerImages(layers) {
  var images = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (layers.length > 0) {
    layers.forEach(function (layer) {
      if (layer.type === 'Group') {
        getLayerImages(layer.layers, images);
      } else if (layer.type === 'Image') {
        images.push(layer.image);
      }
    });
  }

  return images;
};

var getFillImages = function getFillImages(layers) {
  var images = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (layers.length > 0) {
    layers.forEach(function (layer) {
      if (layer.type === 'Group') {
        getFillImages(layer.layers, images);
      } else if (layer.type === 'Shape' || layer.type === 'ShapePath') {
        layer.style.fills.forEach(function (fill) {
          if (fill.pattern.image !== null && fill.enabled) {
            images.push(fill.pattern.image);
          }
        });
      }
    });
  }

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

/***/ })

/******/ });
//# sourceMappingURL=resources_store_images.js.map