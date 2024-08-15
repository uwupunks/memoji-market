import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'assets/clear.css';
import 'assets/font.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

serviceWorker.unregister();

if (module.hot && !window.frameElement) {
  console.log('HMR enabled');
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    const root2 = ReactDOM.createRoot(document.getElementById('root'));
    root2.render(<NextApp />);
  });
}
