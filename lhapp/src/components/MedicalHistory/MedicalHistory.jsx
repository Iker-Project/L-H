import React from 'react'
import "./MedicalHistory.css"
import Dropdown from "../Inputs/Dropdown"
import * as config from "../../config"
import axios from "axios"
import { AppointmentInformation, AppointmentTab, MedicineInformation, MedicineTab } from '../Schedule/Schedule'

export default function MedicalHistory({data, setData}) {
    const optionsData = ["Illnesses", "Appointments", "Medicine"]
    const [optionSelected, updateOpcionSelected] = React.useState(optionsData[0])

    const [addingIllness, updateAddingIllness] = React.useState(false)
    const [illnessSelected, updateIllnessSelected] = React.useState(null)
    const [appointmentSelected, updateAppointmentSelected] = React.useState(null)
    const [medicineSelected, updateMedicineSelected] = React.useState(null)

    var dataCopy = data

    const saveInfo = () =>{
        console.log('dataCopy: ', dataCopy);
        setData(dataCopy)
        axios.post(`${config.API_BASE_URL}/updateData`, dataCopy.userData)
        .then(res => {
            console.log(res);
        })
    }

    return (
        <div className="medical-history">
            <div className="title">
                <div className="title-logo">
                    <img src="../../../img/mhIcon.png" alt="Medical History"/>
                </div>
                <h1>Medical History</h1>
            </div>

            <section className="rows">
                <div className="first-row">
                    <Dropdown data={optionsData} updateData={updateOpcionSelected}/>
                    {
                        {
                            'Illnesses': <IllnessManager addingIllness={addingIllness} updateAddingIllness={updateAddingIllness} data={dataCopy.userData.medicalHistoryData.illnesses} updateIllnessSelected={updateIllnessSelected}/>,
                            'Appointments': dataCopy.userData.medicalHistoryData.appointments.length != 0 ?
                                <AppointmentTab /> :
                                <div className="fit-height"><h3>No appointments archived here.</h3></div>,
                            'Medicine':  dataCopy.userData.medicalHistoryData.medicine.length != 0 ?
                                <MedicineTab /> :
                                <div className="fit-height"><h3>No medicine archived here.</h3></div>
                        }[optionSelected]
                    }
                </div>
                <span></span>
                <div className="second-row">
                {
                    {
                        // 'Illnesses': ,
                        'Illnesses': addingIllness ?
                            <AddIllness data={dataCopy.userData.medicalHistoryData} setData={setData} saveInfo={saveInfo}/>
                            : illnessSelected ? <IllnessInformation data={illnessSelected}/> : <div className="fit-height"><h3>Select an Illness.</h3></div>,
                        'Appointments': appointmentSelected ? <AppointmentInformation /> : <div className="fit-height"><h3>Select an Appointment.</h3></div>,
                        'Medicine': medicineSelected ? <MedicineInformation /> : <div className="fit-height"><h3>Select a Medicine.</h3></div>
                    }[optionSelected]
                }
                </div>
            </section>
        </div>
    )
}

export function IllnessManager({addingIllness, updateAddingIllness, data, updateIllnessSelected}){
    return(
        <div style={{width: "100%", height: "auto"}}>
            <button className="classic-button" onClick={() => updateAddingIllness(!addingIllness)}>Tap to add an illness</button>
            {data.length != 0 ? data.map((illness) => {
                return <IllnessContainer key={illness.id} updateAddingIllness={updateAddingIllness} illness={illness} updateIllnessSelected={updateIllnessSelected}/>
            })
            : <div className="fit-height"><h3>No illnesses registered.</h3></div>}
        </div>
    )
}

export function IllnessContainer({updateAddingIllness, illness, updateIllnessSelected}){
    return(
        <div className="illness-block" onClick={() => {updateAddingIllness(false); updateIllnessSelected(illness)}}>
            <div className="illness-container">
                <div>
                    <p>{illness.name}</p>
                    <div className="illness-light"></div>
                </div>
                <h3>{illness.date}</h3>
            </div>
        </div>
    )
}

export function IllnessInformation({data}){
    return(
        <div className="illness-info">
            <h2>{data.name}</h2>
            <div className="illness-block">
                <div className="illness-content">
                    <div>
                        <h3>Date:</h3>
                        <p>{data.date}</p>
                    </div>
                    <div>
                        <h3>Description:</h3>
                        <p>{data.description}</p>
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

export function AddIllness({data, setData, saveInfo}){
    const [name, updateName] = React.useState("")
    const [date, updateDate] = React.useState("");
    const [description, updateDescription] = React.useState("")

    const saveIllness = (e) => {
        e.preventDefault()

        const illnessObj = {
            id: createID(),
            name: name,
            date: date,
            description: description
        }
        data.illnesses = [...data.illnesses, illnessObj]
        saveInfo()
    }

    const createID = () => {
        const newDate = date.split("-").join("")
        const newID = `${name.split(" ").join("")}${newDate.split(":").join("")}`
        return newID;
    }

    return(
        <div className="add-illness">
            <h2>Add Illness</h2>
            <div className="illness-block">
                <div className="addIllness-container">
                    <form action="" className="addIllness-form">
                        <input type="text" placeholder="Illness name" onChange={(e) => updateName(e.target.value)}/>
                        <input type="datetime-local" onChange={(e) => updateDate(e.target.value)}/>
                        <textarea name="" placeholder="Illness description..." id="" cols="30" rows="10" onChange={(e) => updateDescription(e.target.value)}></textarea>
                        <button onClick={(e) => saveIllness(e)} type="submit" className="classic-button">Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
