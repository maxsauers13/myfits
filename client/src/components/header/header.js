import React from 'react'
import './headerStyles.scss'
import { Outlet, Link } from 'react-router-dom'
import logo from '../../img/logo.png'

export default function Header() {
    return (
        <div>
            <header className="header">
                <img className="header-logo" src={logo} alt="MyFits"></img>
                <nav>
                    <ul>
                        <li>
                            <Link className="header-link" to="/home">Home</Link>
                        </li>
                        <li>
                            <Link className="header-link" to="/closet">Closet</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <Outlet />
        </div>
    )
}