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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config.json":
/*!*********************!*\
  !*** ./config.json ***!
  \*********************/
/*! exports provided: mode, log, mysql, params, default */
/***/ (function(module) {

eval("module.exports = {\"mode\":\"DEV\",\"log\":{\"level\":2,\"type\":\"file\",\"dir\":\"./logs/\",\"name\":\"log-server\"},\"mysql\":{\"DEV\":{\"host\":\"localhost\",\"user\":\"root\",\"password\":\"\",\"database\":\"larimar\"},\"PROD\":{\"host\":\"localhost\",\"user\":\"tityus\",\"password\":\"qscpzllmO1@\",\"database\":\"larimar\"}},\"params\":{\"category\":\"telephonie\",\"page\":1,\"maxpage\":10}};\n\n//# sourceURL=webpack:///./config.json?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! framework */ \"./src/services/framework.js\");\n\r\n\r\n\r\nframework__WEBPACK_IMPORTED_MODULE_0__[\"logger\"].debug('test');\r\n\r\n//console.log(framework.logger);\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/services/framework.js":
/*!***********************************!*\
  !*** ./src/services/framework.js ***!
  \***********************************/
/*! exports provided: config, logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger */ \"./src/services/logger.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"logger\", function() { return _logger__WEBPACK_IMPORTED_MODULE_0__[\"logger\"]; });\n\n/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! config */ \"./config.json\");\nvar config__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! config */ \"./config.json\", 1);\n/* harmony reexport (default from named exports) */ __webpack_require__.d(__webpack_exports__, \"config\", function() { return config__WEBPACK_IMPORTED_MODULE_1__; });\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/services/framework.js?");

/***/ }),

/***/ "./src/services/logger.js":
/*!********************************!*\
  !*** ./src/services/logger.js ***!
  \********************************/
/*! exports provided: logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"logger\", function() { return logger; });\n/* harmony import */ var framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! framework */ \"./src/services/framework.js\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\n\r\nconst { Console } = __webpack_require__(/*! console */ \"console\");\r\n\r\nconst getDirectory = async () => {\r\n  try {\r\n    await fs__WEBPACK_IMPORTED_MODULE_1___default.a.fsPromises.readdir(framework__WEBPACK_IMPORTED_MODULE_0__[\"config\"].log.dir);\r\n    return true;\r\n  } catch(e) {\r\n    if(e.code === 'ENOENT') return 'ENOENT';\r\n  }\r\n}\r\n\r\nconst createDirectory = async () => {\r\n  try {\r\n    console.log(framework__WEBPACK_IMPORTED_MODULE_0__[\"config\"].log.dir);\r\n    await fs__WEBPACK_IMPORTED_MODULE_1___default.a.fsPromises.mkdir(framework__WEBPACK_IMPORTED_MODULE_0__[\"config\"].log.dir, { recursive: true });\r\n  } catch(e) {\r\n    throw `Error type=function name=createDirectory : ${e}`;\r\n  }\r\n}\r\n\r\nconst sendFile = async (mode, message) => {\r\n  const checkDir = await getDirectory();\r\n  if(checkDir === 'ENOENT') await createDirectory();\r\n  const stdout = fs__WEBPACK_IMPORTED_MODULE_1___default.a.createWriteStream(`${framework__WEBPACK_IMPORTED_MODULE_0__[\"config\"].log.dir}${framework__WEBPACK_IMPORTED_MODULE_0__[\"config\"].log.name}.log`, {flags: 'a'});\r\n  const logger = new Console({ stdout });\r\n  const date = new Date();\r\n  logger.log(`${date.toLocaleDateString('fr-FR')} - ${mode} : ${message} \\r\\n`);\r\n}\r\n\r\nconst send = (mode, message) => {\r\n  if (framework__WEBPACK_IMPORTED_MODULE_0__[\"config\"].log.type === 'console') console.log(mode, message);\r\n  if (framework__WEBPACK_IMPORTED_MODULE_0__[\"config\"].log.type === 'file') sendFile(mode, message);\r\n}\r\n\r\nconst error = (message) => {\r\n  send('ERROR', message);\r\n}\r\n\r\nconst warn = (message) => {\r\n  if (framework__WEBPACK_IMPORTED_MODULE_0__[\"config\"].log.level < 1) return;\r\n  send('WARN', message);\r\n}\r\n\r\nconst debug = (message) => {\r\n  if (framework__WEBPACK_IMPORTED_MODULE_0__[\"config\"].log.level < 2) return;\r\n  send('DEBUG', message);\r\n}\r\n\r\nconst info = (message) => {\r\n  if (framework__WEBPACK_IMPORTED_MODULE_0__[\"config\"].log.level < 3) return;\r\n  send('INFO', message);\r\n}\r\n\r\nconst logger = {\r\n  error,\r\n  warn,\r\n  debug,\r\n  info\r\n}\r\n\n\n//# sourceURL=webpack:///./src/services/logger.js?");

/***/ }),

/***/ "console":
/*!**************************!*\
  !*** external "console" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"console\");\n\n//# sourceURL=webpack:///external_%22console%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ })

/******/ });