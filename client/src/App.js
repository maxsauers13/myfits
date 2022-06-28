import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/header/header'
import Home from './components/home/home'
import Closet from './components/closet/closet'
import Login from './components/login/login'

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Header />}>
                <Route path="home" element={<Home />} />
                <Route path="closet" element={<Closet />} />
                <Route path="login" element={<Login />} />
            </Route>
        </Routes>
    )
}