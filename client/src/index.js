import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import './styles/globalStyles.scss'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ClothesContextProvider } from './context/clothes-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ClothesContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClothesContextProvider>
);
