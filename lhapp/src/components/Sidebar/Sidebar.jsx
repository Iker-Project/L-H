import React from 'react'
import { useState } from 'react'
import "./Sidebar.css"

export default function Sidebar() {
    const [openMenu, updateMenu] = useState(false)

    return (
        <div className="sidebar">
            <div className="menubtn_cont">
                <input type="checkbox" id="menu_toggle" />
                <label className="menu_btn" htmlFor="menu_toggle">
                    <span></span>
                </label>
            </div>

            <ul className={`menu ${openMenu ? "" : "active"}`}>
                <li><div className="homeIcon"><img src="../../../img/profileIcon.png" alt="H" /></div><span>Home</span></li>
                <li><div className="mhIcon"><img src="../../../img/mhIcon.png" alt="H" /></div><span>Medical History</span></li>
                <li><div className="scheduleIcon"><img src="../../../img/scheduleIcon.png" alt="H" /></div><span>Schedule</span></li>
                <li><div className="faIcon"><img src="../../../img/faIcon.png" alt="H" /></div><span>First Aids</span></li>
                <li><div className="mcIcon"><img src="../../../img/mcIcon.png" alt="H" /></div><span>Medical Cards</span></li>
            </ul>
        </div>
    )
}
