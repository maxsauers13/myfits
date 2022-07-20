import React, { useState } from 'react'
import Axios from 'axios'
import Card from '../card/card'
import logo from '../../img/logo.png'
import './loginStyles.scss'

export default function Login() {
    const [usernameRegister, setUsernameRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const register = () => {
        Axios.post('http://localhost:3001/register', {
            username: usernameRegister,
            password: passwordRegister
        }).then((response) => {
            console.log(response)
        })
    }

    const login = () => {
        Axios.post('http://localhost:3001/login', {
            username: username,
            password: password
        }).then((response) => {
            if (response.data.message) {
                console.log(response.data.message)
            } else {
                localStorage.setItem("token", response.data[0].username)
                window.location.replace("/home")
            }
        })
    }

    return (
        <div>
            <header className="header">
                <img className="header-logo" src={logo} alt="MyFits"></img>
            </header>
            <div className="wrapper">
                <div>
                    <Card>
                        <div className="title">
                            Login
                    </div>
                        <div className="form">
                            <div className="login-input">
                                <label>Username: </label>
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        setUsername(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="login-input">
                                <label>Password: </label>
                                <input
                                    type="password"
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                />
                            </div>
                            <button className="button" onClick={login}>Login</button>
                        </div>
                    </Card>
                    <Card>
                        <div className="title">
                            Register
                    </div>
                        <div className="form">
                            <div className="login-input">
                                <label>Username: </label>
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        setUsernameRegister(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="login-input">
                                <label>Password: </label>
                                <input
                                    type="password"
                                    onChange={(e) => {
                                        setPasswordRegister(e.target.value)
                                    }}
                                />
                            </div>
                            <button className="button" onClick={register}>Register</button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}