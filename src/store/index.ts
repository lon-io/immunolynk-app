import { createStore } from "redux";
import rootReducer from "./reducers"; //Import the reducer
import { persistStore, persistReducer } from "redux-persist";
import { AsyncStorage } from 'react-native';
import enhancer from "./enhancer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const store = createStore(persistedReducer, enhancer);

  // @ts-ignore
  let persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
