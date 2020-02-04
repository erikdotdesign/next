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
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/store/svgs.js");
/******/ })
/************************************************************************/
/******/ ({

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
//# sourceMappingURL=resources_store_svgs.js.map