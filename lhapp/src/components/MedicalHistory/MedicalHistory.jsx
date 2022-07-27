import React from 'react'
import "./MedicalHistory.css"
import Dropdown from "../Inputs/Dropdown"
import * as config from "../../config"
import axios from "axios"
import { AppointmentInformation, AppointmentTab, MedicineInformation, MedicineTab } from '../Schedule/Schedule'

export default function MedicalHistory({data, setData}) {
    const [dataIllnesses, setIllnesses] = React.useState({})

    const optionsData = ["Illnesses", "Appointments", "Medicine"]
    const [optionSelected, updateOpcionSelected] = React.useState(optionsData[0])

    const [addingIllness, updateAddingIllness] = React.useState(false)
    const [deleteMode, updateDelteMode] = React.useState(false)
    const [illnessSelected, updateIllnessSelected] = React.useState(null)
    const [appointmentSelected, updateAppointmentSelected] = React.useState(null)
    const [medicineSelected, updateMedicineSelected] = React.useState(null)

    const handleDeleteButton = ( async (id) => {
        updateDelteMode(!deleteMode)
        updateIllnessSelected(null)

        if (id){
            axios.post(`${config.API_BASE_URL}/deleteIllnesses/${id}`)
            .then(res => {
                console.log(res);
            })
            let newDataList = dataIllnesses.filter(illness => illness.objectId != id);
            setIllnesses([...newDataList])
        }
    })

    const saveInfo = (illnessObj) =>{
        setIllnesses([...dataIllnesses, illnessObj])
        axios.post(`${config.API_BASE_URL}/illnesses`, dataIllnesses)
        .then(res => {
            console.log(res);
        })
    }

    React.useEffect(() => {
        const fetchUserData = (async () => {
            axios.get(`${config.API_BASE_URL}/app/${localStorage.getItem("current_user_id")}/illnesses`)
                .then(response => {
                    console.log('res.data: ', response.data);
                    setIllnesses(response.data)
                })
                .catch(error => {
                    console.error("Error fetching: ", error)
                })
          })()
    },[])

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
                            'Illnesses': <IllnessManager updateAddingIllness={updateAddingIllness} data={dataIllnesses} updateIllnessSelected={updateIllnessSelected} deleteMode={deleteMode} handleDeleteButton={handleDeleteButton}/>,
                            'Appointments': false ?
                                <AppointmentTab /> :
                                <div className="fit-height"><h3>No appointments archived here.</h3></div>,
                            'Medicine':  false ?
                                <MedicineTab /> :
                                <div className="fit-height"><h3>No medicine archived here.</h3></div>
                        }[optionSelected]
                    }
                </div>
                <span></span>
                <div className="second-row">
                {
                    {
                        'Illnesses': addingIllness ?
                            <AddIllness saveInfo={saveInfo}/>
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

export function IllnessManager({updateAddingIllness, data, updateIllnessSelected, deleteMode, handleDeleteButton}){

    return(
        <div style={{width: "100%", height: "auto"}}>
            <div className="addDelete-button">
                <button className="classic-button" onClick={() => updateAddingIllness(true)}>Tap to add an illness</button>
                <span></span>
                <button className={`delete-button ${deleteMode ? "active" : ""}`} onClick={() => handleDeleteButton()}></button>
            </div>
            {data.length > 0 ? data.map((illness) => {
                return <IllnessContainer key={illness.objectId} updateAddingIllness={updateAddingIllness} illness={illness} updateIllnessSelected={updateIllnessSelected} deleteMode={deleteMode} handleDeleteButton={handleDeleteButton}/>
            })
            : <div className="fit-height"><h3>No illnesses registered.</h3></div>}
        </div>
    )
}

export function IllnessContainer({updateAddingIllness, illness, updateIllnessSelected, deleteMode, handleDeleteButton}){
    return(
        <div className="illness-block" onClick={() => {updateAddingIllness(false); updateIllnessSelected(illness)}}>
            <div className="illness-container">
                <div className="illness-title">
                    <div style={{display: "flex", alignItems: "center"}}>
                        <div className="illness-light"></div>
                        <p>{illness.Name}</p>
                    </div>
                    {deleteMode && <button onClick={(e) => {e.stopPropagation(); handleDeleteButton(illness.objectId)}}><img src="" alt="delete button" /></button>}
                </div>
                <h3>{illness.Date}</h3>
            </div>
        </div>
    )
}

export function IllnessInformation({data}){
    return(
        <div className="illness-info">
            <h2>{data.Name}</h2>
            <div className="illness-block">
                <div className="illness-content">
                    <div>
                        <h3>Date:</h3>
                        <p>{data.Date}</p>
                    </div>
                    <div>
                        <h3>Description:</h3>
                        <p>{data.Description}</p>
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

export function AddIllness({saveInfo}){
    const [name, updateName] = React.useState("")
    const [date, updateDate] = React.useState("");
    const [description, updateDescription] = React.useState("")

    const saveIllness = async (e) => {
        e.preventDefault()

        const illnessObj = {
            userID: localStorage.getItem("current_user_id"),
            Name: name,
            Date: date,
            Description: description
        }

        saveInfo(illnessObj)

        updateName("")
        updateDate("")
        updateDescription("")
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
                        <input type="text" placeholder="Illness name" value={name} onChange={(e) => updateName(e.target.value)}/>
                        <input type="datetime-local" value={date} onChange={(e) => updateDate(e.target.value)}/>
                        <textarea placeholder="Illness description..." value={description} cols="30" rows="10" onChange={(e) => updateDescription(e.target.value)}></textarea>
                        <button onClick={(e) => saveIllness(e)} type="submit" className="classic-button">Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
