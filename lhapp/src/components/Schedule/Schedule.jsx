import React from 'react'
import "./Schedule.css"
import Dropdown from "../Inputs/Dropdown"

export default function Schedule() {
    const optionsData = ["Appointments", "Medicine"]
    const [optionSelected, updateOpcionSelected] = React.useState(optionsData[0])

    return (
        <div className="schedile-view">
            <div className="title">
                <div className="title-logo">
                    <img src="../../../img/scheduleIcon.png" alt="Schedule" />
                </div>
                <h1>Schedule</h1>
            </div>

            <section className="rows">
                <div className="first-row">
                    <Dropdown data={optionsData} updateData={updateOpcionSelected}/>
                    <button className="classic-button">Tap to add an appointment</button>
                </div>
                <div className="second-row">
                </div>
            </section>
        </div>
    )
}
