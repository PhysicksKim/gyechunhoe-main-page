import React from 'react';
import { createRoot } from 'react-dom/client';
import Application from './components/Application';
import { Provider } from 'react-redux';
import { store } from './redux/Store';

// Application to Render
const app = (
  <Provider store={store}>
    <Application />
  </Provider>
);

// Render application in DOM
createRoot(document.getElementById('app')).render(app);
