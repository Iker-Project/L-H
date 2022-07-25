import * as React from "react"
import axios from "axios"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Welcome.css"

export default function Welcome({isLoggedIn, handleLogin}) {
    const navigate = useNavigate()

    const email = React.createRef();
    const password = React.createRef();

  React.useEffect(() => {
    if (isLoggedIn){
      navigate("../Home", { replace: true })
    }
  }, [])

    const handleSubmit = event => {
        event.preventDefault();

        const login = async () => {
            try {
                const res = await axios.post(`http://localhost:3001/login`, {
                    "email" : email.current.value,
                    "password" : password.current.value
                })

                handleLogin(res.data.user)
                navigate("../Home/1", { replace: true })
            } catch (err) {
                alert(err)

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
