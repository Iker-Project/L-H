import React from 'react'
import "./Sidebar.css"

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="menubtn_cont">
                <input type="checkbox" id="menu_toggle" />
                <label className="menu_btn" htmlFor="menu_toggle">
                    <span></span>
                </label>
            </div>

            <ul className="menu">
                <li><img src="" alt="H" /><span>Home</span></li>
                <li><img src="" alt="MH" /><span>Medical History</span></li>
                <li><img src="" alt="S" /><span>Schedule</span></li>
                <li><img src="" alt="FA" /><span>First Aids</span></li>
                <li><img src="" alt="MC" /><span>Medical Cards</span></li>
            </ul>
        </div>
    )
}
