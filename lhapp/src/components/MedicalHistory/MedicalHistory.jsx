import React from 'react'
import "./MedicalHistory.css"
import Dropdown from "../Inputs/Dropdown"

export default function MedicalHistory() {
    const [optionSelected, updateOpcionSelected] = React.useState("Illness")
    const optionsData = ["Illnes", "Appointments", "Medicine"]

    return (
        <div className="medical-history">
            <div className="title">
                <div className="title-logo">
                    <img src="../../../img/mhIcon.png" alt="Medical History" />
                </div>
                <h1>Medical History</h1>
            </div>

            <section className="rows">
                <div className="first-row">
                    <Dropdown data={optionsData} updateData={updateOpcionSelected}/>
                    <button className="classic-button">Tap to add an illness</button>
                    <IllnessContainer/>
                </div>
                <div className="second-row">
                    <h2>{optionSelected}</h2>
                </div>
            </section>
        </div>
    )
}

export function IllnessContainer(){
    return(
        <div className="illness-container">
            <div>
                <p>Illness name</p>
                <div className="illness-light"></div>
            </div>
            <h3>Date</h3>
        </div>
    )
}
