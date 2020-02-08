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
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/export/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/export/index.js":
/*!***********************************!*\
  !*** ./resources/export/index.js ***!
  \***********************************/
/*! exports provided: getSystemFontsLocation, getUserFontsLocation, getSupplementalFontsLocation, getUserFonts, getSystemFonts, getSupplimentalFonts, getAllFonts, getRoot, getFileContent, getSavePath, writeFile, moveImages, moveSVGs, copyFonts, getFinalStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSystemFontsLocation", function() { return getSystemFontsLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserFontsLocation", function() { return getUserFontsLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSupplementalFontsLocation", function() { return getSupplementalFontsLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserFonts", function() { return getUserFonts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSystemFonts", function() { return getSystemFonts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSupplimentalFonts", function() { return getSupplimentalFonts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllFonts", function() { return getAllFonts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRoot", function() { return getRoot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFileContent", function() { return getFileContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSavePath", function() { return getSavePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeFile", function() { return writeFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moveImages", function() { return moveImages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moveSVGs", function() { return moveSVGs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copyFonts", function() { return copyFonts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFinalStore", function() { return getFinalStore; });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getSystemFontsLocation = function getSystemFontsLocation() {
  //@ts-ignore
  var systemLibrary = NSFileManager.defaultManager().URLsForDirectory_inDomains(NSLibraryDirectory, 8)[0];
  var systemLibraryPath = systemLibrary ? systemLibrary.absoluteString().replace('file://', '') : null; //@ts-ignore

  var systemFonts = systemLibraryPath ? NSFileManager.defaultManager().fileExistsAtPath("".concat(systemLibraryPath, "Fonts")) : null;

  if (systemFonts) {
    return "".concat(systemLibraryPath, "Fonts/");
  } else {
    return null;
  }
};
var getUserFontsLocation = function getUserFontsLocation() {
  //@ts-ignore
  var userLibrary = NSFileManager.defaultManager().URLsForDirectory_inDomains(NSLibraryDirectory, 1)[0];
  var userLibraryPath = userLibrary ? userLibrary.absoluteString().replace('file://', '') : null; //@ts-ignore

  var userFonts = userLibraryPath ? NSFileManager.defaultManager().fileExistsAtPath("".concat(userLibraryPath, "Fonts")) : null;

  if (userFonts) {
    return "".concat(userLibraryPath, "Fonts/");
  } else {
    return null;
  }
};
var getSupplementalFontsLocation = function getSupplementalFontsLocation() {
  //@ts-ignore
  var systemLibrary = NSFileManager.defaultManager().URLsForDirectory_inDomains(NSLibraryDirectory, 8)[0];
  var systemLibraryPath = systemLibrary ? systemLibrary.absoluteString().replace('file://', '') : null; //@ts-ignore

  var systemFonts = systemLibraryPath ? NSFileManager.defaultManager().fileExistsAtPath("".concat(systemLibraryPath, "Fonts/Supplemental")) : null;

  if (systemFonts) {
    return "".concat(systemLibraryPath, "Fonts/Supplemental/");
  } else {
    return null;
  }
};
var getUserFonts = function getUserFonts() {
  var userFontsLoc = getUserFontsLocation();

  if (userFontsLoc) {
    //@ts-ignore
    var userFonts = NSFileManager.defaultManager().contentsOfDirectoryAtPath_error(userFontsLoc, nil);
    return Array.from(userFonts, function (item) {
      return String(item);
    });
  } else {
    return null;
  }
};
var getSystemFonts = function getSystemFonts() {
  var systemFontsLoc = getSystemFontsLocation();

  if (systemFontsLoc) {
    //@ts-ignore
    var systemFonts = NSFileManager.defaultManager().contentsOfDirectoryAtPath_error(systemFontsLoc, nil);
    return Array.from(systemFonts, function (item) {
      return String(item);
    });
  } else {
    return null;
  }
};
var getSupplimentalFonts = function getSupplimentalFonts() {
  var supplementalFontsLoc = getSupplementalFontsLocation();

  if (supplementalFontsLoc) {
    //@ts-ignore
    var supplementalFonts = NSFileManager.defaultManager().contentsOfDirectoryAtPath_error(supplementalFontsLoc, nil);
    return Array.from(supplementalFonts, function (item) {
      return String(item);
    });
  } else {
    return null;
  }
};
var getAllFonts = function getAllFonts() {
  var userFontsLoc = getUserFontsLocation();
  var systemFontsLoc = getSystemFontsLocation();
  var supplementalFontsLoc = getSupplementalFontsLocation();
  var userFonts = getUserFonts();
  var systemFonts = getSystemFonts();
  var supplementalFonts = getSupplimentalFonts();
  var fontLocations = [userFontsLoc, systemFontsLoc, supplementalFontsLoc];
  var fontLocationContents = [userFonts, systemFonts, supplementalFonts];
  var availableFontLocations = fontLocations.filter(function (fontDir) {
    return fontDir !== null;
  });

  if (availableFontLocations.length > 0) {
    var allFonts = availableFontLocations.map(function (fontLocation, index) {
      return {
        location: fontLocation,
        contents: fontLocationContents[index]
      };
    });
    return allFonts;
  } else {
    return null;
  }
};
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
}; //@ts-ignore

var moveImages = function moveImages(images, savePath) {
  var imagesPath = "".concat(savePath, "/images"); //@ts-ignore

  NSFileManager.defaultManager().createDirectoryAtPath_attributes(imagesPath, nil);
  images.forEach(function (image) {
    //@ts-ignore
    NSFileManager.defaultManager().moveItemAtPath_toPath_error(image.src["1x"], "".concat(imagesPath, "/").concat(image.id, ".png"), nil); //@ts-ignore

    NSFileManager.defaultManager().moveItemAtPath_toPath_error(image.src["2x"], "".concat(imagesPath, "/").concat(image.id, "@2x.png"), nil);
  });
}; //@ts-ignore

var moveSVGs = function moveSVGs(svgs, savePath) {
  var svgsPath = "".concat(savePath, "/svgs"); //@ts-ignore

  NSFileManager.defaultManager().createDirectoryAtPath_attributes(svgsPath, nil);
  svgs.forEach(function (svg) {
    //@ts-ignore
    NSFileManager.defaultManager().moveItemAtPath_toPath_error(svg.src, "".concat(svgsPath, "/").concat(svg.id, ".svg"), nil);
  });
};

var getFontNameVariations = function getFontNameVariations(font) {
  var noSpace = font.replace(/\s/g, '');
  var hyphenCase = font.replace(/\s/g, '-');
  return [font, noSpace, hyphenCase];
};

var containsFontNameVariation = function containsFontNameVariation(fontFileName, fontNameVariations) {
  var contains = false;
  var normalizedFileName = fontFileName.toUpperCase();
  fontNameVariations.forEach(function (variation) {
    var normalizedNameVariant = variation.toUpperCase();

    if (normalizedFileName.indexOf(normalizedNameVariant) !== -1) {
      contains = true;
    }
  });
  return contains;
};

var copyFonts = function copyFonts(fonts, savePath) {
  // get user, system, and supplemental fonts
  var allFonts = getAllFonts(); // set font save location

  var fontsSavePath = "".concat(savePath, "/fonts"); // if some font directories exist, move forward

  if (allFonts) {
    // create base font directory in spec folder
    //@ts-ignore
    NSFileManager.defaultManager().createDirectoryAtPath_attributes(fontsSavePath, nil); // loop through app fonts

    fonts.forEach(function (font) {
      // loop through font directories
      allFonts.forEach(function (fontDir) {
        // if directory exists, move forward
        var fontNameVariations = getFontNameVariations(font);
        var fontFiles = fontDir.contents.filter(function (fontFileName) {
          return containsFontNameVariation(fontFileName, fontNameVariations);
        });

        if (fontFiles.length > 0) {
          //@ts-ignore
          NSFileManager.defaultManager().createDirectoryAtPath_attributes("".concat(fontsSavePath, "/").concat(font), nil);
          fontFiles.forEach(function (fontFile) {
            //@ts-ignore
            NSFileManager.defaultManager().copyItemAtPath_toPath_error("".concat(fontDir.location, "/").concat(fontFile), "".concat(fontsSavePath, "/").concat(font, "/").concat(fontFile), nil);
          });
        }
      });
    });
  }
};
var getFinalStore = function getFinalStore(store) {
  // copy store, and set final store
  var finalStore = Object.assign({}, store); // update final store image paths

  finalStore.images = store.images.map(function (image) {
    var _src;

    return {
      id: image.id,
      src: (_src = {}, _defineProperty(_src, "1x", "images/".concat(image.id, ".png")), _defineProperty(_src, "2x", "images/".concat(image.id, "@2x.png")), _src)
    };
  }); // update final store svg paths

  finalStore.svgs = store.svgs.map(function (svg) {
    return {
      id: svg.id,
      src: "svgs/".concat(svg.id, ".svg")
    };
  }); // return strigified final store

  return JSON.stringify(finalStore);
};

/***/ })

/******/ });
//# sourceMappingURL=resources_export_index.js.map