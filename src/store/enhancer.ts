import ReduxThunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { applyMiddleware, compose } from "redux";

// const Logger = createLogger({});

const middlewares = [ReduxThunk];

// if (__DEV__) {
//   // @ts-ignore
//   middlewares.push(Logger); // Logger must be last
// }

const enhancer = compose(applyMiddleware(...middlewares));

export default enhancer;
