import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles.css';

// Send logs to parent frame (like a preview system)
function postToParent(level: string, ...args: any[]): void {
  if (window.parent !== window) {
    window.parent.postMessage(
      {
        type: 'iframe-console',
        level,
        args,
      },
      '*'
    );
  }
}

// Global error handler
window.onerror = function (message, source, lineno, colno, error) {
  const errPayload = {
    message,
    source,
    lineno,
    colno,
    stack: error?.stack,
  };
  postToParent('error', '[Meku_Error_Caught]', errPayload);
};

// Unhandled promise rejection
window.onunhandledrejection = function (event) {
  postToParent('error', '[Meku_Error_Caught]', { reason: event.reason });
};

// Patch console
(['log', 'warn', 'info', 'error'] as const).forEach((level) => {
  const original = console[level];
  console[level] = (...args: any[]) => {
    postToParent(level, ...args);
    original(...args);
  };
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);