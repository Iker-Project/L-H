import * as React from "react"
import axios from "axios"
import { Link } from "react-router-dom";
import "./SignUp.css"
import * as config from '../../config'

export default function SignUp({ handleLogin }){
    const fullname = React.createRef();
    const email = React.createRef();
    const password = React.createRef();
    const birthdate = React.createRef();

    const [sex, updateSex] = React.useState("Sex:")

    const handleSubmit = event => {
        event.preventDefault();

        const register = async () => {
            try {
                const [year, month, day] = birthdate.current.value.split('-');
                const date = new Date(+year, +month - 1, +day);

                const res = await axios.post(`http://localhost:3001/register`, {
                    "username" : fullname.current.value,
                    "email" : email.current.value,
                    "password" : password.current.value,
                    "birthdate" : date.toLocaleDateString('en-US'),
                    "sex" : sex
                    })

                handleLogin(res.data.user)
            } catch (err) {
                alert(err)

            }
        }
        register()
    }

    return (
        <div className="signup">
            <div className="block">
                <div className="container">
                    <h2>Sign Up</h2>
                    <h3>Account Information:</h3>
                    <form action="" className="signup-form" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Full Name" ref={fullname}/>
                        <input type="email" placeholder="Email" ref={email}/>
                        <input type="password" placeholder="Password" ref={password}/>
                        <div>
                            <input type="date" ref={birthdate}/>
                            <InputOption sex={sex} updateSex={updateSex}/>
                        </div>
                        <button type="submit">Next</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export function InputOption({sex, updateSex}){
    const [openMenu, openMenuFunc] = React.useState(false)
    function handleDrowdown(){
        openMenuFunc(!openMenu)
    }

    function handleCategory(category){
        openMenuFunc(!openMenu)
        updateSex(category)
    }

    return(
        <div className="input">
            <div className="dropdown-button" role="button" onClick={handleDrowdown}>
                <img src="../../../img/arrow_black.png" alt="V" className={`arrowMenu ${openMenu ? "active" : ""}`}/>
                <span>{sex}</span>
            </div>
            <DropdownMenu openMenu={openMenu} updateSex={handleCategory}/>
        </div>
    )
}

export function DropdownMenu({openMenu, updateSex}){
    const listClass = openMenu ? "active" : ""

    return(
        <ul className={`dropdown-menu ${listClass}`}>
            <li onClick={() => updateSex("Male")}>Male</li>
            <li onClick={() => updateSex("Female")}>Female</li>
        </ul>
    )
}
