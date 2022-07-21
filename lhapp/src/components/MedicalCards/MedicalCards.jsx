import React from 'react'
import "./MedicalCards.css"

export default function MedicalCards() {
    return (
        <div className="medical-cards">
            <div className="title">
                <div className="title-logo">
                    <img src="../../../img/mcIcon.png" alt="Medical History" />
                </div>
                <h1>Medical Cards</h1>
            </div>

            <section className="rows">
                <div className="first-row">
                    <button className="classic-button">Add new Medical Card</button>
                    <MedicalCard/>
                </div>
                <div className="second-row">
                    <CreateMedicalCard/>
                </div>
            </section>
        </div>
    )
}

export function MedicalCard(){
    return(
        <div className="medical-card">
            <div className="medicalcard-container">
                <div>
                    <img src="" alt="Medical Card Icon" className="card-icon"/>
                </div>
                <div>
                    <p>Name</p>
                    <span>Specilty</span>
                </div>
            </div>
        </div>
    )
}

export function MedicalCardInformation(){
    return(
        <div className="medicalcard-info">
            <div className="medicalcard-block">
                <div className="medicalcard-container">
                    <div className="medicalcard-header">
                        <div className="img-container">
                            <img src="" alt="Medical Card Icon" className="card-icon"/>
                        </div>
                        <div>
                            <p>Name</p>
                            <span>Specilty</span>
                        </div>
                    </div>
                    <div className="medicalcard-rowsection">
                        <img src="" alt="phone icon" className="icon"/>
                        <p>Phone Number</p>
                    </div>
                    <div className="medicalcard-address">
                        <h3>Address:</h3>
                        <p>Street</p>
                        <p>Zip Code, City, State</p>
                        <p>Country</p>
                    </div>
                    <div className="medicalcard-rowsection">
                        <img src="" alt="phone icon" className="icon"/>
                        <p>mail@email.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function CreateMedicalCard(){
    return(
        <div className="medicalcard-create">
            <div className="medicalcard-block">
                <div className="medicalcard-container">
                    <input type="text" className="classic-input" value={""} placeholder="First Name"/>
                    <input type="text" className="classic-input" placeholder="Last Name"/>
                    <span className="column-space"></span>
                    <input type="text" className="classic-input" placeholder="Specilty"/>
                    <span className="column-space"></span>
                    <div className="medicalcard-phone">
                        <button>+</button>
                        <input type="text" className="classic-input" placeholder="Phone Number"/>
                    </div>
                    <span className="column-space"></span>
                    <div className="add-address">
                        <h3>Address:</h3>
                        <input type="text" placeholder="Street" className="classic-input"/>
                        <div>
                            <input type="text" placeholder="Zip Code" className="classic-input"/>
                            <span></span>
                            <input type="text" placeholder="City" className="classic-input"/>
                        </div>
                        <input type="text" placeholder="State" className="classic-input"/>
                        <input type="text" placeholder="Country" className="classic-input"/>
                    </div>
                    <span className="column-space"></span>
                    <input type="text" className="classic-input" placeholder="Email"/>
                    <span className="column-space"></span>
                    <button className="classic-button">Create</button>
                </div>
            </div>
        </div>
    )
}
