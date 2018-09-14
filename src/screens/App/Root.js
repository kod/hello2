import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from '../../common/store/configureStore';
import App from './App';
import { LocalizationProvider } from '../../components/Localization';
import Loader from '../../components/Loader';
import i18n from '../../common/helpers/i18n';

const { store, persistor } = configureStore();

const Root = () => (
  <Provider store={store}>
    <LocalizationProvider i18n={i18n}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <App />
      </PersistGate>
    </LocalizationProvider>
  </Provider>
);

export default Root;
