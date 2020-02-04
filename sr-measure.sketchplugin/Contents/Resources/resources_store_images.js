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

/***/ })

/******/ });
//# sourceMappingURL=resources_store_images.js.map