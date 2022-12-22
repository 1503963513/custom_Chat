import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import './utils/request'
import { HashRouter as Router } from 'react-router-dom'

import {store, persistor} from './store'
import { Provider } from 'react-redux'
import {PersistGate} from 'redux-persist/lib/integration/react';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={Router}>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
);

