import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'; // using in production
import rootReducer from "./reducers";

// 没有使用 redux-thunk 之前，action只能返回一个对象的形式，用了之后可以返回一个函数

const composeEnhancers = composeWithDevTools({
  // options like actionSanitizer, stateSanitizer
});

const enhancer = composeEnhancers(
  applyMiddleware(...[thunk])
);

const store = createStore(
  rootReducer, 
  enhancer
);

export default store;