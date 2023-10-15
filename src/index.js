import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { initializeApp } from "firebase/app";
import App from "./App";

const firebaseConfig = {
  apiKey: "AIzaSyC59Yo_yDtEZVE9cSpRoin5GV9wNkNZqkM",
  authDomain: "fighter-suplementos.firebaseapp.com",
  projectId: "fighter-suplementos",
  storageBucket: "fighter-suplementos.appspot.com",
  messagingSenderId: "118312733678",
  appId: "1:118312733678:web:cd5a55eed936608623dcff"
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
