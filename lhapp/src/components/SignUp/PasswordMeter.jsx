import React from 'react'
import "./PasswordMeter.css"
import PopUp from "../PopUp/PopUp"

export default function PasswordMeter({password}) {
    const [lightStatus, updateLightStates] = React.useState("red")
    const [popUp, updatePopUp] = React.useState(false)
    const [points, updatePoints] = React.useState([false, false, false])

    function PasswordMeter(){
        var points = [false, false, false]
        var counter = 0
        let passwordValue = password.current.value;
        let specialChars = "@#%-_!?$=+*1234567890"

        if (passwordValue.length >= 8){ points[0] = true; counter++ } else { points[0] = false }

        for (let i = 0; i < specialChars.length; i++){
            if (passwordValue.includes(specialChars[i])){ points[1] = true; counter++ }
        }

        for (let i = 0; i < passwordValue.length; i++){
            if (passwordValue.charAt(i) == passwordValue.charAt(i).toUpperCase() && passwordValue !== ""){ points[2] = true; counter++ }
        }

        updatePoints(points)

        if (counter >= 3 && counter < 8 && points.every(Boolean)){
            updateLightStates("yellow")
        }
        else if (counter >= 8){
            updateLightStates("green")
        }
        else{
            updateLightStates("red")
        }
    }

    return (
        <div className="password-meter">
            <input className="password-input" type="password" placeholder="Password" ref={password} onChange={PasswordMeter}/>
            <div onClick={() => updatePopUp(true)} className={`password-light ${lightStatus}`}></div>
            {/* {popUp
            ? <PopUp title={"Password Requirements"} description={<PopUpDescription points={points}/>} closeFunc={updatePopUp} />
            : "" } */}
        </div>
    )
}

// export function PopUpDescription({points}){
//     return(
//         <div className="password-description">
//             <ul>
//                 <li><span>{points[0] ? "" : "X"}</span> Use more than 8 characters</li>
//                 <li><span>{points[1] ? "" : "X"}</span> Include at least a number or symbol (@#%-_!?$=+*)</li>
//                 <li><span>{points[2] ? "" : "X"}</span> Includes at least Uppercase letter</li>
//             </ul>
//         </div>
//     )
// }
