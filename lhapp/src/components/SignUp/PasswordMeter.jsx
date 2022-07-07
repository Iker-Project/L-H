import React from 'react'
import "./PasswordMeter.css"

export default function PasswordMeter({password}) {

    function PasswordMeter(){
        const points = [false, false, false, false, false]
        let specialChars = "-_!?$=+.,:;"

        if (password.current.value.length >= 8){ points[0] = true } else { points[0] = false }

        // for (let i = 0; i < specialChars.length; i++){
        //     if (password.current.value.includes(specialChars[i])){ points[1] = true }
        // }

        if (password.length >= 8){ points[0] = true } else { points[0] = false }
        if (password.length >= 8){ points[0] = true } else { points[0] = false }
        if (password.length >= 8){ points[0] = true } else { points[0] = false }

        console.log(points)
    }

    return (
        <div className="password-meter">
            <input className="password-input" type="password" placeholder="Password" ref={password} onChange={PasswordMeter}/>
            <div className="password-light"></div>
        </div>
    )
}
