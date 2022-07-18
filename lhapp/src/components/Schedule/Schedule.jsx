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
                    <AppointmentTab/>
                </div>
                <div className="second-row">
                    <AppointmentInformation/>
                </div>
            </section>
        </div>
    )
}

export function AppointmentTab(){
    return(
        <div className="schedule-block">
            <div className="schedule-container">
                <div className="logo-container">
                    <img src="" alt="Medicine Logo" />
                </div>
                <div>
                    <p>Appointment name</p>
                    <h3>November 28th, 2022, <span>at</span> 11:28 a.m.</h3>
                    <h3><span>Address:</span> Hacker Way 1, Menlo Park</h3>
                </div>
            </div>
        </div>
    )
}

export function AppointmentInformation(){
    return(
        <div className="schedule-info">
            <h2>Appointment Selected</h2>
            <div className="schedule-block">
                <div className="schedule-content">
                    <div>
                        <h3>Date:</h3>
                        <p>November 28th, 2022, <span>at</span> 11:28 a.m.</p>
                    </div>
                    <div>
                        <h3>Address:</h3>
                        <p>Hacker Way 1, Menlo Park</p>
                    </div>
                    <div className="map-section">

                    </div>
                </div>
            </div>
        </div>
    )
}

export function MedicineTab(){
    return(
        <div className="schedule-block">
            <div className="schedule-container">
                <div className="logo-container">
                    <img src="" alt="Medicine Logo" />
                </div>
                <div>
                    <p>Medicine name</p>
                    <h3><span>Take:</span> 1 Tab(s)<span>, Each</span> 1 hour(s) <span>, For</span> 10 days</h3>
                    <h3><span>Ends:</span> January 17th, 2023 <span>at:</span> 11:28 p.m.</h3>
                </div>
            </div>
        </div>
    )
}

export function MedicineInformation(){
    return(
        <div className="schedule-info">
            <h2>Medicine Selected</h2>
            <div className="schedule-block">
                <div className="schedule-content">
                    <div>
                        <h3>Started Date:</h3>
                        <p>November 28th, 2022, <span>at</span> 11:28 a.m.</p>
                    </div>
                    <div>
                        <h3>End Date:</h3>
                        <p>January 28th, 2023, <span>at</span> 11:28 p.m.</p>
                    </div>
                    <div>
                        <h3>Prescription:</h3>
                        <p>Prescription...</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
