import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../common/store/configureStore';
import App from './App';
import { LocalizationProvider } from '../../components/Localization';
import i18n from "../../common/helpers/i18n";

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <LocalizationProvider i18n={i18n} >
      <App />
    </LocalizationProvider>
  </Provider>
);

export default Root;