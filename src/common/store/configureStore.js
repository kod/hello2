import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import invariant from 'redux-immutable-state-invariant';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import getStoredStateMigrateV4 from 'redux-persist/lib/integration/getStoredStateMigrateV4';
import applyAppStateListener from 'redux-enhancer-react-native-appstate';
import FileSystemStorage from 'redux-persist-filesystem-storage';
import { AsyncStorage } from 'react-native';
import logger from 'redux-logger';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
import getStoredStateMigrateToFileSystemStorage from './getStoredStateMigrateToFileSystemStorage';

const myTransform = createTransform(
  (inboundState, key /* state */) => {
    switch (key) {
      // case 'browsingHistoryNovels': {
      //   const { entities, browsingHistoryNovels } = state;
      //   return {
      //     ...inboundState,
      //     items: browsingHistoryNovels.items.filter(
      //       id =>
      //         entities.novels[id] &&
      //         entities.novels[id].user &&
      //         entities.users[entities.novels[id].user],
      //     ),
      //   };
      // }
      default:
        return inboundState;
    }
  },
  outboundState => outboundState,
  {
    whitelist: [
      'entities',
      'login',
      'binddata',
      'appAction',
      'i18n',
      // 'muteUsers',
    ],
  },
);

const clearV4PersistedContents = () =>
  AsyncStorage.getAllKeys((err, keys) => {
    if (!err && keys && keys.length) {
      const keyPrefix = 'reduxPersist:';
      const v4PersistKeys = keys.filter(key => key.indexOf(keyPrefix) === 0);
      if (v4PersistKeys.length) {
        AsyncStorage.multiRemove(v4PersistKeys, () => Promise.resolve());
      }
      return Promise.resolve();
    }
    return Promise.resolve();
  });

export default function configureStore() {
  let enhancer;
  const sagaMiddleware = createSagaMiddleware();
  if (process.env.NODE_ENV !== 'production') {
    const composeEnhancers =
      // eslint-disable-next-line no-underscore-dangle
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(
      applyAppStateListener(),
      applyMiddleware(invariant(), sagaMiddleware, logger),
      // devTools(),
    );
  } else {
    enhancer = compose(
      applyAppStateListener(),
      applyMiddleware(sagaMiddleware),
    );
  }

  const v4Config = {
    whitelist: [
      'entities',
      'userCertificateInfo',
      'auth',
      'i18n',
      // 'browsingHistoryNovels',
    ],
    storage: AsyncStorage,
    transforms: [myTransform],
  };

  const v5Config = {
    key: 'root',
    stateReconciler: autoMergeLevel2,
    whitelist: [
      'entities',
      'userCertificateInfo',
      'auth',
      'i18n',
      // 'i18n',
    ],
    storage: AsyncStorage,
    transforms: [myTransform],
    getStoredState: getStoredStateMigrateV4(v4Config),
  };

  const persistConfig = {
    key: 'root',
    stateReconciler: autoMergeLevel2,
    whitelist: [
      'entities',
      'userCertificateInfo',
      'auth',
      'i18n',
      // 'browsingHistoryNovels',
    ],
    storage: FileSystemStorage,
    transforms: [myTransform],
    // getStoredState: getStoredStateMigrateV4(v4Config),
    getStoredState: getStoredStateMigrateToFileSystemStorage(
      v5Config,
      v4Config,
    ),
    debug: process.env.NODE_ENV !== 'production',
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(persistedReducer, undefined, enhancer);
  sagaMiddleware.run(rootSaga);

  const persistor = persistStore(store, undefined, clearV4PersistedContents);
  if (module.hot) {
    // eslint-disable-next-line global-require
    const nextRootReducer = require('../reducers');
    module.hot.accept(() => {
      store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
    });
  }

  return { store, persistor };
}
