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
                <span></span>
                <div className="second-row">
                    {/* <IllnessInformation/> */}
                    <AddIllness/>
                </div>
            </section>
        </div>
    )
}

export function IllnessContainer(){
    return(
        <div className="illness-block">
            <div className="illness-container">
                <div>
                    <p>Illness name</p>
                    <div className="illness-light"></div>
                </div>
                <h3>Date</h3>
            </div>
        </div>
    )
}

export function IllnessInformation(){
    return(
        <div className="illness-info">
            <h2>Illness Selected</h2>
            <div className="illness-block">
                <div className="illness-content">
                    <div>
                        <h3>Date:</h3>
                        <p>11/28/2003</p>
                    </div>
                    <div>
                        <h3>Description:</h3>
                        <p>Description...</p>
                    </div>
                    <div>
                        <h3>Attended:</h3>
                        <div className="illness-light"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function AddIllness(){
    return(
        <div className="add-illness">
            <h2>Add Illness</h2>
            <div className="illness-block">
                <div className="addIllness-container">
                    <form action="" className="addIllness-form">
                        <input type="text" placeholder="Illness name"/>
                        <textarea name="" placeholder="Illness description..." id="" cols="30" rows="10"></textarea>
                        <button type="submit" className="classic-button">Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
