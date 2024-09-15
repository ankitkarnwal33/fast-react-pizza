import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.jsx';

const rootElemnt = document.getElementById('root');
if (rootElemnt) {
  ReactDOM.createRoot(rootElemnt).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  );
}
