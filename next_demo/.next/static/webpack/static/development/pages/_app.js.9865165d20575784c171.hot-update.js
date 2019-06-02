webpackHotUpdate("static\\development\\pages\\_app.js",{

/***/ "./store.js":
/*!******************!*\
  !*** ./store.js ***!
  \******************/
/*! exports provided: actions, makeStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actions", function() { return actions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeStore", function() { return makeStore; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-devtools-extension */ "./node_modules/redux-devtools-extension/index.js");
/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_devtools_extension__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js");
 // 用于在服务端的钩子  因为没有mock windows



var initialState = {
  count: 0
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case 'ABOUT/ADD_COUNT':
      return {
        count: ++state.count
      };

    default:
      return state;
  }
};

var actions = {
  addCount: function addCount() {
    return {
      type: 'ABOUT/ADD_COUNT'
    };
  } // 区别对待production 和 devlopment

};
function makeStore(initialState, _ref) {
  var isServer = _ref.isServer;
  initialState || reducer();

  if (isServer) {
    // 服务端渲染肯定会先于持久化状态加载
    return Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(reducer, initialState, Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(redux_thunk__WEBPACK_IMPORTED_MODULE_2__["default"]));
  } else {
    // redux-persist 来持久化存放在 Store 里的应用状态（使用到了localstorage）
    // 在服务端渲染时也可以初始化 Redux store 的状态，
    // 不过这里需要防止后续客户端加载的持久化状态覆盖掉服务端初始状态。(造成闪烁问题)
    var _require = __webpack_require__(/*! redux-persist */ "./node_modules/redux-persist/es/index.js"),
        persistReducer = _require.persistReducer,
        persistStore = _require.persistStore;

    var storage = __webpack_require__(/*! redux-persist/lib/storage */ "./node_modules/redux-persist/lib/storage/index.js").default;

    var persistedReducer = persistReducer({
      key: 'nextjs',
      storage: storage
    }, reducer);
    var store = Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(persistedReducer, initialState, Object(redux_devtools_extension__WEBPACK_IMPORTED_MODULE_1__["composeWithDevTools"])(Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(redux_thunk__WEBPACK_IMPORTED_MODULE_2__["default"])));
    store.__persistor = persistStore(store);
    return store;
  }
}

/***/ })

})
//# sourceMappingURL=_app.js.9865165d20575784c171.hot-update.js.map