import React from 'react'
import "./Home.css"
import * as config from "../../config"
import axios from "axios"

export default function Home({data, setData}) {
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
        <div className="home">
            <div className="title">
                <div className="title-logo">
                    <img src="../../../img/AppIcon.png" alt="Home" />
                </div>
                <h1>Home</h1>
            </div>

            <PersonalInfo data={data.logginUserData}/>

            <section className="table">
                <section>
                    <section className="row">
                        <Measurements data={Object.keys(dataCopy).length !== 0 && dataCopy.userData.homeData} saveInfo={saveInfo}/>
                        <Allegies data={Object.keys(dataCopy).length !== 0 && dataCopy.userData.homeData} saveInfo={saveInfo}/>
                    </section>
                        <VitalSigns data={Object.keys(dataCopy).length !== 0 && dataCopy.userData.homeData} saveInfo={saveInfo}/>
                </section>
                <WhatsNext/>
            </section>
        </div>
    )
}

export function PersonalInfo({data}) {
    const getAge = (dateString) =>{
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    return (
        <div className="personal_info">
            <img src="" alt="Profile Pic" />
            <div className="pinfo_container">
                <span>
                    <h3>Name:</h3>
                    <p className="name">{data ? data.username : "Name"}</p>
                </span>
                <div className="pinfo_row">
                    <span>
                        <h3>Age:</h3>
                        <p>{data ? getAge(data.birthdate) : "Age"}</p>
                    </span>
                    <span>
                        <h3>Birth Date:</h3>
                        <p>{data ? data.birthdate : "11/28/2003"}</p>
                    </span>
                    <span>
                        <h3>Sex:</h3>
                        <p>{data ? data.sex : "Sex"}</p>
                    </span>
                    <span>
                        <h3>Blood Type:</h3>
                        <p>{data ? data.bloodType : "Blood"}</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export function Measurements({data, saveInfo}) {
    const [editMode, updateEditMode] = React.useState(false)

    const handlerSaveInfo = () => {
        updateEditMode(!editMode)

        if (editMode){
            saveInfo()
        }
    }

    return(
        <div className="measurements">
            <div className="section-header">
                <h2>Measurements</h2>
                <button className="edit-button" onClick={() => handlerSaveInfo()}><img src={`../../../img/${editMode ? "CheckIcon.png" : "EditIcon.png"}`} alt="Edit button" /></button>
            </div>
            <div className="measure_container">
                <div className="measures-row">
                    <span>
                        <h3>Weight:</h3>
                        {editMode ? <input type="number" onChange={(e) => {data.weight = e.target.value}}/> : <p>{data.weight}</p>}
                    </span>
                    <span>
                        <h3>Height:</h3>
                        {editMode ? <input type="number" onChange={(e) => {data.height = e.target.value}}/> : <p>{data.height}</p>}
                    </span>
                </div>
                <div className="bmi-row">
                    <h3>BMI:</h3>
                    <p></p>
                    <p className="text-status"></p>
                </div>
            </div>
        </div>
    )
}

export function Allegies({data, saveInfo}) {
    const [editMode, updateEditMode] = React.useState(false)

    return(
        <div className="allergies">
            <div className="section-header">
                <h2>Allergies</h2>
                <button className="edit-button" onClick={() => updateEditMode(!editMode)}><img src={`../../../img/${editMode ? "CheckIcon.png" : "EditIcon.png"}`} alt="Edit button" /></button>
            </div>
            <div className="allergies_container">
                <h3>No allegies listed</h3>

                <button>Tap here to add an allergy</button>
            </div>
        </div>
    )
}

export function VitalSigns({data, saveInfo}) {
    const [editMode, updateEditMode] = React.useState(false)

    const handlerSaveInfo = () => {
        updateEditMode(!editMode)

        if (editMode){
            saveInfo()
        }
    }

    return(
        <div className="vital-signs">
            <div className="section-header">
                <h2>Vital Signs</h2>
                <button className="edit-button" onClick={() => handlerSaveInfo()}><img src={`../../../img/${editMode ? "CheckIcon.png" : "EditIcon.png"}`} alt="Edit button" /></button>
            </div>
            <div className="vitalsigns_container">
                <ul>
                    <li>
                        <h3>Pulse Oximeter: </h3>
                        <div>
                            {editMode ? <input type="number" onChange={(e) => {data.pulse = e.target.value}}/> : <p>{data.pulse}</p>}
                            <h4>SpO2</h4>
                        </div>
                        <p className="text-status">•</p>
                    </li>
                    <li>
                        <h3>Heart Rate: </h3>
                        <div>
                            {editMode ? <input type="number" onChange={(e) => {data.heartRate = e.target.value}}/> : <p>{data.heartRate}</p>}
                            <h4>Bpm</h4>
                        </div>
                        <p className="text-status">•</p>
                    </li>
                    <li>
                        <h3>Temperature: </h3>
                        <div>
                            {editMode ? <input type="number" onChange={(e) => {data.temperature = e.target.value}}/> : <p>{data.temperature}</p>}
                            <h4>°C</h4>
                        </div>
                        <p className="text-status">•</p>
                    </li>
                    <li>
                        <h3>Blood Pressure: </h3>
                        <div>
                            {editMode ? <input type="number" onChange={(e) => {data.pressure = e.target.value}}/> : <p>{data.pressure}</p>}
                            <h4>mmHg</h4>
                        </div>
                        <p className="text-status">•</p>
                    </li>
                    <li>
                        <h3>Glucose: </h3>
                        <div>
                            {editMode ? <input type="number" onChange={(e) => {data.glucose = e.target.value}}/> : <p>{data.glucose}</p>}
                            <h4>mg/dL</h4>
                        </div>
                        <p className="text-status">•</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export function WhatsNext() {
    return(
        <div className="whatsNext">
            <h2>What's Next?...</h2>
            <div className="whatsNext_container">

            </div>
        </div>
    )
}
