import React from 'react'
import "./MedicalCards.css"
import * as config from "../../config"
import axios from "axios"

export default function MedicalCards() {
    const [medicalCards, setMedicalCards] = React.useState([])
    const [addingMC, updateAddingMC] = React.useState(false)
    const [deleteMode, updateDeleteMode] = React.useState(false)
    const [mcSelected, updateMCSelected] = React.useState(null)

    const [isLoading, setIsLoading] = React.useState(true)

    const handleDeleteButton = ( async (id) => {
        updateDeleteMode(!deleteMode)
        updateMCSelected(null)

        if (id){
            axios.post(`${config.API_BASE_URL}/deleteMedicalCard/${id}`)
            .then(res => {
                console.log(res);
            })
            let newDataList = medicalCards.filter(mc => mc.objectId != id);
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
            axios.get(`${config.API_BASE_URL}/app/${localStorage.getItem("current_user_id")}/medicalCards`)
                .then(response => {
                    console.log('res.data: ', response.data);
                    setMedicalCards(response.data)
                    setIsLoading(false)
                })
                .catch(error => {
                    console.error("Error fetching: ", error)
                })
          })()
    },[])

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
                    <div className="addDelete-button" style={{width: "100%", height: "auto"}}>
                        <button className="classic-button" onClick={() => updateAddingMC(true)}>Add new Medical Card</button>
                        <span></span>
                        <button className={`delete-button ${deleteMode ? "active" : ""}`} onClick={() => handleDeleteButton()}></button>
                    </div>
                    {!isLoading ? medicalCards.map((medicalCard) => {
                        return <MedicalCard key={medicalCards.objectId} medicalCard={medicalCard} updateAddingMC={updateAddingMC} updateMCSelected={updateMCSelected} deleteMode={deleteMode} handleDeleteButton={handleDeleteButton}/>
                    })
                    : <div className="fit-height"><h3>No Medical Cards registered.</h3></div>}

                </div>
                <span></span>
                <div className="second-row">
                    {/* <CreateMedicalCard/> */}
                    {mcSelected ? <MedicalCardInformation data={mcSelected}/> : <div className="fit-height"><h3>Select a Medical Card.</h3></div>}
                </div>
            </section>
        </div>
    )
}

export function MedicalCard({medicalCard, updateAddingMC, updateMCSelected, deleteMode, handleDeleteButton}){
    return(
        <div className="medical-card" onClick={() => {updateAddingMC(false); updateMCSelected(medicalCard)}}>
            <div className="medicalcard-container" style={{width: "100%"}}>
                {/* <div className="medicalCard-icon">
                    <img src="" alt="Medical Card Icon" className="card-icon"/>
                </div> */}
                <div className="medicalCard-title" style={{width: "100%", display: "flex", alignItems: "flex-start", justifyItems: "space-between"}}>
                    <div>
                        <p>{medicalCard.name}</p>
                        <span>{medicalCard.specialty}</span>
                    </div>
                    {deleteMode && <button onClick={(e) => {e.stopPropagation(); handleDeleteButton(illness.objectId)}}><img src="" alt="delete button" /></button>}
                </div>
            </div>
        </div>
    )
}

export function MedicalCardInformation({data}){
    return(
        <div className="medicalcard-info">
            <div className="medicalcard-block">
                <div className="medicalcard-container">
                    <div className="medicalcard-header">
                        {/* <div className="img-container">
                            <img src="" alt="Medical Card Icon" className="card-icon"/>
                        </div> */}
                        <div>
                            <p>{data.name}</p>
                            <span>{data.specialty}</span>
                        </div>
                    </div>
                    <div className="medicalcard-rowsection">
                        <img src="" alt="phone icon" className="icon"/>
                        <p className="phone-number">{data.phone}</p>
                    </div>
                    <div className="medicalcard-address">
                        <h3>Address:</h3>
                        <p>{data.address.street}</p>
                        <p>{data.address.zip}, {data.address.city}, {data.address.state}</p>
                        <p>{data.address.country}</p>
                    </div>
                    <div className="medicalcard-rowsection">
                        <img src="" alt="phone icon" className="icon"/>
                        <p>{data.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function CreateMedicalCard({saveInfo}){
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
