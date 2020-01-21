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
//# sourceMappingURL=resources_store_svgs.js.map