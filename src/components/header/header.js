import React from 'react'
import './headerStyles.scss'
import { Outlet, Link } from 'react-router-dom'

export default function Header() {
    return (
        <div>
            <header className="header-root">
                <div className="header-logo">
                    MyFits
            </div>

                <div className="header-right">
                    <Link className="header-button" to="/home">Home</Link>
                    <Link className="header-button" to="/profile">Profile</Link>
                </div>
            </header>
            <Outlet />
        </div>
    )
}