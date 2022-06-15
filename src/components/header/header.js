import React from 'react'
import './headerStyles.scss'

export default function Header() {
    return (
        <header className="header-root">
            <div className="header-logo">
                MyFits
            </div>

            <div className="header-right">
                <button className="header-button" to="/">Home</button>
                <button className="header-button" to="/profile">Profile</button>
            </div>
        </header>
    )
}