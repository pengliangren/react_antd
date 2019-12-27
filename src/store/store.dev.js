import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

// 没有使用 redux-thunk 之前，action只能返回一个对象的形式，用了之后可以返回一个函数
const enhancer = composeEnhancers(
  applyMiddleware(...[thunk])
);

const store = createStore(
  rootReducer, 
  enhancer
);

export default store;
