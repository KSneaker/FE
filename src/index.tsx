import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/styles.css';
import App from './App';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import vn from "antd/locale/vi_VN";
import { ConfigProvider } from 'antd';
import { PersistGate } from 'redux-persist/integration/react';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider locale={vn}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
