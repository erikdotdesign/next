var globalThis = this;
var global = this;
function __skpm_run (key, context) {
  globalThis.context = context;
  try {

var exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/export.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@skpm/promise/index.js":
/*!*********************************************!*\
  !*** ./node_modules/@skpm/promise/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* from https://github.com/taylorhakes/promise-polyfill */

function promiseFinally(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      return constructor.resolve(callback()).then(function() {
        return constructor.reject(reason);
      });
    }
  );
}

function noop() {}

/**
 * @constructor
 * @param {Function} fn
 */
function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError("Promises must be constructed via new");
  if (typeof fn !== "function") throw new TypeError("not a function");
  /** @type {!number} */
  this._state = 0;
  /** @type {!boolean} */
  this._handled = false;
  /** @type {Promise|undefined} */
  this._value = undefined;
  /** @type {!Array<!Function>} */
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError("A promise cannot be resolved with itself.");
    if (
      newValue &&
      (typeof newValue === "object" || typeof newValue === "function")
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === "function") {
        doResolve(then.bind(newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value, self);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

/**
 * @constructor
 */
function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === "function" ? onFulfilled : null;
  this.onRejected = typeof onRejected === "function" ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) {
          Promise._multipleResolvesFn("resolve", self, value);
          return;
        }
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) {
          Promise._multipleResolvesFn("reject", self, reason);
          return;
        }
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) {
      Promise._multipleResolvesFn("reject", self, ex);
      return;
    }
    done = true;
    reject(self, ex);
  }
}

Promise.prototype["catch"] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  // @ts-ignore
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype["finally"] = promiseFinally;

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!Array.isArray(arr)) {
      return reject(new TypeError("Promise.all accepts an array"));
    }

    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === "object" || typeof val === "function")) {
          var then = val.then;
          if (typeof then === "function") {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.resolve = function(value) {
  if (value && typeof value === "object" && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!Array.isArray(arr)) {
      return reject(new TypeError("Promise.race accepts an array"));
    }

    for (var i = 0, len = arr.length; i < len; i++) {
      Promise.resolve(arr[i]).then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn = setImmediate;

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err, promise) {
  if (
    typeof process !== "undefined" &&
    process.listenerCount &&
    (process.listenerCount("unhandledRejection") ||
      process.listenerCount("uncaughtException"))
  ) {
    process.emit("unhandledRejection", err, promise);
    process.emit("uncaughtException", err, "unhandledRejection");
  } else if (typeof console !== "undefined" && console) {
    console.warn("Possible Unhandled Promise Rejection:", err);
  }
};

Promise._multipleResolvesFn = function _multipleResolvesFn(
  type,
  promise,
  value
) {
  if (typeof process !== "undefined" && process.emit) {
    process.emit("multipleResolves", type, promise, value);
  }
};

module.exports = Promise;


/***/ }),

/***/ "./node_modules/mocha-js-delegate/index.js":
/*!*************************************************!*\
  !*** ./node_modules/mocha-js-delegate/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* globals MOClassDescription, NSObject, NSSelectorFromString, NSClassFromString, MOPropertyDescription */

module.exports = function MochaDelegate(definition, superclass) {
  var uniqueClassName =
    'MochaJSDelegate_DynamicClass_' + NSUUID.UUID().UUIDString()

  var delegateClassDesc = MOClassDescription.allocateDescriptionForClassWithName_superclass_(
    uniqueClassName,
    superclass || NSObject
  )

  // Storage
  var handlers = {}
  var ivars = {}

  // Define an instance method
  function setHandlerForSelector(selectorString, func) {
    var handlerHasBeenSet = selectorString in handlers
    var selector = NSSelectorFromString(selectorString)

    handlers[selectorString] = func

    /*
      For some reason, Mocha acts weird about arguments: https://github.com/logancollins/Mocha/issues/28
      We have to basically create a dynamic handler with a likewise dynamic number of predefined arguments.
    */
    if (!handlerHasBeenSet) {
      var args = []
      var regex = /:/g
      while (regex.exec(selectorString)) {
        args.push('arg' + args.length)
      }

      // eslint-disable-next-line no-eval
      var dynamicFunction = eval(
        '(function (' +
          args.join(', ') +
          ') { return handlers[selectorString].apply(this, arguments); })'
      )

      delegateClassDesc.addInstanceMethodWithSelector_function(
        selector,
        dynamicFunction
      )
    }
  }

  // define a property
  function setIvar(key, value) {
    var ivarHasBeenSet = key in handlers

    ivars[key] = value

    if (!ivarHasBeenSet) {
      delegateClassDesc.addInstanceVariableWithName_typeEncoding(key, '@')
      var description = MOPropertyDescription.new()
      description.name = key
      description.typeEncoding = '@'
      description.weak = true
      description.ivarName = key
      delegateClassDesc.addProperty(description)
    }
  }

  this.getClass = function() {
    return NSClassFromString(uniqueClassName)
  }

  this.getClassInstance = function(instanceVariables) {
    var instance = NSClassFromString(uniqueClassName).new()
    Object.keys(ivars).forEach(function(key) {
      instance[key] = ivars[key]
    })
    Object.keys(instanceVariables || {}).forEach(function(key) {
      instance[key] = instanceVariables[key]
    })
    return instance
  }
  // alias
  this.new = this.getClassInstance

  // Convenience
  if (typeof definition === 'object') {
    Object.keys(definition).forEach(
      function(key) {
        if (typeof definition[key] === 'function') {
          setHandlerForSelector(key, definition[key])
        } else {
          setIvar(key, definition[key])
        }
      }
    )
  }

  delegateClassDesc.registerClass()
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/browser-api.js":
/*!****************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/browser-api.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function parseHexColor(color) {
  // Check the string for incorrect formatting.
  if (!color || color[0] !== '#') {
    if (
      color &&
      typeof color.isKindOfClass === 'function' &&
      color.isKindOfClass(NSColor)
    ) {
      return color
    }
    throw new Error(
      'Incorrect color formating. It should be an hex color: #RRGGBBAA'
    )
  }

  // append FF if alpha channel is not specified.
  var source = color.substr(1)
  if (source.length === 3) {
    source += 'F'
  } else if (source.length === 6) {
    source += 'FF'
  }
  // Convert the string from #FFF format to #FFFFFF format.
  var hex
  if (source.length === 4) {
    for (var i = 0; i < 4; i += 1) {
      hex += source[i]
      hex += source[i]
    }
  } else if (source.length === 8) {
    hex = source
  } else {
    return NSColor.whiteColor()
  }

  var r = parseInt(hex.slice(0, 2), 16)
  var g = parseInt(hex.slice(2, 4), 16)
  var b = parseInt(hex.slice(4, 6), 16)
  var a = parseInt(hex.slice(6, 8), 16)

  return NSColor.colorWithSRGBRed_green_blue_alpha(r, g, b, a)
}

module.exports = function(browserWindow, panel, webview) {
  // keep reference to the subviews
  browserWindow._panel = panel
  browserWindow._webview = webview
  browserWindow._destroyed = false

  browserWindow.destroy = function() {
    return panel.close()
  }

  browserWindow.close = function() {
    if (panel.delegate().utils && panel.delegate().utils.parentWindow) {
      var shouldClose = true
      browserWindow.emit('close', {
        get defaultPrevented() {
          return !shouldClose
        },
        preventDefault: function() {
          shouldClose = false
        },
      })
      if (shouldClose) {
        panel.delegate().utils.parentWindow.endSheet(panel)
      }
      return
    }

    if (!browserWindow.isClosable()) {
      return
    }

    panel.performClose(null)
  }

  function focus(focused) {
    if (!browserWindow.isVisible()) {
      return
    }
    if (focused) {
      NSApplication.sharedApplication().activateIgnoringOtherApps(true)
      panel.makeKeyAndOrderFront(null)
    } else {
      panel.orderBack(null)
      NSApp.mainWindow().makeKeyAndOrderFront(null)
    }
  }

  browserWindow.focus = focus.bind(this, true)
  browserWindow.blur = focus.bind(this, false)

  browserWindow.isFocused = function() {
    return panel.isKeyWindow()
  }

  browserWindow.isDestroyed = function() {
    return browserWindow._destroyed
  }

  browserWindow.show = function() {
    // This method is supposed to put focus on window, however if the app does not
    // have focus then "makeKeyAndOrderFront" will only show the window.
    NSApp.activateIgnoringOtherApps(true)

    if (panel.delegate().utils && panel.delegate().utils.parentWindow) {
      return panel.delegate().utils.parentWindow.beginSheet_completionHandler(
        panel,
        __mocha__.createBlock_function('v16@?0q8', function() {
          browserWindow.emit('closed')
        })
      )
    }

    return panel.makeKeyAndOrderFront(null)
  }

  browserWindow.showInactive = function() {
    return panel.orderFrontRegardless()
  }

  browserWindow.hide = function() {
    return panel.orderOut(null)
  }

  browserWindow.isVisible = function() {
    return panel.isVisible()
  }

  browserWindow.isModal = function() {
    return false
  }

  browserWindow.maximize = function() {
    if (!browserWindow.isMaximized()) {
      panel.zoom(null)
    }
  }
  browserWindow.unmaximize = function() {
    if (browserWindow.isMaximized()) {
      panel.zoom(null)
    }
  }

  browserWindow.isMaximized = function() {
    if ((panel.styleMask() & NSResizableWindowMask) !== 0) {
      return panel.isZoomed()
    }
    var rectScreen = NSScreen.mainScreen().visibleFrame()
    var rectWindow = panel.frame()
    return (
      rectScreen.origin.x == rectWindow.origin.x &&
      rectScreen.origin.y == rectWindow.origin.y &&
      rectScreen.size.width == rectWindow.size.width &&
      rectScreen.size.height == rectWindow.size.height
    )
  }

  browserWindow.minimize = function() {
    return panel.miniaturize(null)
  }

  browserWindow.restore = function() {
    return panel.deminiaturize(null)
  }

  browserWindow.isMinimized = function() {
    return panel.isMiniaturized()
  }

  browserWindow.setFullScreen = function(fullscreen) {
    if (fullscreen !== browserWindow.isFullscreen()) {
      panel.toggleFullScreen(null)
    }
  }

  browserWindow.isFullscreen = function() {
    return panel.styleMask() & NSFullScreenWindowMask
  }

  browserWindow.setAspectRatio = function(aspectRatio /* , extraSize */) {
    // Reset the behaviour to default if aspect_ratio is set to 0 or less.
    if (aspectRatio > 0.0) {
      panel.setAspectRatio(NSMakeSize(aspectRatio, 1.0))
    } else {
      panel.setResizeIncrements(NSMakeSize(1.0, 1.0))
    }
  }

  browserWindow.setBounds = function(bounds, animate) {
    if (!bounds) {
      return
    }

    // Do nothing if in fullscreen mode.
    if (browserWindow.isFullscreen()) {
      return
    }

    const newBounds = Object.assign(browserWindow.getBounds(), bounds)

    // TODO: Check size constraints since setFrame does not check it.
    // var size = bounds.size
    // size.SetToMax(GetMinimumSize());
    // gfx::Size max_size = GetMaximumSize();
    // if (!max_size.IsEmpty())
    //   size.SetToMin(max_size);

    var cocoaBounds = NSMakeRect(
      newBounds.x,
      0,
      newBounds.width,
      newBounds.height
    )
    // Flip Y coordinates based on the primary screen
    var screen = NSScreen.screens().firstObject()
    cocoaBounds.origin.y = NSHeight(screen.frame()) - newBounds.y

    panel.setFrame_display_animate(cocoaBounds, true, animate)
  }

  browserWindow.getBounds = function() {
    const cocoaBounds = panel.frame()
    var mainScreenRect = NSScreen.screens()
      .firstObject()
      .frame()
    return {
      x: cocoaBounds.origin.x,
      y: Math.round(NSHeight(mainScreenRect) - cocoaBounds.origin.y),
      width: cocoaBounds.size.width,
      height: cocoaBounds.size.height,
    }
  }

  browserWindow.setContentBounds = function(bounds, animate) {
    // TODO:
    browserWindow.setBounds(bounds, animate)
  }

  browserWindow.getContentBounds = function() {
    // TODO:
    return browserWindow.getBounds()
  }

  browserWindow.setSize = function(width, height, animate) {
    // TODO: handle resizing around center
    return browserWindow.setBounds({ width: width, height: height }, animate)
  }

  browserWindow.getSize = function() {
    var bounds = browserWindow.getBounds()
    return [bounds.width, bounds.height]
  }

  browserWindow.setContentSize = function(width, height, animate) {
    // TODO: handle resizing around center
    return browserWindow.setContentBounds(
      { width: width, height: height },
      animate
    )
  }

  browserWindow.getContentSize = function() {
    var bounds = browserWindow.getContentBounds()
    return [bounds.width, bounds.height]
  }

  browserWindow.setMinimumSize = function(width, height) {
    const minSize = CGSizeMake(width, height)
    panel.setContentMinSize(minSize)
  }

  browserWindow.getMinimumSize = function() {
    const size = panel.contentMinSize()
    return [size.width, size.height]
  }

  browserWindow.setMaximumSize = function(width, height) {
    const maxSize = CGSizeMake(width, height)
    panel.setContentMaxSize(maxSize)
  }

  browserWindow.getMaximumSize = function() {
    const size = panel.contentMaxSize()
    return [size.width, size.height]
  }

  browserWindow.setResizable = function(resizable) {
    return browserWindow._setStyleMask(resizable, NSResizableWindowMask)
  }

  browserWindow.isResizable = function() {
    return panel.styleMask() & NSResizableWindowMask
  }

  browserWindow.setMovable = function(movable) {
    return panel.setMovable(movable)
  }
  browserWindow.isMovable = function() {
    return panel.isMovable()
  }

  browserWindow.setMinimizable = function(minimizable) {
    return browserWindow._setStyleMask(minimizable, NSMiniaturizableWindowMask)
  }

  browserWindow.isMinimizable = function() {
    return panel.styleMask() & NSMiniaturizableWindowMask
  }

  browserWindow.setMaximizable = function(maximizable) {
    if (panel.standardWindowButton(NSWindowZoomButton)) {
      panel.standardWindowButton(NSWindowZoomButton).setEnabled(maximizable)
    }
  }

  browserWindow.isMaximizable = function() {
    return (
      panel.standardWindowButton(NSWindowZoomButton) &&
      panel.standardWindowButton(NSWindowZoomButton).isEnabled()
    )
  }

  browserWindow.setFullScreenable = function(fullscreenable) {
    browserWindow._setCollectionBehavior(
      fullscreenable,
      NSWindowCollectionBehaviorFullScreenPrimary
    )
    // On EL Capitan this flag is required to hide fullscreen button.
    browserWindow._setCollectionBehavior(
      !fullscreenable,
      NSWindowCollectionBehaviorFullScreenAuxiliary
    )
  }

  browserWindow.isFullScreenable = function() {
    var collectionBehavior = panel.collectionBehavior()
    return collectionBehavior & NSWindowCollectionBehaviorFullScreenPrimary
  }

  browserWindow.setClosable = function(closable) {
    browserWindow._setStyleMask(closable, NSClosableWindowMask)
  }

  browserWindow.isClosable = function() {
    return panel.styleMask() & NSClosableWindowMask
  }

  browserWindow.setAlwaysOnTop = function(top, level, relativeLevel) {
    var windowLevel = NSNormalWindowLevel
    var maxWindowLevel = CGWindowLevelForKey(kCGMaximumWindowLevelKey)
    var minWindowLevel = CGWindowLevelForKey(kCGMinimumWindowLevelKey)

    if (top) {
      if (level === 'normal') {
        windowLevel = NSNormalWindowLevel
      } else if (level === 'torn-off-menu') {
        windowLevel = NSTornOffMenuWindowLevel
      } else if (level === 'modal-panel') {
        windowLevel = NSModalPanelWindowLevel
      } else if (level === 'main-menu') {
        windowLevel = NSMainMenuWindowLevel
      } else if (level === 'status') {
        windowLevel = NSStatusWindowLevel
      } else if (level === 'pop-up-menu') {
        windowLevel = NSPopUpMenuWindowLevel
      } else if (level === 'screen-saver') {
        windowLevel = NSScreenSaverWindowLevel
      } else if (level === 'dock') {
        // Deprecated by macOS, but kept for backwards compatibility
        windowLevel = NSDockWindowLevel
      } else {
        windowLevel = NSFloatingWindowLevel
      }
    }

    var newLevel = windowLevel + (relativeLevel || 0)
    if (newLevel >= minWindowLevel && newLevel <= maxWindowLevel) {
      panel.setLevel(newLevel)
    } else {
      throw new Error(
        'relativeLevel must be between ' +
          minWindowLevel +
          ' and ' +
          maxWindowLevel
      )
    }
  }

  browserWindow.isAlwaysOnTop = function() {
    return panel.level() !== NSNormalWindowLevel
  }

  browserWindow.moveTop = function() {
    return panel.orderFrontRegardless()
  }

  browserWindow.center = function() {
    panel.center()
  }

  browserWindow.setPosition = function(x, y, animate) {
    return browserWindow.setBounds({ x: x, y: y }, animate)
  }

  browserWindow.getPosition = function() {
    var bounds = browserWindow.getBounds()
    return [bounds.x, bounds.y]
  }

  browserWindow.setTitle = function(title) {
    panel.setTitle(title)
  }

  browserWindow.getTitle = function() {
    return String(panel.title())
  }

  var attentionRequestId = 0
  browserWindow.flashFrame = function(flash) {
    if (flash) {
      attentionRequestId = NSApp.requestUserAttention(NSInformationalRequest)
    } else {
      NSApp.cancelUserAttentionRequest(attentionRequestId)
      attentionRequestId = 0
    }
  }

  browserWindow.getNativeWindowHandle = function() {
    return panel
  }

  browserWindow.getNativeWebViewHandle = function() {
    return webview
  }

  browserWindow.loadURL = function(url) {
    // When frameLocation is a file, prefix it with the Sketch Resources path
    if (/^(?!https?|file).*\.html?$/.test(url)) {
      if (typeof __command !== 'undefined' && __command.pluginBundle()) {
        url =
          'file://' +
          __command
            .pluginBundle()
            .urlForResourceNamed(url)
            .path()
      }
    }

    if (/^file:\/\/.*\.html?$/.test(url)) {
      // ensure URLs containing spaces are properly handled
      url = NSString.alloc().initWithString(url)
      url = url.stringByAddingPercentEncodingWithAllowedCharacters(
        NSCharacterSet.URLQueryAllowedCharacterSet()
      )
      webview.loadFileURL_allowingReadAccessToURL(
        NSURL.URLWithString(url),
        NSURL.URLWithString('file:///')
      )
      return
    }

    const properURL = NSURL.URLWithString(url)
    const urlRequest = NSURLRequest.requestWithURL(properURL)

    webview.loadRequest(urlRequest)
  }

  browserWindow.reload = function() {
    webview.reload()
  }

  browserWindow.setHasShadow = function(hasShadow) {
    return panel.setHasShadow(hasShadow)
  }

  browserWindow.hasShadow = function() {
    return panel.hasShadow()
  }

  browserWindow.setOpacity = function(opacity) {
    return panel.setAlphaValue(opacity)
  }

  browserWindow.getOpacity = function() {
    return panel.alphaValue()
  }

  browserWindow.setVisibleOnAllWorkspaces = function(visible) {
    return browserWindow._setCollectionBehavior(
      visible,
      NSWindowCollectionBehaviorCanJoinAllSpaces
    )
  }

  browserWindow.isVisibleOnAllWorkspaces = function() {
    var collectionBehavior = panel.collectionBehavior()
    return collectionBehavior & NSWindowCollectionBehaviorCanJoinAllSpaces
  }

  browserWindow.setIgnoreMouseEvents = function(ignore) {
    return panel.setIgnoresMouseEvents(ignore)
  }

  browserWindow.setContentProtection = function(enable) {
    panel.setSharingType(enable ? NSWindowSharingNone : NSWindowSharingReadOnly)
  }

  browserWindow.setAutoHideCursor = function(autoHide) {
    panel.setDisableAutoHideCursor(autoHide)
  }

  browserWindow.setVibrancy = function(type) {
    var effectView = browserWindow._vibrantView

    if (!type) {
      if (effectView == null) {
        return
      }

      effectView.removeFromSuperview()
      panel.setVibrantView(null)
      return
    }

    if (effectView == null) {
      var contentView = panel.contentView()
      effectView = NSVisualEffectView.alloc().initWithFrame(
        contentView.bounds()
      )
      browserWindow._vibrantView = effectView

      effectView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)
      effectView.setBlendingMode(NSVisualEffectBlendingModeBehindWindow)
      effectView.setState(NSVisualEffectStateActive)
      effectView.setFrame(contentView.bounds())
      contentView.addSubview_positioned_relativeTo(
        effectView,
        NSWindowBelow,
        null
      )
    }

    var vibrancyType = NSVisualEffectMaterialLight

    if (type === 'appearance-based') {
      vibrancyType = NSVisualEffectMaterialAppearanceBased
    } else if (type === 'light') {
      vibrancyType = NSVisualEffectMaterialLight
    } else if (type === 'dark') {
      vibrancyType = NSVisualEffectMaterialDark
    } else if (type === 'titlebar') {
      vibrancyType = NSVisualEffectMaterialTitlebar
    } else if (type === 'selection') {
      vibrancyType = NSVisualEffectMaterialSelection
    } else if (type === 'menu') {
      vibrancyType = NSVisualEffectMaterialMenu
    } else if (type === 'popover') {
      vibrancyType = NSVisualEffectMaterialPopover
    } else if (type === 'sidebar') {
      vibrancyType = NSVisualEffectMaterialSidebar
    } else if (type === 'medium-light') {
      vibrancyType = NSVisualEffectMaterialMediumLight
    } else if (type === 'ultra-dark') {
      vibrancyType = NSVisualEffectMaterialUltraDark
    }

    effectView.setMaterial(vibrancyType)
  }

  browserWindow._setBackgroundColor = function(colorName) {
    var color = parseHexColor(colorName)
    webview.setValue_forKey(false, 'drawsBackground')
    panel.backgroundColor = color
  }

  browserWindow._invalidate = function() {
    panel.flushWindow()
    panel.contentView().setNeedsDisplay(true)
  }

  browserWindow._setStyleMask = function(on, flag) {
    var wasMaximizable = browserWindow.isMaximizable()
    if (on) {
      panel.setStyleMask(panel.styleMask() | flag)
    } else {
      panel.setStyleMask(panel.styleMask() & ~flag)
    }
    // Change style mask will make the zoom button revert to default, probably
    // a bug of Cocoa or macOS.
    browserWindow.setMaximizable(wasMaximizable)
  }

  browserWindow._setCollectionBehavior = function(on, flag) {
    var wasMaximizable = browserWindow.isMaximizable()
    if (on) {
      panel.setCollectionBehavior(panel.collectionBehavior() | flag)
    } else {
      panel.setCollectionBehavior(panel.collectionBehavior() & ~flag)
    }
    // Change collectionBehavior will make the zoom button revert to default,
    // probably a bug of Cocoa or macOS.
    browserWindow.setMaximizable(wasMaximizable)
  }

  browserWindow._showWindowButton = function(button) {
    var view = panel.standardWindowButton(button)
    view.superview().addSubview_positioned_relative(view, NSWindowAbove, null)
  }
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/constants.js":
/*!**************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/constants.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  JS_BRIDGE: '__skpm_sketchBridge',
  JS_BRIDGE_RESULT_SUCCESS: '__skpm_sketchBridge_success',
  JS_BRIDGE_RESULT_ERROR: '__skpm_sketchBridge_error',
  START_MOVING_WINDOW: '__skpm_startMovingWindow',
  EXECUTE_JAVASCRIPT: '__skpm_executeJS',
  EXECUTE_JAVASCRIPT_SUCCESS: '__skpm_executeJS_success_',
  EXECUTE_JAVASCRIPT_ERROR: '__skpm_executeJS_error_',
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/dispatch-first-click.js":
/*!*************************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/dispatch-first-click.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var tagsToFocus =
  '["text", "textarea", "date", "datetime-local", "email", "number", "month", "password", "search", "tel", "time", "url", "week" ]'

module.exports = function(webView, event) {
  var point = webView.convertPoint_fromView(event.locationInWindow(), null)
  return (
    'var el = document.elementFromPoint(' + // get the DOM element that match the event
    point.x +
    ', ' +
    point.y +
    '); ' +
    'if (el && el.tagName === "SELECT") {' + // select needs special handling
    '  var event = document.createEvent("MouseEvents");' +
    '  event.initMouseEvent("mousedown", true, true, window);' +
    '  el.dispatchEvent(event);' +
    '} else if (el && ' + // some tags need to be focused instead of clicked
    tagsToFocus +
    '.indexOf(el.type) >= 0 && ' +
    'el.focus' +
    ') {' +
    'el.focus();' + // so focus them
    '} else if (el) {' +
    'el.dispatchEvent(new Event("click", {bubbles: true}))' + // click the others
    '}'
  )
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/execute-javascript.js":
/*!***********************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/execute-javascript.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Promise) {var CONSTANTS = __webpack_require__(/*! ./constants */ "./node_modules/sketch-module-web-view/lib/constants.js")

module.exports = function(webview, browserWindow) {
  function executeJavaScript(script, userGesture, callback) {
    if (typeof userGesture === 'function') {
      callback = userGesture
      userGesture = false
    }
    var fiber = coscript.createFiber()

    // if the webview is not ready yet, defer the execution until it is
    if (
      webview.navigationDelegate().state &&
      webview.navigationDelegate().state.wasReady == 0
    ) {
      return new Promise(function(resolve, reject) {
        browserWindow.once('ready-to-show', function() {
          executeJavaScript(script, userGesture, callback)
            .then(resolve)
            .catch(reject)
          fiber.cleanup()
        })
      })
    }

    return new Promise(function(resolve, reject) {
      var requestId = Math.random()

      browserWindow.webContents.on(
        CONSTANTS.EXECUTE_JAVASCRIPT_SUCCESS + requestId,
        function(res) {
          try {
            if (callback) {
              callback(null, res)
            }
            resolve(res)
          } catch (err) {
            reject(err)
          }
          fiber.cleanup()
        }
      )
      browserWindow.webContents.on(
        CONSTANTS.EXECUTE_JAVASCRIPT_ERROR + requestId,
        function(err) {
          try {
            if (callback) {
              callback(err)
              resolve()
            } else {
              reject(err)
            }
          } catch (err2) {
            reject(err2)
          }
          fiber.cleanup()
        }
      )

      webview.evaluateJavaScript_completionHandler(
        module.exports.wrapScript(script, requestId),
        null
      )
    })
  }

  return executeJavaScript
}

module.exports.wrapScript = function(script, requestId) {
  return (
    'window.' +
    CONSTANTS.EXECUTE_JAVASCRIPT +
    '(' +
    requestId +
    ', ' +
    JSON.stringify(script) +
    ')'
  )
}

module.exports.injectScript = function(webView) {
  var source =
    'window.' +
    CONSTANTS.EXECUTE_JAVASCRIPT +
    ' = function(id, script) {' +
    '  try {' +
    '    var res = eval(script);' +
    '    if (res && typeof res.then === "function" && typeof res.catch === "function") {' +
    '      res.then(function (res2) {' +
    '        window.postMessage("' +
    CONSTANTS.EXECUTE_JAVASCRIPT_SUCCESS +
    '" + id, res2);' +
    '      })' +
    '      .catch(function (err) {' +
    '        window.postMessage("' +
    CONSTANTS.EXECUTE_JAVASCRIPT_ERROR +
    '" + id, err);' +
    '      })' +
    '    } else {' +
    '      window.postMessage("' +
    CONSTANTS.EXECUTE_JAVASCRIPT_SUCCESS +
    '" + id, res);' +
    '    }' +
    '  } catch (err) {' +
    '    window.postMessage("' +
    CONSTANTS.EXECUTE_JAVASCRIPT_ERROR +
    '" + id, err);' +
    '  }' +
    '}'
  var script = WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(
    source,
    0,
    true
  )
  webView
    .configuration()
    .userContentController()
    .addUserScript(script)
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@skpm/promise/index.js */ "./node_modules/@skpm/promise/index.js")))

/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/fitSubview.js":
/*!***************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/fitSubview.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function addEdgeConstraint(edge, subview, view, constant) {
  view.addConstraint(
    NSLayoutConstraint.constraintWithItem_attribute_relatedBy_toItem_attribute_multiplier_constant(
      subview,
      edge,
      NSLayoutRelationEqual,
      view,
      edge,
      1,
      constant
    )
  )
}
module.exports = function fitSubviewToView(subview, view, constants) {
  constants = constants || []
  subview.setTranslatesAutoresizingMaskIntoConstraints(false)

  addEdgeConstraint(NSLayoutAttributeLeft, subview, view, constants[0] || 0)
  addEdgeConstraint(NSLayoutAttributeTop, subview, view, constants[1] || 0)
  addEdgeConstraint(NSLayoutAttributeRight, subview, view, constants[2] || 0)
  addEdgeConstraint(NSLayoutAttributeBottom, subview, view, constants[3] || 0)
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* let's try to match the API from Electron's Browser window
(https://github.com/electron/electron/blob/master/docs/api/browser-window.md) */
var EventEmitter = __webpack_require__(/*! events */ "events")
var buildBrowserAPI = __webpack_require__(/*! ./browser-api */ "./node_modules/sketch-module-web-view/lib/browser-api.js")
var buildWebAPI = __webpack_require__(/*! ./webview-api */ "./node_modules/sketch-module-web-view/lib/webview-api.js")
var fitSubviewToView = __webpack_require__(/*! ./fitSubview */ "./node_modules/sketch-module-web-view/lib/fitSubview.js")
var dispatchFirstClick = __webpack_require__(/*! ./dispatch-first-click */ "./node_modules/sketch-module-web-view/lib/dispatch-first-click.js")
var injectClientMessaging = __webpack_require__(/*! ./inject-client-messaging */ "./node_modules/sketch-module-web-view/lib/inject-client-messaging.js")
var movableArea = __webpack_require__(/*! ./movable-area */ "./node_modules/sketch-module-web-view/lib/movable-area.js")
var executeJavaScript = __webpack_require__(/*! ./execute-javascript */ "./node_modules/sketch-module-web-view/lib/execute-javascript.js")
var setDelegates = __webpack_require__(/*! ./set-delegates */ "./node_modules/sketch-module-web-view/lib/set-delegates.js")

function BrowserWindow(options) {
  options = options || {}

  var identifier = options.identifier || NSUUID.UUID().UUIDString()
  var threadDictionary = NSThread.mainThread().threadDictionary()

  var existingBrowserWindow = BrowserWindow.fromId(identifier)

  // if we already have a window opened, reuse it
  if (existingBrowserWindow) {
    return existingBrowserWindow
  }

  var browserWindow = new EventEmitter()
  browserWindow.id = identifier

  if (options.modal && !options.parent) {
    throw new Error('A modal needs to have a parent.')
  }

  // Long-running script
  var fiber = coscript.createFiber()

  // Window size
  var width = options.width || 800
  var height = options.height || 600
  var mainScreenRect = NSScreen.screens()
    .firstObject()
    .frame()
  var cocoaBounds = NSMakeRect(
    typeof options.x !== 'undefined'
      ? options.x
      : Math.round((NSWidth(mainScreenRect) - width) / 2),
    typeof options.y !== 'undefined'
      ? NSHeight(mainScreenRect) - options.y
      : Math.round((NSHeight(mainScreenRect) - height) / 2),
    width,
    height
  )

  if (options.titleBarStyle && options.titleBarStyle !== 'default') {
    options.frame = false
  }

  var useStandardWindow = options.windowType !== 'textured'
  var styleMask = NSTitledWindowMask

  // this is commented out because the toolbar doesn't appear otherwise :thinking-face:
  // if (!useStandardWindow || options.frame === false) {
  //   styleMask = NSFullSizeContentViewWindowMask
  // }
  if (options.minimizable !== false) {
    styleMask |= NSMiniaturizableWindowMask
  }
  if (options.closable !== false) {
    styleMask |= NSClosableWindowMask
  }
  if (options.resizable !== false) {
    styleMask |= NSResizableWindowMask
  }
  if (!useStandardWindow || options.transparent || options.frame === false) {
    styleMask |= NSTexturedBackgroundWindowMask
  }

  var panel = NSPanel.alloc().initWithContentRect_styleMask_backing_defer(
    cocoaBounds,
    styleMask,
    NSBackingStoreBuffered,
    true
  )

  var wkwebviewConfig = WKWebViewConfiguration.alloc().init()
  var webView = WKWebView.alloc().initWithFrame_configuration(
    CGRectMake(0, 0, options.width || 800, options.height || 600),
    wkwebviewConfig
  )
  injectClientMessaging(webView)
  webView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)

  buildBrowserAPI(browserWindow, panel, webView)
  buildWebAPI(browserWindow, panel, webView)
  setDelegates(browserWindow, panel, webView, options)

  if (options.windowType === 'desktop') {
    panel.setLevel(kCGDesktopWindowLevel - 1)
    // panel.setCanBecomeKeyWindow(false)
    panel.setCollectionBehavior(
      NSWindowCollectionBehaviorCanJoinAllSpaces |
        NSWindowCollectionBehaviorStationary |
        NSWindowCollectionBehaviorIgnoresCycle
    )
  }

  if (
    typeof options.minWidth !== 'undefined' ||
    typeof options.minHeight !== 'undefined'
  ) {
    browserWindow.setMinimumSize(options.minWidth || 0, options.minHeight || 0)
  }

  if (
    typeof options.maxWidth !== 'undefined' ||
    typeof options.maxHeight !== 'undefined'
  ) {
    browserWindow.setMaximumSize(
      options.maxWidth || 10000,
      options.maxHeight || 10000
    )
  }

  // if (options.focusable === false) {
  //   panel.setCanBecomeKeyWindow(false)
  // }

  if (options.transparent || options.frame === false) {
    panel.titlebarAppearsTransparent = true
    panel.titleVisibility = NSWindowTitleHidden
    panel.setOpaque(0)
    panel.isMovableByWindowBackground = true
    var toolbar2 = NSToolbar.alloc().initWithIdentifier(
      'titlebarStylingToolbar'
    )
    toolbar2.setShowsBaselineSeparator(false)
    panel.setToolbar(toolbar2)
  }

  if (options.titleBarStyle === 'hiddenInset') {
    var toolbar = NSToolbar.alloc().initWithIdentifier('titlebarStylingToolbar')
    toolbar.setShowsBaselineSeparator(false)
    panel.setToolbar(toolbar)
  }

  if (options.frame === false || !options.useContentSize) {
    browserWindow.setSize(width, height)
  }

  if (options.center) {
    browserWindow.center()
  }

  if (options.alwaysOnTop) {
    browserWindow.setAlwaysOnTop(true)
  }

  if (options.fullscreen) {
    browserWindow.setFullScreen(true)
  }
  browserWindow.setFullScreenable(!!options.fullscreenable)

  let title = options.title
  if (options.frame === false) {
    title = undefined
  } else if (
    typeof title === 'undefined' &&
    typeof __command !== 'undefined' &&
    __command.pluginBundle()
  ) {
    title = __command.pluginBundle().name()
  }

  if (title) {
    browserWindow.setTitle(title)
  }

  var backgroundColor = options.backgroundColor
  if (options.transparent) {
    backgroundColor = NSColor.clearColor()
  }
  if (!backgroundColor && options.frame === false && options.vibrancy) {
    backgroundColor = NSColor.clearColor()
  }

  browserWindow._setBackgroundColor(
    backgroundColor || NSColor.windowBackgroundColor()
  )

  if (options.hasShadow === false) {
    browserWindow.setHasShadow(false)
  }

  if (typeof options.opacity !== 'undefined') {
    browserWindow.setOpacity(options.opacity)
  }

  options.webPreferences = options.webPreferences || {}

  webView
    .configuration()
    .preferences()
    .setValue_forKey(
      options.webPreferences.devTools !== false,
      'developerExtrasEnabled'
    )
  webView
    .configuration()
    .preferences()
    .setValue_forKey(
      options.webPreferences.javascript !== false,
      'javaScriptEnabled'
    )
  webView
    .configuration()
    .preferences()
    .setValue_forKey(!!options.webPreferences.plugins, 'plugInsEnabled')
  webView
    .configuration()
    .preferences()
    .setValue_forKey(
      options.webPreferences.minimumFontSize || 0,
      'minimumFontSize'
    )

  if (options.webPreferences.zoomFactor) {
    webView.setMagnification(options.webPreferences.zoomFactor)
  }

  var contentView = panel.contentView()

  if (options.frame !== false) {
    webView.setFrame(contentView.bounds())
    contentView.addSubview(webView)
  } else {
    // In OSX 10.10, adding subviews to the root view for the NSView hierarchy
    // produces warnings. To eliminate the warnings, we resize the contentView
    // to fill the window, and add subviews to that.
    // http://crbug.com/380412
    contentView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)
    fitSubviewToView(contentView, contentView.superview())

    webView.setFrame(contentView.bounds())
    contentView.addSubview(webView)

    // The fullscreen button should always be hidden for frameless window.
    if (panel.standardWindowButton(NSWindowFullScreenButton)) {
      panel.standardWindowButton(NSWindowFullScreenButton).setHidden(true)
    }

    if (!options.titleBarStyle || options.titleBarStyle === 'default') {
      // Hide the window buttons.
      panel.standardWindowButton(NSWindowZoomButton).setHidden(true)
      panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true)
      panel.standardWindowButton(NSWindowCloseButton).setHidden(true)

      // Some third-party macOS utilities check the zoom button's enabled state to
      // determine whether to show custom UI on hover, so we disable it here to
      // prevent them from doing so in a frameless app window.
      panel.standardWindowButton(NSWindowZoomButton).setEnabled(false)
    }
  }

  if (options.vibrancy) {
    browserWindow.setVibrancy(options.vibrancy)
  }

  // Set maximizable state last to ensure zoom button does not get reset
  // by calls to other APIs.
  browserWindow.setMaximizable(options.maximizable !== false)

  panel.setHidesOnDeactivate(options.hidesOnDeactivate !== false)

  if (options.remembersWindowFrame) {
    panel.setFrameAutosaveName(identifier)
    panel.setFrameUsingName_force(panel.frameAutosaveName(), false)
  }

  if (options.acceptsFirstMouse) {
    browserWindow.on('focus', function(event) {
      if (event.type() === NSEventTypeLeftMouseDown) {
        browserWindow.webContents
          .executeJavaScript(dispatchFirstClick(webView, event))
          .catch(() => {})
      }
    })
  }

  executeJavaScript.injectScript(webView)
  movableArea.injectScript(webView)
  movableArea.setupHandler(browserWindow)

  if (options.show !== false) {
    browserWindow.show()
  }

  browserWindow.on('closed', function() {
    browserWindow._destroyed = true
    threadDictionary.removeObjectForKey(identifier)
    var observer = threadDictionary[identifier + '.themeObserver']
    if (observer) {
      NSApplication.sharedApplication().removeObserver_forKeyPath(
        observer,
        'effectiveAppearance'
      )
      threadDictionary.removeObjectForKey(identifier + '.themeObserver')
    }
    fiber.cleanup()
  })

  threadDictionary[identifier] = panel

  fiber.onCleanup(function() {
    if (!browserWindow._destroyed) {
      browserWindow.destroy()
    }
  })

  return browserWindow
}

BrowserWindow.fromId = function(identifier) {
  var threadDictionary = NSThread.mainThread().threadDictionary()

  if (threadDictionary[identifier]) {
    return BrowserWindow.fromPanel(threadDictionary[identifier], identifier)
  }

  return undefined
}

BrowserWindow.fromPanel = function(panel, identifier) {
  var browserWindow = new EventEmitter()
  browserWindow.id = identifier

  if (!panel || !panel.contentView) {
    throw new Error('needs to pass an NSPanel')
  }

  var webView = null
  var subviews = panel.contentView().subviews()
  for (var i = 0; i < subviews.length; i += 1) {
    if (
      !webView &&
      !subviews[i].isKindOfClass(WKInspectorWKWebView) &&
      subviews[i].isKindOfClass(WKWebView)
    ) {
      webView = subviews[i]
    }
  }

  if (!webView) {
    throw new Error('The panel needs to have a webview')
  }

  buildBrowserAPI(browserWindow, panel, webView)
  buildWebAPI(browserWindow, panel, webView)

  return browserWindow
}

module.exports = BrowserWindow


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/inject-client-messaging.js":
/*!****************************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/inject-client-messaging.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(/*! ./constants */ "./node_modules/sketch-module-web-view/lib/constants.js")

module.exports = function(webView) {
  var source =
    'window.originalPostMessage = window.postMessage;' +
    'window.postMessage = function(actionName) {' +
    '  if (!actionName) {' +
    "    throw new Error('missing action name')" +
    '  }' +
    '  var id = String(Math.random()).replace(".", "");' +
    '    var args = [].slice.call(arguments);' +
    '    args.unshift(id);' +
    '  return new Promise(function (resolve, reject) {' +
    '    window["' +
    CONSTANTS.JS_BRIDGE_RESULT_SUCCESS +
    '" + id] = resolve;' +
    '    window["' +
    CONSTANTS.JS_BRIDGE_RESULT_ERROR +
    '" + id] = reject;' +
    '    window.webkit.messageHandlers.' +
    CONSTANTS.JS_BRIDGE +
    '.postMessage(JSON.stringify(args));' +
    '  });' +
    '}'
  var script = WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(
    source,
    0,
    true
  )
  webView
    .configuration()
    .userContentController()
    .addUserScript(script)
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/movable-area.js":
/*!*****************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/movable-area.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(/*! ./constants */ "./node_modules/sketch-module-web-view/lib/constants.js")

module.exports.injectScript = function(webView) {
  var source =
    '(function () {' +
    "document.addEventListener('mousedown', onMouseDown);" +
    '' +
    'function shouldDrag(target) {' +
    '  if (!target || (target.dataset || {}).appRegion === "no-drag") { return false }' +
    '  if ((target.dataset || {}).appRegion === "drag") { return true }' +
    '  return shouldDrag(target.parentElement)' +
    '};' +
    '' +
    'function onMouseDown(e) {' +
    '  if (e.button !== 0 || !shouldDrag(e.target)) { return }' +
    '  window.postMessage("' +
    CONSTANTS.START_MOVING_WINDOW +
    '");' +
    '};' +
    '})()'
  var script = WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(
    source,
    0,
    true
  )
  webView
    .configuration()
    .userContentController()
    .addUserScript(script)
}

module.exports.setupHandler = function(browserWindow) {
  var initialMouseLocation = null
  var initialWindowPosition = null
  var interval = null

  function moveWindow() {
    // if the user released the button, stop moving the window
    if (!initialWindowPosition || NSEvent.pressedMouseButtons() !== 1) {
      clearInterval(interval)
      initialMouseLocation = null
      initialWindowPosition = null
      return
    }

    var mouse = NSEvent.mouseLocation()
    browserWindow.setPosition(
      initialWindowPosition.x + (mouse.x - initialMouseLocation.x),
      initialWindowPosition.y + (initialMouseLocation.y - mouse.y), // y is inverted
      false
    )
  }

  browserWindow.webContents.on(CONSTANTS.START_MOVING_WINDOW, function() {
    initialMouseLocation = NSEvent.mouseLocation()
    var position = browserWindow.getPosition()
    initialWindowPosition = {
      x: position[0],
      y: position[1],
    }

    interval = setInterval(moveWindow, 1000 / 60) // 60 fps
  })
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/parseWebArguments.js":
/*!**********************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/parseWebArguments.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(webArguments) {
  var args = null
  try {
    args = JSON.parse(webArguments)
  } catch (e) {
    // malformed arguments
  }

  if (
    !args ||
    !args.constructor ||
    args.constructor !== Array ||
    args.length == 0
  ) {
    return null
  }

  return args
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/set-delegates.js":
/*!******************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/set-delegates.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Promise) {var ObjCClass = __webpack_require__(/*! mocha-js-delegate */ "./node_modules/mocha-js-delegate/index.js")
var parseWebArguments = __webpack_require__(/*! ./parseWebArguments */ "./node_modules/sketch-module-web-view/lib/parseWebArguments.js")
var CONSTANTS = __webpack_require__(/*! ./constants */ "./node_modules/sketch-module-web-view/lib/constants.js")

// We create one ObjC class for ourselves here
var WindowDelegateClass
var NavigationDelegateClass
var WebScriptHandlerClass
var ThemeObserverClass

// TODO: events
// - 'page-favicon-updated'
// - 'new-window'
// - 'did-navigate-in-page'
// - 'will-prevent-unload'
// - 'crashed'
// - 'unresponsive'
// - 'responsive'
// - 'destroyed'
// - 'before-input-event'
// - 'certificate-error'
// - 'found-in-page'
// - 'media-started-playing'
// - 'media-paused'
// - 'did-change-theme-color'
// - 'update-target-url'
// - 'cursor-changed'
// - 'context-menu'
// - 'select-bluetooth-device'
// - 'paint'
// - 'console-message'

module.exports = function(browserWindow, panel, webview, options) {
  if (!ThemeObserverClass) {
    ThemeObserverClass = new ObjCClass({
      utils: null,

      'observeValueForKeyPath:ofObject:change:context:': function() {
        this.utils.executeJavaScript(
          "document.body.classList.remove('__skpm-" +
            (typeof MSTheme !== 'undefined' && MSTheme.sharedTheme().isDark()
              ? 'light'
              : 'dark') +
            "'); document.body.classList.add('__skpm-" +
            (typeof MSTheme !== 'undefined' && MSTheme.sharedTheme().isDark()
              ? 'dark'
              : 'light') +
            "')"
        )
      },
    })
  }

  if (!WindowDelegateClass) {
    WindowDelegateClass = new ObjCClass({
      utils: null,
      panel: null,

      'windowDidResize:': function() {
        this.utils.emit('resize')
      },

      'windowDidMiniaturize:': function() {
        this.utils.emit('minimize')
      },

      'windowDidDeminiaturize:': function() {
        this.utils.emit('restore')
      },

      'windowDidEnterFullScreen:': function() {
        this.utils.emit('enter-full-screen')
      },

      'windowDidExitFullScreen:': function() {
        this.utils.emit('leave-full-screen')
      },

      'windowDidMove:': function() {
        this.utils.emit('move')
        this.utils.emit('moved')
      },

      'windowShouldClose:': function() {
        var shouldClose = 1
        this.utils.emit('close', {
          get defaultPrevented() {
            return !shouldClose
          },
          preventDefault: function() {
            shouldClose = 0
          },
        })
        return shouldClose
      },

      'windowWillClose:': function() {
        this.utils.emit('closed')
      },

      'windowDidBecomeKey:': function() {
        this.utils.emit('focus', this.panel.currentEvent())
      },

      'windowDidResignKey:': function() {
        this.utils.emit('blur')
      },
    })
  }

  if (!NavigationDelegateClass) {
    NavigationDelegateClass = new ObjCClass({
      state: {
        wasReady: 0,
      },
      utils: null,

      // // Called when the web view begins to receive web content.
      'webView:didCommitNavigation:': function(webView) {
        this.utils.emit('will-navigate', {}, String(String(webView.URL())))
      },

      // // Called when web content begins to load in a web view.
      'webView:didStartProvisionalNavigation:': function() {
        this.utils.emit('did-start-navigation')
        this.utils.emit('did-start-loading')
      },

      // Called when a web view receives a server redirect.
      'webView:didReceiveServerRedirectForProvisionalNavigation:': function() {
        this.utils.emit('did-get-redirect-request')
      },

      // // Called when the web view needs to respond to an authentication challenge.
      // 'webView:didReceiveAuthenticationChallenge:completionHandler:': function(
      //   webView,
      //   challenge,
      //   completionHandler
      // ) {
      //   function callback(username, password) {
      //     completionHandler(
      //       0,
      //       NSURLCredential.credentialWithUser_password_persistence(
      //         username,
      //         password,
      //         1
      //       )
      //     )
      //   }
      //   var protectionSpace = challenge.protectionSpace()
      //   this.utils.emit(
      //     'login',
      //     {},
      //     {
      //       method: String(protectionSpace.authenticationMethod()),
      //       url: 'not implemented', // TODO:
      //       referrer: 'not implemented', // TODO:
      //     },
      //     {
      //       isProxy: !!protectionSpace.isProxy(),
      //       scheme: String(protectionSpace.protocol()),
      //       host: String(protectionSpace.host()),
      //       port: Number(protectionSpace.port()),
      //       realm: String(protectionSpace.realm()),
      //     },
      //     callback
      //   )
      // },

      // Called when an error occurs during navigation.
      // 'webView:didFailNavigation:withError:': function(
      //   webView,
      //   navigation,
      //   error
      // ) {},

      // Called when an error occurs while the web view is loading content.
      'webView:didFailProvisionalNavigation:withError:': function(
        webView,
        navigation,
        error
      ) {
        this.utils.emit('did-fail-load', error)
      },

      // Called when the navigation is complete.
      'webView:didFinishNavigation:': function() {
        if (this.state.wasReady == 0) {
          this.state.wasReady = 1
          this.utils.emitBrowserEvent('ready-to-show')
        }
        this.utils.emit('did-navigate')
        this.utils.emit('did-frame-navigate')
        this.utils.emit('did-stop-loading')
        this.utils.emit('did-finish-load')
        this.utils.emit('did-frame-finish-load')
      },

      // Called when the web view’s web content process is terminated.
      'webViewWebContentProcessDidTerminate:': function() {
        this.utils.emit('dom-ready')
      },

      // Decides whether to allow or cancel a navigation.
      // webView:decidePolicyForNavigationAction:decisionHandler:

      // Decides whether to allow or cancel a navigation after its response is known.
      // webView:decidePolicyForNavigationResponse:decisionHandler:
    })
  }

  if (!WebScriptHandlerClass) {
    WebScriptHandlerClass = new ObjCClass({
      utils: null,
      'userContentController:didReceiveScriptMessage:': function(_, message) {
        var args = this.utils.parseWebArguments(String(message.body()))
        if (!args) {
          return
        }
        if (!args[0] || typeof args[0] !== 'string') {
          return
        }
        args[0] = String(args[0])

        this.utils.emit.apply(this, args)
      },
    })
  }

  var themeObserver = ThemeObserverClass.new({
    utils: {
      executeJavaScript(script) {
        webview.evaluateJavaScript_completionHandler(script, null)
      },
    },
  })

  var script = WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(
    "document.addEventListener('DOMContentLoaded', function() { document.body.classList.add('__skpm-" +
      (typeof MSTheme !== 'undefined' && MSTheme.sharedTheme().isDark()
        ? 'dark'
        : 'light') +
      "') }, false)",
    0,
    true
  )
  webview
    .configuration()
    .userContentController()
    .addUserScript(script)

  NSApplication.sharedApplication().addObserver_forKeyPath_options_context(
    themeObserver,
    'effectiveAppearance',
    NSKeyValueChangeNewKey,
    null
  )

  var threadDictionary = NSThread.mainThread().threadDictionary()
  threadDictionary[browserWindow.id + '.themeObserver'] = themeObserver

  var navigationDelegate = NavigationDelegateClass.new({
    utils: {
      setTitle: browserWindow.setTitle.bind(browserWindow),
      emitBrowserEvent() {
        try {
          browserWindow.emit.apply(browserWindow, arguments)
        } catch (err) {
          if (
            typeof process !== 'undefined' &&
            process.listenerCount &&
            process.listenerCount('uncaughtException')
          ) {
            process.emit('uncaughtException', err, 'uncaughtException')
          } else {
            console.error(err)
            throw err
          }
        }
      },
      emit() {
        try {
          browserWindow.webContents.emit.apply(
            browserWindow.webContents,
            arguments
          )
        } catch (err) {
          if (
            typeof process !== 'undefined' &&
            process.listenerCount &&
            process.listenerCount('uncaughtException')
          ) {
            process.emit('uncaughtException', err, 'uncaughtException')
          } else {
            console.error(err)
            throw err
          }
        }
      },
    },
    state: {
      wasReady: 0,
    },
  })

  webview.setNavigationDelegate(navigationDelegate)

  var webScriptHandler = WebScriptHandlerClass.new({
    utils: {
      emit(id, type) {
        if (!type) {
          webview.evaluateJavaScript_completionHandler(
            CONSTANTS.JS_BRIDGE_RESULT_SUCCESS + id + '()',
            null
          )
          return
        }

        var args = []
        for (var i = 2; i < arguments.length; i += 1) args.push(arguments[i])

        var listeners = browserWindow.webContents.listeners(type)

        Promise.all(
          listeners.map(function(l) {
            return Promise.resolve().then(function() {
              return l.apply(l, args)
            })
          })
        )
          .then(function(res) {
            webview.evaluateJavaScript_completionHandler(
              CONSTANTS.JS_BRIDGE_RESULT_SUCCESS +
                id +
                '(' +
                JSON.stringify(res) +
                ')',
              null
            )
          })
          .catch(function(err) {
            webview.evaluateJavaScript_completionHandler(
              CONSTANTS.JS_BRIDGE_RESULT_ERROR +
                id +
                '(' +
                JSON.stringify(err) +
                ')',
              null
            )
          })
      },
      parseWebArguments: parseWebArguments,
    },
  })

  webview
    .configuration()
    .userContentController()
    .addScriptMessageHandler_name(webScriptHandler, CONSTANTS.JS_BRIDGE)

  var utils = {
    emit() {
      try {
        browserWindow.emit.apply(browserWindow, arguments)
      } catch (err) {
        if (
          typeof process !== 'undefined' &&
          process.listenerCount &&
          process.listenerCount('uncaughtException')
        ) {
          process.emit('uncaughtException', err, 'uncaughtException')
        } else {
          console.error(err)
          throw err
        }
      }
    },
  }
  if (options.modal) {
    // find the window of the document
    var msdocument
    if (options.parent.type === 'Document') {
      msdocument = options.parent.sketchObject
    } else {
      msdocument = options.parent
    }
    if (msdocument && String(msdocument.class()) === 'MSDocumentData') {
      // we only have an MSDocumentData instead of a MSDocument
      // let's try to get back to the MSDocument
      msdocument = msdocument.delegate()
    }
    utils.parentWindow = msdocument.windowForSheet()
  }

  var windowDelegate = WindowDelegateClass.new({
    utils: utils,
    panel: panel,
  })

  panel.setDelegate(windowDelegate)
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@skpm/promise/index.js */ "./node_modules/@skpm/promise/index.js")))

/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/webview-api.js":
/*!****************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/webview-api.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(/*! events */ "events")
var executeJavaScript = __webpack_require__(/*! ./execute-javascript */ "./node_modules/sketch-module-web-view/lib/execute-javascript.js")

// let's try to match https://github.com/electron/electron/blob/master/docs/api/web-contents.md
module.exports = function buildAPI(browserWindow, panel, webview) {
  var webContents = new EventEmitter()

  webContents.loadURL = browserWindow.loadURL

  webContents.loadFile = function(/* filePath */) {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }

  webContents.downloadURL = function(/* filePath */) {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }

  webContents.getURL = function() {
    return String(webview.url())
  }

  webContents.getTitle = function() {
    return String(webview.title())
  }

  webContents.isDestroyed = function() {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }

  webContents.focus = browserWindow.focus
  webContents.isFocused = browserWindow.isFocused

  webContents.isLoading = function() {
    return !!webview.loading()
  }

  webContents.isLoadingMainFrame = function() {
    // TODO:
    return !!webview.loading()
  }

  webContents.isWaitingForResponse = function() {
    return !webview.loading()
  }

  webContents.stop = function() {
    webview.stopLoading()
  }
  webContents.reload = function() {
    webview.reload()
  }
  webContents.reloadIgnoringCache = function() {
    webview.reloadFromOrigin()
  }
  webContents.canGoBack = function() {
    return !!webview.canGoBack()
  }
  webContents.canGoForward = function() {
    return !!webview.canGoForward()
  }
  webContents.canGoToOffset = function(offset) {
    return !!webview.backForwardList().itemAtIndex(offset)
  }
  webContents.clearHistory = function() {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.goBack = function() {
    webview.goBack()
  }
  webContents.goForward = function() {
    webview.goForward()
  }
  webContents.goToIndex = function(index) {
    var backForwardList = webview.backForwardList()
    var backList = backForwardList.backList()
    var backListLength = backList.count()
    if (backListLength > index) {
      webview.loadRequest(NSURLRequest.requestWithURL(backList[index]))
      return
    }
    var forwardList = backForwardList.forwardList()
    if (forwardList.count() > index - backListLength) {
      webview.loadRequest(
        NSURLRequest.requestWithURL(forwardList[index - backListLength])
      )
      return
    }
    throw new Error('Cannot go to index ' + index)
  }
  webContents.goToOffset = function(offset) {
    if (!webContents.canGoToOffset(offset)) {
      throw new Error('Cannot go to offset ' + offset)
    }
    webview.loadRequest(
      NSURLRequest.requestWithURL(webview.backForwardList().itemAtIndex(offset))
    )
  }
  webContents.isCrashed = function() {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.setUserAgent = function(/* userAgent */) {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.getUserAgent = function() {
    const userAgent = webview.customUserAgent()
    return userAgent ? String(userAgent) : undefined
  }
  webContents.insertCSS = function(css) {
    var source =
      "var style = document.createElement('style'); style.innerHTML = " +
      css.replace(/"/, '\\"') +
      '; document.head.appendChild(style);'
    var script = WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(
      source,
      0,
      true
    )
    webview
      .configuration()
      .userContentController()
      .addUserScript(script)
  }
  webContents.insertJS = function(source) {
    var script = WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(
      source,
      0,
      true
    )
    webview
      .configuration()
      .userContentController()
      .addUserScript(script)
  }
  webContents.executeJavaScript = executeJavaScript(webview, browserWindow)
  webContents.setIgnoreMenuShortcuts = function() {
    // TODO:??
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.setAudioMuted = function(/* muted */) {
    // TODO:??
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.isAudioMuted = function() {
    // TODO:??
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.setZoomFactor = function(factor) {
    webview.setMagnification_centeredAtPoint(factor, CGPointMake(0, 0))
  }
  webContents.getZoomFactor = function(callback) {
    callback(Number(webview.magnification()))
  }
  webContents.setZoomLevel = function(level) {
    // eslint-disable-next-line no-restricted-properties
    webContents.setZoomFactor(Math.pow(1.2, level))
  }
  webContents.getZoomLevel = function(callback) {
    // eslint-disable-next-line no-restricted-properties
    callback(Math.log(Number(webview.magnification())) / Math.log(1.2))
  }
  webContents.setVisualZoomLevelLimits = function(/* minimumLevel, maximumLevel */) {
    // TODO:??
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.setLayoutZoomLevelLimits = function(/* minimumLevel, maximumLevel */) {
    // TODO:??
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }

  // TODO:
  // webContents.undo = function() {
  //   webview.undoManager().undo()
  // }
  // webContents.redo = function() {
  //   webview.undoManager().redo()
  // }
  // webContents.cut = webview.cut
  // webContents.copy = webview.copy
  // webContents.paste = webview.paste
  // webContents.pasteAndMatchStyle = webview.pasteAsRichText
  // webContents.delete = webview.delete
  // webContents.replace = webview.replaceSelectionWithText

  webContents.send = function() {
    const script =
      'window.postMessage({' +
      'isSketchMessage: true,' +
      "origin: '" +
      String(__command.identifier()) +
      "'," +
      'args: ' +
      JSON.stringify([].slice.call(arguments)) +
      '}, "*")'
    webview.evaluateJavaScript_completionHandler(script, null)
  }

  webContents.getNativeWebview = function() {
    return webview
  }

  browserWindow.webContents = webContents
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/remote.js":
/*!*******************************************************!*\
  !*** ./node_modules/sketch-module-web-view/remote.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals NSThread */
var threadDictionary = NSThread.mainThread().threadDictionary()

module.exports.getWebview = function(identifier) {
  return __webpack_require__(/*! ./lib */ "./node_modules/sketch-module-web-view/lib/index.js").fromId(identifier) // eslint-disable-line
}

module.exports.isWebviewPresent = function isWebviewPresent(identifier) {
  return !!threadDictionary[identifier]
}

module.exports.sendToWebview = function sendToWebview(identifier, evalString) {
  if (!module.exports.isWebviewPresent(identifier)) {
    return
  }

  var panel = threadDictionary[identifier]
  var webview = null
  var subviews = panel.contentView().subviews()
  for (var i = 0; i < subviews.length; i += 1) {
    if (
      !webview &&
      !subviews[i].isKindOfClass(WKInspectorWKWebView) &&
      subviews[i].isKindOfClass(WKWebView)
    ) {
      webview = subviews[i]
    }
  }

  if (!webview || !webview.evaluateJavaScript_completionHandler) {
    throw new Error('Webview ' + identifier + ' not found')
  }

  webview.evaluateJavaScript_completionHandler(evalString, null)
}


/***/ }),

/***/ "./resources/export/index.js":
/*!***********************************!*\
  !*** ./resources/export/index.js ***!
  \***********************************/
/*! exports provided: getSystemFontsLocation, getUserFontsLocation, getSupplementalFontsLocation, getUserFonts, getSystemFonts, getSupplimentalFonts, getAllFonts, getRoot, getFileContent, getSavePath, writeFile, moveImages, moveSVGs, copyFonts */
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

/***/ }),

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

var getStore = function getStore(page, selectedArtboard, sketch) {
  // get final store items
  var artboard = Object(_artboard__WEBPACK_IMPORTED_MODULE_0__["default"])(page, selectedArtboard, sketch);
  var images = Object(_images__WEBPACK_IMPORTED_MODULE_1__["default"])(page, artboard.layers, sketch);
  var svgs = Object(_svgs__WEBPACK_IMPORTED_MODULE_2__["default"])(page, artboard.layers, sketch);
  var artboardImage = createArtboardImage(artboard, sketch);
  var fonts = Object(_fonts__WEBPACK_IMPORTED_MODULE_3__["default"])(artboard.layers);
  var notes = []; // remove duplicate artboard

  artboard.remove(); // return store

  return {
    artboard: artboard,
    images: images,
    svgs: svgs,
    notes: notes,
    fonts: fonts,
    artboardImage: artboardImage
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

/***/ }),

/***/ "./resources/ui/index.html":
/*!*********************************!*\
  !*** ./resources/ui/index.html ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/_webpack_resources/ce3add13c9c04cd1c30a5d7eb097fc1e.html";

/***/ }),

/***/ "./resources/ui/spec.html":
/*!********************************!*\
  !*** ./resources/ui/spec.html ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/_webpack_resources/7ceb2e398f6ddba984df98a91e7b79ad.html";

/***/ }),

/***/ "./resources/ui/style.css":
/*!********************************!*\
  !*** ./resources/ui/style.css ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/_webpack_resources/8d3be57d9df78cb6f15588e517f0da30.css";

/***/ }),

/***/ "./src/export.js":
/*!***********************!*\
  !*** ./src/export.js ***!
  \***********************/
/*! exports provided: default, onShutdown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onShutdown", function() { return onShutdown; });
/* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch/dom */ "sketch/dom");
/* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch/ui */ "sketch/ui");
/* harmony import */ var sketch_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch_ui__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sketch-module-web-view */ "./node_modules/sketch-module-web-view/lib/index.js");
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sketch_module_web_view__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sketch-module-web-view/remote */ "./node_modules/sketch-module-web-view/remote.js");
/* harmony import */ var sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _resources_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../resources/store */ "./resources/store/index.js");
/* harmony import */ var _resources_export__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../resources/export */ "./resources/export/index.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// @ts-ignore
 // @ts-ignore

 // @ts-ignore

 // @ts-ignore




var webviewIdentifier = 'measure.webview';
/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  // get document, selectedLayers, and artboard
  var document = sketch_dom__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
  var page = document.selectedPage;
  var selectedLayers = document.selectedLayers;
  var artboard = selectedLayers.layers.find(function (layer) {
    return layer.type === 'Artboard' && layer.selected;
  }); // if artboard selected, run command

  if (artboard) {
    //@ts-ignore
    var store = Object(_resources_store__WEBPACK_IMPORTED_MODULE_4__["default"])(page, artboard, sketch_dom__WEBPACK_IMPORTED_MODULE_0___default.a);
    var theme = sketch_ui__WEBPACK_IMPORTED_MODULE_1___default.a.getTheme(); // set webview browser window

    var browserWindow = new sketch_module_web_view__WEBPACK_IMPORTED_MODULE_2___default.a({
      identifier: webviewIdentifier,
      width: 1200,
      height: 900,
      fullscreenable: false,
      show: false
    }); //browserWindow.setAspectRatio(1.33);

    browserWindow.maximize();
    browserWindow.center();
    browserWindow.show(); // set webview contents

    var webContents = browserWindow.webContents; // load react app

    browserWindow.loadURL(__webpack_require__(/*! ../resources/ui/index.html */ "./resources/ui/index.html")); // render app once webview contents loaded

    webContents.on('did-finish-load', function () {
      //@ts-ignore
      webContents.executeJavaScript("renderApp(\n        ".concat(JSON.stringify(store), ",\n        ").concat(JSON.stringify(theme), "\n      )"));
    }); // open save prompt on save

    webContents.on('save', function (params) {
      var saveParams = JSON.parse(params); // add notes to store

      store.notes = saveParams.notes; // set final store

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
      }); // stringify final store for export

      var finalStoreString = JSON.stringify(finalStore); // get save path

      var savePath = _resources_export__WEBPACK_IMPORTED_MODULE_5__["getSavePath"](context); // get plugin root

      var pluginRoot = _resources_export__WEBPACK_IMPORTED_MODULE_5__["getRoot"](context); // get js path

      var scriptPath = "".concat(pluginRoot, "/Contents/Resources/resources_ui_spec.js"); // get js map path

      var scriptSourceMapPath = "".concat(pluginRoot, "/Contents/Resources/resources_ui_spec.js.map"); // get css path

      var stylesPath = __webpack_require__(/*! ../resources/ui/style.css */ "./resources/ui/style.css").replace('file://', ''); // get html path


      var templatePath = __webpack_require__(/*! ../resources/ui/spec.html */ "./resources/ui/spec.html").replace('file://', ''); // get css file name
      // 32 + . + extension


      var styleName = stylesPath.substr(-36); // get contents of html

      var template = _resources_export__WEBPACK_IMPORTED_MODULE_5__["getFileContent"](templatePath); // get contents of css

      var styles = _resources_export__WEBPACK_IMPORTED_MODULE_5__["getFileContent"](stylesPath); // get contents of js

      var script = _resources_export__WEBPACK_IMPORTED_MODULE_5__["getFileContent"](scriptPath); // add store to js string

      var scriptWithStore = "var SRM_APP_STORE = ".concat(finalStoreString, "; ").concat(script); // // add theme to js string

      var scriptWithTheme = "var SRM_APP_THEME = '".concat(saveParams.theme, "'; ").concat(scriptWithStore); // get contents of js map

      var scriptSourceMap = _resources_export__WEBPACK_IMPORTED_MODULE_5__["getFileContent"](scriptSourceMapPath); // create final html

      _resources_export__WEBPACK_IMPORTED_MODULE_5__["writeFile"]({
        content: template,
        path: savePath,
        fileName: 'spec.html'
      }); // create final css

      _resources_export__WEBPACK_IMPORTED_MODULE_5__["writeFile"]({
        content: styles,
        path: savePath,
        fileName: styleName
      }); // create final js

      _resources_export__WEBPACK_IMPORTED_MODULE_5__["writeFile"]({
        content: scriptWithTheme,
        path: savePath,
        fileName: 'resources_ui_spec.js'
      }); // create final js map

      _resources_export__WEBPACK_IMPORTED_MODULE_5__["writeFile"]({
        content: scriptSourceMap,
        path: savePath,
        fileName: 'resources_ui_spec.js.map'
      }); // move images from temp folder to spec

      if (store.images.length > 0) {
        _resources_export__WEBPACK_IMPORTED_MODULE_5__["moveImages"](store.images, savePath);
      } // move svgs from temp folder to spec


      if (store.svgs.length > 0) {
        _resources_export__WEBPACK_IMPORTED_MODULE_5__["moveSVGs"](store.svgs, savePath);
      } // copy fonts used in spec


      if (store.fonts.length > 0) {
        _resources_export__WEBPACK_IMPORTED_MODULE_5__["copyFonts"](store.fonts, savePath);
      }
    });
  } else {
    // if artboard not selected, alert user
    sketch_ui__WEBPACK_IMPORTED_MODULE_1___default.a.alert('Invalid Selection', 'Select an artboard to export.');
  }
});
var onShutdown = function onShutdown() {
  var existingWebview = Object(sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_3__["getWebview"])(webviewIdentifier);

  if (existingWebview) {
    existingWebview.close();
  }
};

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ }),

/***/ "sketch/ui":
/*!****************************!*\
  !*** external "sketch/ui" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/ui");

/***/ })

/******/ });
    if (key === 'default' && typeof exports === 'function') {
      exports(context);
    } else if (typeof exports[key] !== 'function') {
      throw new Error('Missing export named "' + key + '". Your command should contain something like `export function " + key +"() {}`.');
    } else {
      exports[key](context);
    }
  } catch (err) {
    if (typeof process !== 'undefined' && process.listenerCount && process.listenerCount('uncaughtException')) {
      process.emit("uncaughtException", err, "uncaughtException");
    } else {
      throw err
    }
  }
}
globalThis['onRun'] = __skpm_run.bind(this, 'default');
globalThis['onShutdown'] = __skpm_run.bind(this, 'onShutdown')

//# sourceMappingURL=__export.js.map