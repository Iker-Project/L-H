import React from 'react'
import { useState } from 'react'
import "./Sidebar.css"
import AlertWindow from '../PopUp/AlertWindow'

export default function Sidebar({handleLogout}) {
    const [openMenu, updateMenu] = useState(false)
    const [showAlert, updateShowAlert] = useState(false)
    const [opcSelected, updateOption] = useState(1)

    function handlerShowAlert(){
        updateShowAlert(true);
    }

    return (
        <div className={`sidebar ${openMenu ? "active" : ""}`}>
            <button onClick={() => updateMenu(!openMenu)} className={`menu_btn ${openMenu ? "active" : ""}`}>
                <span></span>
            </button>

            <ul className="menu">
                <li onClick={() => updateOption(1)}><div className={`homeIcon ${opcSelected === 1 ? "active" : ""}`}><img src="../../../img/profileIcon.png" alt="Home" /></div><span>Home</span></li>
                <li onClick={() => updateOption(2)}><div className={`mhIcon ${opcSelected === 2 ? "active" : ""}`}><img src="../../../img/mhIcon.png" alt="Medical history" /></div><span>Medical History</span></li>
                <li onClick={() => updateOption(3)}><div className={`scheduleIcon ${opcSelected === 3 ? "active" : ""}`}><img src="../../../img/scheduleIcon.png" alt="schedule" /></div><span>Schedule</span></li>
                <li onClick={() => updateOption(4)}><div className={`faIcon ${opcSelected === 4 ? "active" : ""}`}><img src="../../../img/faIcon.png" alt="first aids" /></div><span>First Aids</span></li>
                <li onClick={() => updateOption(5)}><div className={`mcIcon ${opcSelected === 5 ? "active" : ""}`}><img src="../../../img/mcIcon.png" alt="Medical cards" /></div><span>Medical Cards</span></li>
                <li onClick={handlerShowAlert}><div className={`loIcon ${opcSelected === 5 ? "active" : ""}`}><img src="../../../img/LogoutIcon.png" alt="Log out" /></div><span>Log Out</span></li>
            </ul>
            {showAlert ? <AlertWindow title={"You are Logging Out..."} cancelFunc={() => {updateShowAlert(false)}} acceptFunc={handleLogout}/> : ""}
        </div>
    )
}
