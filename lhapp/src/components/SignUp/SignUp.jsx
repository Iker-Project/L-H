import * as React from "react"
import axios from "axios"
import { Link } from "react-router-dom";
import "./SignUp.css"
import * as config from '../../config'
import PasswordMeter from './PasswordMeter'
import PopUp from "../PopUp/PopUp"

export default function SignUp({ handleLogin }){
    const [popUp, updatePopUp] = React.useState(false)

    const [fullname, updatefullName] = React.useState("")
    const email = React.createRef();

    const password = React.createRef();
    const [validPassword, updateValidPassword] = React.useState(false);

    const birthdate = React.createRef();
    const [sex, updateSex] = React.useState("Sex:")

    const handleSubmit = event => {
        event.preventDefault();

        if (validPassword){
            const register = async () => {
                try {
                    const [year, month, day] = birthdate.current.value.split('-');
                    const date = new Date(+year, +month - 1, +day);

                    const res = await axios.post(`http://localhost:3001/register`, {
                        "username" : fullname,
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
        else {
            updatePopUp(true)
        }
    }

    return (
        <div className="signup">
            <div className="block">
                <div className="container">
                    <h2>Sign Up</h2>
                    <h3>Account Information:</h3>
                    <form action="" className="signup-form" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Full Name" value={fullname} onChange={(e) => updatefullName(e.target.value)}/>
                        <input type="email" placeholder="Email" ref={email}/>
                        <PasswordMeter password={password}/>
                        <div>
                            <input type="date" ref={birthdate}/>
                            <InputOption sex={sex} updateSex={updateSex}/>
                        </div>
                        <button type="submit">Next</button>
                    </form>
                </div>
            </div>
            {popUp ? <PopUp title={"Plase use another password"} description={"Your password is not strong enough, remember to use at least one special character, number and a Uppercase letter."} closeFunc={updatePopUp}/> : ""}
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
