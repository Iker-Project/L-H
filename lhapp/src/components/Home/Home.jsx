import React from 'react'
import "./Home.css"

export default function Home() {
    return (
        <div className="home">
            <div className="title">
                <div className="title-logo">
                    <img src="../../../img/AppIcon.png" alt="Home" />
                </div>
                <h1>Home</h1>
            </div>

            <PersonalInfo/>

            <section className="table">
                <section>
                    <section className="row">
                        <Measurements/>
                        <Allegies/>
                    </section>
                        <VitalSigns/>
                </section>
                <WhatsNext/>
            </section>
        </div>
    )
}

export function PersonalInfo() {
    return (
        <div className="personal_info">
                <img src="" alt="Profile Pic" />
                <div className="pinfo_container">
                    <span>
                        <h3>Name:</h3>
                        <p className="name"></p>
                    </span>
                    <div className="pinfo_row">
                        <span>
                            <h3>Age:</h3>
                            <p></p>
                        </span>
                        <span>
                            <h3>Birth Date:</h3>
                            <p></p>
                        </span>
                        <span>
                            <h3>Sex:</h3>
                            <p></p>
                        </span>
                        <span>
                            <h3>Blood Type:</h3>
                            <p></p>
                        </span>
                    </div>
                </div>
            </div>
    )
}

export function Measurements() {
    return(
        <div className="measurements">
            <h2>Measurements</h2>
            <div className="measure_container">
                <div className="measures-row">
                    <span>
                        <h3>Weight:</h3>
                        <p>{} kg</p>
                    </span>
                    <span>
                        <h3>Height:</h3>
                        <p>{} m</p>
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

export function Allegies() {
    return(
        <div className="allergies">
            <h2>Allergies</h2>
            <div className="allergies_container">
                <h3>No allegies listed</h3>

                <button>Tap here to add an allergy</button>
            </div>
        </div>
    )
}

export function VitalSigns() {
    return(
        <div className="vital-signs">
            <h2>Vital Signs</h2>
            <div className="vitalsigns_container">
                <ul>
                    <li>
                        <h3>Pulse Oximeter: </h3>
                        <div>
                            <p></p>
                            <h4>SpO2</h4>
                        </div>
                        <p className="text-status"></p>
                    </li>
                    <li>
                        <h3>Heart Rate: </h3>
                        <div>
                            <p></p>
                            <h4>SpO2</h4>
                        </div>
                        <p className="text-status"></p>
                    </li>
                    <li>
                        <h3>Temperature: </h3>
                        <div>
                            <p></p>
                            <h4>SpO2</h4>
                        </div>
                        <p className="text-status"></p>
                    </li>
                    <li>
                        <h3>Blood Pressure: </h3>
                        <div>
                            <p></p>
                            <h4>SpO2</h4>
                        </div>
                        <p className="text-status"></p>
                    </li>
                    <li>
                        <h3>Glucose: </h3>
                        <div>
                            <p></p>
                            <h4>SpO2</h4>
                        </div>
                        <p className="text-status"></p>
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
