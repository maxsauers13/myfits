import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import './styles/globalStyles.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/header'
import Home from './components/home/home'
import Closet from './components/closet/closet'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="home" element={<Home />} />
        <Route path="closet" element={<Closet />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
