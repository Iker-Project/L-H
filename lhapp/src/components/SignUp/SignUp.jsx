import * as React from "react"
import axios from "axios"
import { Link } from "react-router-dom";
import "./SignUp.css"
import * as config from '../../config'
import PasswordMeter from './PasswordMeter'
import PopUp from "../PopUp/PopUp"
import Dropdown from "../Inputs/Dropdown"

export default function SignUp({ handleLogin }){
    const [popUp, updatePopUp] = React.useState(false)

    const [fullname, updatefullName] = React.useState("")
    const [email, updateEmail] = React.useState("");

    const [password, updatePassword] = React.useState("");
    const [validPassword, updateValidPassword] = React.useState(false);

    const [birthday, updateBirthday] = React.useState("");
    const [sex, updateSex] = React.useState("Sex:")
    const sexData = ["Male", "Female", "Other"]

    const onChangeDate = (e) => {
        const newDate = e.target.value;
        const [year, month, day] = newDate.split('-');
        const date = new Date(+year, +month - 1, +day);
        updateBirthday(date.toLocaleDateString('en-US'));
      };

    const handleSubmit = React.useCallback( async (event) => {
        event.preventDefault();

        if (validPassword){
            try {
                const res = await axios.post(`${config.API_BASE_URL}/register`, {
                    "username" : fullname,
                    "email" : email,
                    "password" : password,
                    "birthdate" : birthday,
                    "sex" : sex
                })

                await axios.post(`${config.API_BASE_URL}/createData`, {
                    "userID": res.data.user["objectId"],
                    "homeData": {
                        "weight": 0,
                        "height": 0,
                        "allergies": [],
                        "pulse": 0,
                        "heartRate": 0,
                        "temperature": 0,
                        "pressure": 0,
                        "glucose": 0
                    },
                    "medicalHistoryData": {
                        "illnesses": [],
                        "appointments": [],
                        "medicine": []
                    },
                    "scheduleData": {
                        "appointments": [],
                        "medicine": []
                    },
                    "medicalCardsData": []
                })

                handleLogin(res.data.user)
                window.location.href='http://localhost:3000/Home/1';
            } catch (err) {
                alert(err)

            }
        }
        else {
            updatePopUp(true)
        }
    }, [fullname, email, password, validPassword, birthday, sex])

    return (
        <div className="signup">
            <div className="block">
                <div className="container">
                    <h2>Sign Up</h2>
                    <h3>Account Information:</h3>
                    <form action="" className="signup-form" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Full Name" value={fullname} onChange={(e) => updatefullName(e.target.value)}/>
                        <input type="email" placeholder="Email" onChange={(e) => updateEmail(e.target.value)}/>
                        <PasswordMeter password={password} updatePassword={updatePassword} updateValidPassword={updateValidPassword}/>
                        <div>
                            <input type="date" onChange={(e) => onChangeDate(e)}/>
                            <div className="dropdown-container">
                                <Dropdown data={sexData} updateData={updateSex}/>
                            </div>
                        </div>
                        <button type="submit">Next</button>
                    </form>
                </div>
            </div>
            {popUp ? <PopUp title={"Plase use another password"} description={"Your password is not strong enough, remember to use at least one special character, number and a Uppercase letter."} closeFunc={updatePopUp}/> : ""}
        </div>
    )
}
