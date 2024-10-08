import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BookContextProvider from './Context/BookContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BookContextProvider>
    <App/>
  </BookContextProvider>
);