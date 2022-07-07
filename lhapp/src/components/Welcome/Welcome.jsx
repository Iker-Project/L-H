import * as React from "react"
import axios from "axios"
import { Link } from "react-router-dom";
import "./Welcome.css"

export default function Welcome({handleLogin}) {
    const email = React.createRef();
    const password = React.createRef();

    const handleSubmit = event => {
        event.preventDefault();

        const login = async () => {
            try {
                console.log("Logging in")
                const res = await axios.post(`http://localhost:3001/login`, {
                    "email" : email.current.value,
                    "password" : password.current.value
                    })
                handleLogin(res.data.user)
                window.location.href='http://localhost:3000/Home';
            } catch (err) {
                alert(err)
                console.log(err)
            }
        }
        login()
    }

    return (
        <div className="welcome">
            <div className="block">
                <div className="container">
                    <h1>Welcome!</h1>
                    <img src="../../../img/AppIcon.png" alt="Home" className="logoWelcome"/>
                    <form action="" className="user-login" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Email" ref={email}/>
                        <input type="password" placeholder="Password" ref={password}/>
                        <button type="submit">Log in</button>
                    </form>
                    <span className="signUp-link">New user? <Link to="/SignUp">Create an account</Link></span>
                </div>
            </div>
        </div>
    )
}
