import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';

import './bootstrap';
import '../css/app.css';

const root = document.getElementById('root');
if (!root) throw new Error('No root element found');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
