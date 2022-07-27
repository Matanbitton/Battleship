/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "domElements": () => (/* binding */ domElements)
/* harmony export */ });
const domElements = function (player, playerFleet, bot, botFleet) {
  function createGrids(player, bot) {
    const container = createHtmlElement("div", "container");
    player.board.grid.forEach(function (row) {
      let divRow = createHtmlElement("div", "row");
      container.append(divRow);
      row.forEach(function () {
        let cell = createHtmlElement("div", "cell");
        divRow.append(cell);
      });
    });
    return container;
  }

  function createHtmlElement(element, elementClass, data, text) {
    const el = document.createElement(element);
    if (elementClass) el.className = elementClass;
    if (text) el.innerText = text;
    if (data) el.dataset.title = data;
    return el;
  }

  return {
    createGrids
  };
}();

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameBoard": () => (/* binding */ GameBoard)
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class GameBoard {
  constructor() {
    var _this = this;

    _defineProperty(this, "placeShipHorizontal", function (ship, x, y) {
      for (let i = 0; i < _this.grid.length; i++) {
        for (let j = 0; j < _this.grid.length; j++) {
          if (i === x && j === y) {
            let shipLength = ship.length;

            while (j < _this.grid.length && shipLength >= 0) {
              _this.grid[i][j] = {
                ship: ship,
                shipPartIndex: shipLength,
                hit: false
              };
              j++;
              shipLength--;
            }
          }
        }
      }
    });

    _defineProperty(this, "placeShipVertical", function (ship, x, y) {
      for (let i = 0; i < _this.grid.length; i++) {
        for (let j = 0; j < _this.grid[i].length; j++) {
          if (i === x && j == y) {
            while (i - ship.length > 0) {
              _this.grid[i][j] = {
                ship: ship,
                shipPartIndex: Math.abs(ship.length - i),
                hit: false
              };
              i++;
            }
          }
        }
      }
    });

    this.grid = this.createGrid();
    this.missedShots = [];
  }

  getMissedShots() {
    return this.missedShots;
  }

  addMissedShots(x, y) {
    this.missedShots.push({
      coorX: x,
      coorY: y
    });
  }

  createGrid() {
    let tempGrid = [];
    let tempArray = [];

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        tempArray.push({
          ship: undefined,
          shipPartIndex: undefined,
          hit: false
        });
      }

      tempGrid.push(tempArray);
      tempArray = [];
    }

    return tempGrid;
  }

  checkIfAllShipsSunk() {
    for (var _len = arguments.length, ships = new Array(_len), _key = 0; _key < _len; _key++) {
      ships[_key] = arguments[_key];
    }

    const sunkenShips = ships.filter(function (ship) {
      return ship.isSunk() == true;
    });

    if (sunkenShips.length == ships.length) {
      return true;
    }

    return false;
  }

  isShipPlacementOutOfBounds(ship, x, y) {
    if (x > 10 || x < 0 || y > 10 || y < 0 || y + ship.length > 10 || x + ship.length > 10) {
      return true;
    } else {
      for (let i = x; i < x + ship.length; i++) {
        for (let j = y; j < y + ship.length; j++) {
          if (this.grid[x][i].ship !== undefined || this.grid[y][j].ship !== undefined) {
            return true;
          }
        }
      }
    }

    return false;
  }

  receiveAttack(x, y) {
    if (this.grid[x][y].ship !== undefined) {
      this.grid[x][y].hit = true;
      this.grid[x][y].ship.hitPos(this.grid[x][y].shipPartIndex);
      return true;
    }

    this.addMissedShots(x, y);
    return false;
  }

}

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class Player {
  constructor(name, type) {
    var _this = this;

    _defineProperty(this, "changeTurn", function () {
      _this.turn = _this.turn === true ? false : true;
    });

    this.name = name;
    this.type = type;
    this.board = new _gameboard__WEBPACK_IMPORTED_MODULE_0__.GameBoard();
    this.turn = this.type === "bot" ? false : true;
    this.fleet = [];
  }

  playerAttack(opponent, x, y) {
    opponent.board.receiveAttack(x, y);
    this.changeTurn();
  }

}

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Ship {
  constructor(length, id) {
    var _this = this;

    _defineProperty(this, "hitPos", function (pos) {
      _this.shipParts[pos] = {
        hit: true
      };
    });

    _defineProperty(this, "isSunk", function () {
      let shipPartsHit = _this.shipParts.filter(function (part) {
        return part.hit === true;
      });

      return shipPartsHit.length === _this.length;
    });

    this.length = length;
    this.shipID = id;
    this.shipParts = this.createShip();
  }

  createShip() {
    let parts = [];
    let i = 0;

    while (i <= this.length) {
      parts.push({
        hit: false
      });
      i++;
    }

    return parts;
  }

}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".body {\n  background-color: rgb(12, 17, 20);\n}\n.container {\n  background-color: white;\n}\n.cell {\n  background-color: aqua;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,iCAAiC;AACnC;AACA;EACE,uBAAuB;AACzB;AACA;EACE,sBAAsB;AACxB","sourcesContent":[".body {\n  background-color: rgb(12, 17, 20);\n}\n.container {\n  background-color: white;\n}\n.cell {\n  background-color: aqua;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameLogic": () => (/* binding */ gameLogic)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.css */ "./src/style.css");



 // This function needs to:
// record the score
// record whose turn it is
// record if ships are hit
// record if all ships are hit
// show who won
// restart on game end and restart button pressed

const gameLogic = function () {
  const body = document.body;
  const player = new _player__WEBPACK_IMPORTED_MODULE_1__.Player("name", "player");
  const bot = new _player__WEBPACK_IMPORTED_MODULE_1__.Player("robot", "bot");

  const placeShips = function () {
    for (let i = 0; i < 5; i++) {
      let playerShip = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(i, "A");
      let botShip = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(i, "bot");
      let index = Math.abs(player.board.grid.length - playerShip.length);
      player.board.placeShipHorizontal(playerShip, randomIntShipPosition(10), randomIntShipPosition(index));
      bot.board.placeShipHorizontal(botShip, randomIntShipPosition(10), randomIntShipPosition(index));
      player.fleet.push(playerShip);
      bot.fleet.push(botShip);
    }

    console.log(player.board);
    console.log(player.fleet);
    console.log(bot.board);
    console.log(bot.fleet);
    /*    for (let i = 1; i <= 5; i++) {
      let randomX = Math.floor(Math.random() * 10);
      let randomY = Math.floor(Math.random() * 10);
      
      console.log(randomX, randomY);
         /*  if (!player.board.isShipPlacementOutOfBounds(ship, randomX, randomY)) {
        player.board.placeShipHorizontal(ship, randomX, randomY);
      } */
  };

  console.log("s");
  const ships = placeShips();
  let container = _dom__WEBPACK_IMPORTED_MODULE_2__.domElements.createGrids(player, bot);
  body.append(container);

  function randomIntShipPosition(maxIndex) {
    return Math.floor(Math.random() * maxIndex);
  }
};
gameLogic();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXFCLENBQUMsRUFBRCxDQUZ2QixFQUdFQSxxQkFBcUIsQ0FBQ0YsS0FBRCxDQUh2QjtNQUtBNUUsR0FBRyxDQUFDSyxLQUFKLENBQVV3RSxtQkFBVixDQUNFRixPQURGLEVBRUVHLHFCQUFxQixDQUFDLEVBQUQsQ0FGdkIsRUFHRUEscUJBQXFCLENBQUNGLEtBQUQsQ0FIdkI7TUFLQTlFLE1BQU0sQ0FBQzRELEtBQVAsQ0FBYWxCLElBQWIsQ0FBa0JrQyxVQUFsQjtNQUNBMUUsR0FBRyxDQUFDMEQsS0FBSixDQUFVbEIsSUFBVixDQUFlbUMsT0FBZjtJQUNEOztJQUNESSxPQUFPLENBQUNDLEdBQVIsQ0FBWWxGLE1BQU0sQ0FBQ08sS0FBbkI7SUFDQTBFLE9BQU8sQ0FBQ0MsR0FBUixDQUFZbEYsTUFBTSxDQUFDNEQsS0FBbkI7SUFDQXFCLE9BQU8sQ0FBQ0MsR0FBUixDQUFZaEYsR0FBRyxDQUFDSyxLQUFoQjtJQUNBMEUsT0FBTyxDQUFDQyxHQUFSLENBQVloRixHQUFHLENBQUMwRCxLQUFoQjtJQUVBO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFJRyxDQW5DRDs7RUFvQ0FxQixPQUFPLENBQUNDLEdBQVIsQ0FBWSxHQUFaO0VBQ0EsTUFBTWpDLEtBQUssR0FBRzBCLFVBQVUsRUFBeEI7RUFFQSxJQUFJdEUsU0FBUyxHQUFHTix5REFBQSxDQUF3QkMsTUFBeEIsRUFBZ0NFLEdBQWhDLENBQWhCO0VBQ0F3RSxJQUFJLENBQUM5RCxNQUFMLENBQVlQLFNBQVo7O0VBRUEsU0FBUzJFLHFCQUFULENBQStCRyxRQUEvQixFQUF5QztJQUN2QyxPQUFPL0MsSUFBSSxDQUFDZ0QsS0FBTCxDQUFXaEQsSUFBSSxDQUFDaUQsTUFBTCxLQUFnQkYsUUFBM0IsQ0FBUDtFQUNEO0FBQ0YsQ0FsRE07QUFvRFBWLFNBQVMsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZG9tRWxlbWVudHMgPSAoKHBsYXllciwgcGxheWVyRmxlZXQsIGJvdCwgYm90RmxlZXQpID0+IHtcbiAgZnVuY3Rpb24gY3JlYXRlR3JpZHMocGxheWVyLCBib3QpIHtcbiAgICBjb25zdCBjb250YWluZXIgPSBjcmVhdGVIdG1sRWxlbWVudChcImRpdlwiLCBcImNvbnRhaW5lclwiKTtcbiAgICBwbGF5ZXIuYm9hcmQuZ3JpZC5mb3JFYWNoKChyb3cpID0+IHtcbiAgICAgIGxldCBkaXZSb3cgPSBjcmVhdGVIdG1sRWxlbWVudChcImRpdlwiLCBcInJvd1wiKTtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmQoZGl2Um93KTtcbiAgICAgIHJvdy5mb3JFYWNoKCgpID0+IHtcbiAgICAgICAgbGV0IGNlbGwgPSBjcmVhdGVIdG1sRWxlbWVudChcImRpdlwiLCBcImNlbGxcIik7XG4gICAgICAgIGRpdlJvdy5hcHBlbmQoY2VsbCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gY29udGFpbmVyO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlSHRtbEVsZW1lbnQoZWxlbWVudCwgZWxlbWVudENsYXNzLCBkYXRhLCB0ZXh0KSB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICAgIGlmIChlbGVtZW50Q2xhc3MpIGVsLmNsYXNzTmFtZSA9IGVsZW1lbnRDbGFzcztcbiAgICBpZiAodGV4dCkgZWwuaW5uZXJUZXh0ID0gdGV4dDtcbiAgICBpZiAoZGF0YSkgZWwuZGF0YXNldC50aXRsZSA9IGRhdGE7XG5cbiAgICByZXR1cm4gZWw7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZUdyaWRzLFxuICB9O1xufSkoKTtcbiIsImV4cG9ydCBjbGFzcyBHYW1lQm9hcmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmdyaWQgPSB0aGlzLmNyZWF0ZUdyaWQoKTtcbiAgICB0aGlzLm1pc3NlZFNob3RzID0gW107XG4gIH1cblxuICBnZXRNaXNzZWRTaG90cygpIHtcbiAgICByZXR1cm4gdGhpcy5taXNzZWRTaG90cztcbiAgfVxuICBhZGRNaXNzZWRTaG90cyh4LCB5KSB7XG4gICAgdGhpcy5taXNzZWRTaG90cy5wdXNoKHsgY29vclg6IHgsIGNvb3JZOiB5IH0pO1xuICB9XG5cbiAgY3JlYXRlR3JpZCgpIHtcbiAgICBsZXQgdGVtcEdyaWQgPSBbXTtcbiAgICBsZXQgdGVtcEFycmF5ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgdGVtcEFycmF5LnB1c2goe1xuICAgICAgICAgIHNoaXA6IHVuZGVmaW5lZCxcbiAgICAgICAgICBzaGlwUGFydEluZGV4OiB1bmRlZmluZWQsXG4gICAgICAgICAgaGl0OiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0ZW1wR3JpZC5wdXNoKHRlbXBBcnJheSk7XG4gICAgICB0ZW1wQXJyYXkgPSBbXTtcbiAgICB9XG4gICAgcmV0dXJuIHRlbXBHcmlkO1xuICB9XG5cbiAgcGxhY2VTaGlwSG9yaXpvbnRhbCA9IChzaGlwLCB4LCB5KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdyaWQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5ncmlkLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChpID09PSB4ICYmIGogPT09IHkpIHtcbiAgICAgICAgICBsZXQgc2hpcExlbmd0aCA9IHNoaXAubGVuZ3RoO1xuICAgICAgICAgIHdoaWxlIChqIDwgdGhpcy5ncmlkLmxlbmd0aCAmJiBzaGlwTGVuZ3RoID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuZ3JpZFtpXVtqXSA9IHtcbiAgICAgICAgICAgICAgc2hpcDogc2hpcCxcbiAgICAgICAgICAgICAgc2hpcFBhcnRJbmRleDogc2hpcExlbmd0aCxcbiAgICAgICAgICAgICAgaGl0OiBmYWxzZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBqKys7XG4gICAgICAgICAgICBzaGlwTGVuZ3RoLS07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBjaGVja0lmQWxsU2hpcHNTdW5rKC4uLnNoaXBzKSB7XG4gICAgY29uc3Qgc3Vua2VuU2hpcHMgPSBzaGlwcy5maWx0ZXIoKHNoaXApID0+IHNoaXAuaXNTdW5rKCkgPT0gdHJ1ZSk7XG4gICAgaWYgKHN1bmtlblNoaXBzLmxlbmd0aCA9PSBzaGlwcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHBsYWNlU2hpcFZlcnRpY2FsID0gKHNoaXAsIHgsIHkpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ3JpZC5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmdyaWRbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKGkgPT09IHggJiYgaiA9PSB5KSB7XG4gICAgICAgICAgd2hpbGUgKGkgLSBzaGlwLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuZ3JpZFtpXVtqXSA9IHtcbiAgICAgICAgICAgICAgc2hpcDogc2hpcCxcbiAgICAgICAgICAgICAgc2hpcFBhcnRJbmRleDogTWF0aC5hYnMoc2hpcC5sZW5ndGggLSBpKSxcbiAgICAgICAgICAgICAgaGl0OiBmYWxzZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGlzU2hpcFBsYWNlbWVudE91dE9mQm91bmRzKHNoaXAsIHgsIHkpIHtcbiAgICBpZiAoXG4gICAgICB4ID4gMTAgfHxcbiAgICAgIHggPCAwIHx8XG4gICAgICB5ID4gMTAgfHxcbiAgICAgIHkgPCAwIHx8XG4gICAgICB5ICsgc2hpcC5sZW5ndGggPiAxMCB8fFxuICAgICAgeCArIHNoaXAubGVuZ3RoID4gMTBcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0geDsgaSA8IHggKyBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSB5OyBqIDwgeSArIHNoaXAubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLmdyaWRbeF1baV0uc2hpcCAhPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICB0aGlzLmdyaWRbeV1bal0uc2hpcCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJlY2VpdmVBdHRhY2soeCwgeSkge1xuICAgIGlmICh0aGlzLmdyaWRbeF1beV0uc2hpcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmdyaWRbeF1beV0uaGl0ID0gdHJ1ZTtcblxuICAgICAgdGhpcy5ncmlkW3hdW3ldLnNoaXAuaGl0UG9zKHRoaXMuZ3JpZFt4XVt5XS5zaGlwUGFydEluZGV4KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICB0aGlzLmFkZE1pc3NlZFNob3RzKHgsIHkpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgR2FtZUJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5leHBvcnQgY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSwgdHlwZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmJvYXJkID0gbmV3IEdhbWVCb2FyZCgpO1xuICAgIHRoaXMudHVybiA9IHRoaXMudHlwZSA9PT0gXCJib3RcIiA/IGZhbHNlIDogdHJ1ZTtcbiAgICB0aGlzLmZsZWV0ID0gW107XG4gIH1cblxuICBjaGFuZ2VUdXJuID0gKCkgPT4ge1xuICAgIHRoaXMudHVybiA9IHRoaXMudHVybiA9PT0gdHJ1ZSA/IGZhbHNlIDogdHJ1ZTtcbiAgfTtcblxuICBwbGF5ZXJBdHRhY2sob3Bwb25lbnQsIHgsIHkpIHtcbiAgICBvcHBvbmVudC5ib2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpO1xuICAgIHRoaXMuY2hhbmdlVHVybigpO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCwgaWQpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLnNoaXBJRCA9IGlkO1xuICAgIHRoaXMuc2hpcFBhcnRzID0gdGhpcy5jcmVhdGVTaGlwKCk7XG4gIH1cbiAgY3JlYXRlU2hpcCgpIHtcbiAgICBsZXQgcGFydHMgPSBbXTtcbiAgICBsZXQgaSA9IDA7XG4gICAgd2hpbGUgKGkgPD0gdGhpcy5sZW5ndGgpIHtcbiAgICAgIHBhcnRzLnB1c2goeyBoaXQ6IGZhbHNlIH0pO1xuICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gcGFydHM7XG4gIH1cblxuICBoaXRQb3MgPSAocG9zKSA9PiB7XG4gICAgdGhpcy5zaGlwUGFydHNbcG9zXSA9IHsgaGl0OiB0cnVlIH07XG4gIH07XG5cbiAgaXNTdW5rID0gKCkgPT4ge1xuICAgIGxldCBzaGlwUGFydHNIaXQgPSB0aGlzLnNoaXBQYXJ0cy5maWx0ZXIoKHBhcnQpID0+IHBhcnQuaGl0ID09PSB0cnVlKTtcbiAgICByZXR1cm4gc2hpcFBhcnRzSGl0Lmxlbmd0aCA9PT0gdGhpcy5sZW5ndGg7XG4gIH07XG59XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxMiwgMTcsIDIwKTtcXG59XFxuLmNvbnRhaW5lciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG59XFxuLmNlbGwge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYXF1YTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGlDQUFpQztBQUNuQztBQUNBO0VBQ0UsdUJBQXVCO0FBQ3pCO0FBQ0E7RUFDRSxzQkFBc0I7QUFDeEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDEyLCAxNywgMjApO1xcbn1cXG4uY29udGFpbmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbn1cXG4uY2VsbCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBhcXVhO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IGRvbUVsZW1lbnRzIH0gZnJvbSBcIi4vZG9tXCI7XG5pbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuXG4vLyBUaGlzIGZ1bmN0aW9uIG5lZWRzIHRvOlxuLy8gcmVjb3JkIHRoZSBzY29yZVxuLy8gcmVjb3JkIHdob3NlIHR1cm4gaXQgaXNcbi8vIHJlY29yZCBpZiBzaGlwcyBhcmUgaGl0XG4vLyByZWNvcmQgaWYgYWxsIHNoaXBzIGFyZSBoaXRcbi8vIHNob3cgd2hvIHdvblxuLy8gcmVzdGFydCBvbiBnYW1lIGVuZCBhbmQgcmVzdGFydCBidXR0b24gcHJlc3NlZFxuXG5leHBvcnQgY29uc3QgZ2FtZUxvZ2ljID0gKCkgPT4ge1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgY29uc3QgcGxheWVyID0gbmV3IFBsYXllcihcIm5hbWVcIiwgXCJwbGF5ZXJcIik7XG4gIGNvbnN0IGJvdCA9IG5ldyBQbGF5ZXIoXCJyb2JvdFwiLCBcImJvdFwiKTtcblxuICBjb25zdCBwbGFjZVNoaXBzID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICBsZXQgcGxheWVyU2hpcCA9IG5ldyBTaGlwKGksIFwiQVwiKTtcbiAgICAgIGxldCBib3RTaGlwID0gbmV3IFNoaXAoaSwgXCJib3RcIik7XG4gICAgICBsZXQgaW5kZXggPSBNYXRoLmFicyhwbGF5ZXIuYm9hcmQuZ3JpZC5sZW5ndGggLSBwbGF5ZXJTaGlwLmxlbmd0aCk7XG5cbiAgICAgIHBsYXllci5ib2FyZC5wbGFjZVNoaXBIb3Jpem9udGFsKFxuICAgICAgICBwbGF5ZXJTaGlwLFxuICAgICAgICByYW5kb21JbnRTaGlwUG9zaXRpb24oMTApLFxuICAgICAgICByYW5kb21JbnRTaGlwUG9zaXRpb24oaW5kZXgpXG4gICAgICApO1xuICAgICAgYm90LmJvYXJkLnBsYWNlU2hpcEhvcml6b250YWwoXG4gICAgICAgIGJvdFNoaXAsXG4gICAgICAgIHJhbmRvbUludFNoaXBQb3NpdGlvbigxMCksXG4gICAgICAgIHJhbmRvbUludFNoaXBQb3NpdGlvbihpbmRleClcbiAgICAgICk7XG4gICAgICBwbGF5ZXIuZmxlZXQucHVzaChwbGF5ZXJTaGlwKTtcbiAgICAgIGJvdC5mbGVldC5wdXNoKGJvdFNoaXApO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhwbGF5ZXIuYm9hcmQpO1xuICAgIGNvbnNvbGUubG9nKHBsYXllci5mbGVldCk7XG4gICAgY29uc29sZS5sb2coYm90LmJvYXJkKTtcbiAgICBjb25zb2xlLmxvZyhib3QuZmxlZXQpO1xuXG4gICAgLyogICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XG4gICAgICBsZXQgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGxldCByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgXG4gICAgICBjb25zb2xlLmxvZyhyYW5kb21YLCByYW5kb21ZKTtcblxuXG5cbiAgICAgIC8qICBpZiAoIXBsYXllci5ib2FyZC5pc1NoaXBQbGFjZW1lbnRPdXRPZkJvdW5kcyhzaGlwLCByYW5kb21YLCByYW5kb21ZKSkge1xuICAgICAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwSG9yaXpvbnRhbChzaGlwLCByYW5kb21YLCByYW5kb21ZKTtcbiAgICAgIH0gKi9cbiAgfTtcbiAgY29uc29sZS5sb2coXCJzXCIpO1xuICBjb25zdCBzaGlwcyA9IHBsYWNlU2hpcHMoKTtcblxuICBsZXQgY29udGFpbmVyID0gZG9tRWxlbWVudHMuY3JlYXRlR3JpZHMocGxheWVyLCBib3QpO1xuICBib2R5LmFwcGVuZChjb250YWluZXIpO1xuXG4gIGZ1bmN0aW9uIHJhbmRvbUludFNoaXBQb3NpdGlvbihtYXhJbmRleCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXhJbmRleCk7XG4gIH1cbn07XG5cbmdhbWVMb2dpYygpO1xuIl0sIm5hbWVzIjpbImRvbUVsZW1lbnRzIiwicGxheWVyIiwicGxheWVyRmxlZXQiLCJib3QiLCJib3RGbGVldCIsImNyZWF0ZUdyaWRzIiwiY29udGFpbmVyIiwiY3JlYXRlSHRtbEVsZW1lbnQiLCJib2FyZCIsImdyaWQiLCJmb3JFYWNoIiwicm93IiwiZGl2Um93IiwiYXBwZW5kIiwiY2VsbCIsImVsZW1lbnQiLCJlbGVtZW50Q2xhc3MiLCJkYXRhIiwidGV4dCIsImVsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiaW5uZXJUZXh0IiwiZGF0YXNldCIsInRpdGxlIiwiR2FtZUJvYXJkIiwiY29uc3RydWN0b3IiLCJzaGlwIiwieCIsInkiLCJpIiwibGVuZ3RoIiwiaiIsInNoaXBMZW5ndGgiLCJzaGlwUGFydEluZGV4IiwiaGl0IiwiTWF0aCIsImFicyIsImNyZWF0ZUdyaWQiLCJtaXNzZWRTaG90cyIsImdldE1pc3NlZFNob3RzIiwiYWRkTWlzc2VkU2hvdHMiLCJwdXNoIiwiY29vclgiLCJjb29yWSIsInRlbXBHcmlkIiwidGVtcEFycmF5IiwidW5kZWZpbmVkIiwiY2hlY2tJZkFsbFNoaXBzU3VuayIsInNoaXBzIiwic3Vua2VuU2hpcHMiLCJmaWx0ZXIiLCJpc1N1bmsiLCJpc1NoaXBQbGFjZW1lbnRPdXRPZkJvdW5kcyIsInJlY2VpdmVBdHRhY2siLCJoaXRQb3MiLCJQbGF5ZXIiLCJuYW1lIiwidHlwZSIsInR1cm4iLCJmbGVldCIsInBsYXllckF0dGFjayIsIm9wcG9uZW50IiwiY2hhbmdlVHVybiIsIlNoaXAiLCJpZCIsInBvcyIsInNoaXBQYXJ0cyIsInNoaXBQYXJ0c0hpdCIsInBhcnQiLCJzaGlwSUQiLCJjcmVhdGVTaGlwIiwicGFydHMiLCJnYW1lTG9naWMiLCJib2R5IiwicGxhY2VTaGlwcyIsInBsYXllclNoaXAiLCJib3RTaGlwIiwiaW5kZXgiLCJwbGFjZVNoaXBIb3Jpem9udGFsIiwicmFuZG9tSW50U2hpcFBvc2l0aW9uIiwiY29uc29sZSIsImxvZyIsIm1heEluZGV4IiwiZmxvb3IiLCJyYW5kb20iXSwic291cmNlUm9vdCI6IiJ9