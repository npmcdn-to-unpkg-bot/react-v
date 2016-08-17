"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Default CellMeasurer `cellSizeCache` implementation.
 * Permanently caches all cell sizes (identified by column and row index) unless explicitly cleared.
 */
var CellSizeCache = function () {
  function CellSizeCache() {
    _classCallCheck(this, CellSizeCache);

    this._cachedColumnWidths = {};
    this._cachedRowHeights = {};
  }

  _createClass(CellSizeCache, [{
    key: "clearAllColumnWidths",
    value: function clearAllColumnWidths() {
      this._cachedColumnWidths = {};
    }
  }, {
    key: "clearAllRowHeights",
    value: function clearAllRowHeights() {
      this._cachedRowHeights = {};
    }
  }, {
    key: "clearColumnWidth",
    value: function clearColumnWidth(index) {
      delete this._cachedColumnWidths[index];
    }
  }, {
    key: "clearRowHeight",
    value: function clearRowHeight(index) {
      delete this._cachedRowHeights[index];
    }
  }, {
    key: "getColumnWidth",
    value: function getColumnWidth(index) {
      return this._cachedColumnWidths[index];
    }
  }, {
    key: "getRowHeight",
    value: function getRowHeight(index) {
      return this._cachedRowHeights[index];
    }
  }, {
    key: "hasColumnWidth",
    value: function hasColumnWidth(index) {
      return this._cachedColumnWidths[index] >= 0;
    }
  }, {
    key: "hasRowHeight",
    value: function hasRowHeight(index) {
      return this._cachedRowHeights[index] >= 0;
    }
  }, {
    key: "setColumnWidth",
    value: function setColumnWidth(index, width) {
      this._cachedColumnWidths[index] = width;
    }
  }, {
    key: "setRowHeight",
    value: function setRowHeight(index, height) {
      this._cachedRowHeights[index] = height;
    }
  }]);

  return CellSizeCache;
}();

exports.default = CellSizeCache;