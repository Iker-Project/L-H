import React from 'react'
import "./Slider.css"

export default function Slider() {
    return (
        <div className="slider-view">
            <div>
                <input type="checkbox" className="slider-input"/>
            </div>
            <div>
                <img src="../../../img/listIcon.png" alt="list icon" />
                <img src="../../../img/gridIcon.png" alt="grid icon" />
            </div>
        </div>
    )
}
