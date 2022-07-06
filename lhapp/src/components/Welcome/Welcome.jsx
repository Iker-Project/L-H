import * as React from "react"
import axios from "axios"
import { Link } from "react-router-dom";
import PasswordStrengthBar from 'react-password-strength-bar';
import "./Welcome.css"

export default function Welcome() {
    return (
        <div className="welcome">
            <div className="block">
                <div className="container">
                    <h1>Welcome!</h1>
                    <img src="../../../img/AppIcon.png" alt="Home" className="logoWelcome"/>
                    <form action="" className="user-login">
                        <input type="text" placeholder="Email"/>
                        <input type="text" placeholder="Password"/>
                        <Link to="/Home"><button>Log in</button></Link>
                    </form>
                    <span className="signUp-link">New user? <Link to="/SignUp">Create an account</Link></span>
                </div>
            </div>
        </div>
    )
}
