import React from 'react'

export default function Login() {
    return (
        <div className="wrapper">
            <div className="title">
                Login
            </div>
            <form>
                <label>Username</label>
                <input type="text"></input><br></br>
                <label>Password</label>
                <input type="text"></input><br></br>
            </form>
        </div>
    )
}