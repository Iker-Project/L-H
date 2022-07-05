import React from 'react'
import "./Home.css"

export default function Home() {
    return (
        <div className="home">
            <div className="title">
                <img src="" alt="Home" />
                <h1>Home</h1>
            </div>

            <PersonalInfo/>
            <Measurements/>
        </div>
    )
}

export function PersonalInfo() {
    return (
        <div className="personal_info">
                <img src="" alt="Profile Pic" />
                <div className="pinfo_container">
                    <h3>Name:</h3>
                    <div>
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
                        <h3>Age:</h3>
                        <p></p>
                    </span>
                    <span>
                        <h3>Age:</h3>
                        <p></p>
                    </span>
                </div>
                <div className="bmi-row">
                    <h3>Age:</h3>
                    <p></p>
                    <p></p>
                </div>
            </div>
        </div>
    )
}
