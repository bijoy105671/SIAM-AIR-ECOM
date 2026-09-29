// Ensure window.fetch is safely assignable in sandboxed/iframe preview environments
try {
  if (typeof window !== 'undefined') {
    const origFetch = window.fetch ? window.fetch.bind(window) : undefined;
    let currentFetch = origFetch;
    const winDesc = Object.getOwnPropertyDescriptor(window, 'fetch');
    if (!winDesc || (winDesc.get && !winDesc.set)) {
      if (!winDesc || winDesc.configurable) {
        Object.defineProperty(window, 'fetch', {
          get: () => currentFetch,
          set: (fn) => { currentFetch = fn; },
          configurable: true,
          enumerable: true
        });
      }
    }
  }
} catch (_) {}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
