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
                    <button className="classic-button">Add new Medical Card</button>
                    {!isLoading ? medicalCards.map((medicalCards) => {
                        return <MedicalCard key={medicalCards.objectId} medicalCards={medicalCards} updateAddingMC={updateAddingMC} updateMCSelected={updateMCSelected} deleteMode={deleteMode} handleDeleteButton={handleDeleteButton}/>
                    })
                    : <div className="fit-height"><h3>No Medical Cards registered.</h3></div>}

                </div>
                <span></span>
                <div className="second-row">
                    <CreateMedicalCard/>
                </div>
            </section>
        </div>
    )
}

export function MedicalCard({medicalCards, updateAddingMC, updateMCSelected, deleteMode, handleDeleteButton}){
    return(
        <div className="medical-card">
            <div className="medicalcard-container">
                <div>
                    <img src="" alt="Medical Card Icon" className="card-icon"/>
                </div>
                <div>
                    <p>{medicalCards.name}</p>
                    <span>{medicalCards.specialty}</span>
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
                        <p className="phone-number">Phone Number</p>
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
