import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import shallowCompare from 'react-addons-shallow-compare';
import raf from 'raf';

/**
 * Specifies the number of miliseconds during which to disable pointer events while a scroll is in progress.
 * This improves performance and makes scrolling smoother.
 */
export var IS_SCROLLING_TIMEOUT = 150;

var WindowScroller = function (_Component) {
  babelHelpers.inherits(WindowScroller, _Component);

  function WindowScroller(props) {
    babelHelpers.classCallCheck(this, WindowScroller);

    var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(WindowScroller).call(this, props));

    var height = typeof window !== 'undefined' ? window.innerHeight : 0;

    _this.state = {
      isScrolling: false,
      height: height,
      scrollTop: 0
    };

    _this._onScrollWindow = _this._onScrollWindow.bind(_this);
    _this._onResizeWindow = _this._onResizeWindow.bind(_this);
    _this._enablePointerEventsAfterDelayCallback = _this._enablePointerEventsAfterDelayCallback.bind(_this);
    return _this;
  }

  babelHelpers.createClass(WindowScroller, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var height = this.state.height;

      // Subtract documentElement top to handle edge-case where a user is navigating back (history) from an already-scrolled bage.
      // In this case the body's top position will be a negative number and this element's top will be increased (by that amount).

      this._positionFromTop = ReactDOM.findDOMNode(this).getBoundingClientRect().top - document.documentElement.getBoundingClientRect().top;

      if (height !== window.innerHeight) {
        this.setState({
          height: window.innerHeight
        });
      }

      window.addEventListener('scroll', this._onScrollWindow, false);
      window.addEventListener('resize', this._onResizeWindow, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this._onScrollWindow, false);
      window.removeEventListener('resize', this._onResizeWindow, false);

      if (this._disablePointerEventsTimeoutId) {
        clearTimeout(this._disablePointerEventsTimeoutId);

        this._enablePointerEventsIfDisabled();
      }
    }

    /**
     * Updates the state during the next animation frame.
     * Use this method to avoid multiple renders in a small span of time.
     * This helps performance for bursty events (like onScroll).
     */

  }, {
    key: '_setNextState',
    value: function _setNextState(state) {
      var _this2 = this;

      if (this._setNextStateAnimationFrameId) {
        raf.cancel(this._setNextStateAnimationFrameId);
      }

      this._setNextStateAnimationFrameId = raf(function () {
        _this2._setNextStateAnimationFrameId = null;
        _this2.setState(state);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;
      var _state = this.state;
      var isScrolling = _state.isScrolling;
      var scrollTop = _state.scrollTop;
      var height = _state.height;


      return React.createElement(
        'div',
        null,
        children({
          height: height,
          isScrolling: isScrolling,
          scrollTop: scrollTop
        })
      );
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this, nextProps, nextState);
    }
  }, {
    key: '_enablePointerEventsAfterDelay',
    value: function _enablePointerEventsAfterDelay() {
      if (this._disablePointerEventsTimeoutId) {
        clearTimeout(this._disablePointerEventsTimeoutId);
      }

      this._disablePointerEventsTimeoutId = setTimeout(this._enablePointerEventsAfterDelayCallback, IS_SCROLLING_TIMEOUT);
    }
  }, {
    key: '_enablePointerEventsAfterDelayCallback',
    value: function _enablePointerEventsAfterDelayCallback() {
      this._enablePointerEventsIfDisabled();

      this.setState({
        isScrolling: false
      });
    }
  }, {
    key: '_enablePointerEventsIfDisabled',
    value: function _enablePointerEventsIfDisabled() {
      if (this._disablePointerEventsTimeoutId) {
        this._disablePointerEventsTimeoutId = null;

        document.body.style.pointerEvents = this._originalBodyPointerEvents;

        this._originalBodyPointerEvents = null;
      }
    }
  }, {
    key: '_onResizeWindow',
    value: function _onResizeWindow(event) {
      var onResize = this.props.onResize;


      var height = window.innerHeight || 0;

      this.setState({ height: height });

      onResize({ height: height });
    }
  }, {
    key: '_onScrollWindow',
    value: function _onScrollWindow(event) {
      var onScroll = this.props.onScroll;

      // In IE10+ scrollY is undefined, so we replace that with the latter

      var scrollY = 'scrollY' in window ? window.scrollY : document.documentElement.scrollTop;

      var scrollTop = Math.max(0, scrollY - this._positionFromTop);

      if (this._originalBodyPointerEvents == null) {
        this._originalBodyPointerEvents = document.body.style.pointerEvents;

        document.body.style.pointerEvents = 'none';

        this._enablePointerEventsAfterDelay();
      }

      var state = {
        isScrolling: true,
        scrollTop: scrollTop
      };

      if (!this.state.isScrolling) {
        this.setState(state);
      } else {
        this._setNextState(state);
      }

      onScroll({ scrollTop: scrollTop });
    }
  }]);
  return WindowScroller;
}(Component);

WindowScroller.propTypes = {
  /**
   * Function respondible for rendering children.
   * This function should implement the following signature:
   * ({ height, scrollTop }) => PropTypes.element
   */
  children: PropTypes.func.isRequired,

  /** Callback to be invoked on-resize: ({ height }) */
  onResize: PropTypes.func.isRequired,

  /** Callback to be invoked on-scroll: ({ scrollTop }) */
  onScroll: PropTypes.func.isRequired
};
WindowScroller.defaultProps = {
  onResize: function onResize() {},
  onScroll: function onScroll() {}
};
export default WindowScroller;