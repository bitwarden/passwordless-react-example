import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import {AuthProvider} from "./context/AuthProvider";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
    document.getElementById('root')
);
root.render(
  <React.StrictMode>
      <AuthProvider>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();