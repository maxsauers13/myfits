import React, { useState } from 'react'
import Axios from 'axios'
import Card from '../card/card'

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
        <div className="wrapper">
            <Card>
                <div className="title">
                    Login
                </div>
                <label>Username</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                />
                <br></br>
                <label>Password</label>
                <input
                    type="password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                <br></br>
                <button onClick={login}>Login</button>
                <div className="title">
                    Register
                </div>
                <label>Username</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setUsernameRegister(e.target.value)
                    }}
                />
                <br></br>
                <label>Password</label>
                <input
                    type="password"
                    onChange={(e) => {
                        setPasswordRegister(e.target.value)
                    }}
                />
                <br></br>
                <button onClick={register}>Register</button>
            </Card>
        </div>
    )
}