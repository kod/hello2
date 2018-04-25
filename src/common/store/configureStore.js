import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, autoRehydrate, createTransform } from 'redux-persist';
import { REHYDRATE } from 'redux-persist/constants';
import createActionBuffer from 'redux-action-buffer';
import { AsyncStorage } from 'react-native';
import logger from "redux-logger";
import rootReducer from '../reducers';
import rootSaga from '../sagas';

export default function configureStore() {
  let enhancer;
  const sagaMiddleware = createSagaMiddleware();
  if (process.env.NODE_ENV !== 'production') {
    const composeEnhancers =
      // eslint-disable-next-line no-underscore-dangle
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(
      autoRehydrate({ log: true }),
      applyMiddleware(
        createActionBuffer(REHYDRATE),
        sagaMiddleware,
        logger,
      ),
    );
  } else {
    enhancer = compose(
      applyMiddleware(createActionBuffer(REHYDRATE), sagaMiddleware),
    );
  }
  const store = createStore(rootReducer, undefined, enhancer);
  sagaMiddleware.run(rootSaga);

  persistStore(store, {
    whitelist: [
      // 'searchHistory',
      // 'browsingHistory',
      // 'highlightTags',
      // 'muteTags',
      // 'muteUsers',
      'userCertificateInfo',
      'auth',
      'i18n',
    ],
    storage: AsyncStorage,
  });
  if (module.hot) {
    // module.hot.accept('../reducers', () => store.replaceReducer(rootReducer));
    module.hot.accept(module.hot.acceptCallback, () => store.replaceReducer(rootReducer));
  }

  return store;
}
