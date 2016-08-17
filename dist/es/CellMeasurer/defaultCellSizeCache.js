/**
 * Default CellMeasurer `cellSizeCache` implementation.
 * Permanently caches all cell sizes (identified by column and row index) unless explicitly cleared.
 */
var CellSizeCache = function () {
  function CellSizeCache() {
    babelHelpers.classCallCheck(this, CellSizeCache);

    this._cachedColumnWidths = {};
    this._cachedRowHeights = {};
  }

  babelHelpers.createClass(CellSizeCache, [{
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

export default CellSizeCache;