import React from 'react'
import "./Explore.css"
import Dropdown from "../Inputs/Dropdown"
import axios from "axios"
import * as config from "../../config"
import Geocode from "react-geocode";

export default function Explore() {
    const exploreOptions = ["Hospitals", "Doctors"]
    const [exploreSelected, updateExploreSelected] = React.useState(exploreOptions[0])
    const [radius, setRadius] = React.useState(100000)
    const [hospitals, setHospitals] = React.useState(null)

    const getHospitals = async (coords) => {
        const list = await axios.post(`${config.API_BASE_URL}/app/getHospitals`, {...coords, radius})
        setHospitals(list.data)
        console.log(list)
    }

    React.useEffect(() => {
        Geocode.setApiKey("AIzaSyBZ-L6y4RM_Adga1qdKEj8ZTMCBkMHE_3o");

        if (navigator.geolocation) {
	    	navigator.geolocation.getCurrentPosition(showPosition);
	  	} else {
	    	console.log("Geolocation is not supported by this browser.");
	  	}

        function showPosition(position) {
            const coords = {lat: position.coords.latitude, lng: position.coords.longitude}
            getHospitals(coords)
        }
    }, [])

    return (
        <div className="explore-view">
            <div className="title">
                <div>
                    <div className="title-logo">
                        <img src="../../../img/expIcon.png" alt="First Aids" />
                    </div>
                    <h1>Explore</h1>
                </div>
                <div className="filter-space">
                    <Filter/>
                </div>
            </div>

            <section className="rows">
                <div className="first-row">
                    <Dropdown data={exploreOptions} updateData={updateExploreSelected}/>
                    {
                        {
                            'Hospitals': hospitals && hospitals.map((hospital) => {
                                return <InfoContainer key={hospital.place_id} data={hospital}/>
                            }),
                            'Doctors': ""
                        }[exploreSelected]
                    }
                </div>
                <span></span>
                <div className="second-row">
                    <ExploreDetails/>
                </div>
            </section>
        </div>
    )
}

export function InfoContainer({data}){
    return (
        <div className="explore-container">
            <div className="exploreinfo-block">
                <p>{data.name}</p>
                <h3 className="subtitle">{data.vicinity}</h3>
            </div>
        </div>
    )
}

export function ExploreDetails(){
    return (
        <div className="explore-container">
            <div className="exploreinfo-block">
                <p>Name</p>
                <div className="explore-rowsection">
                    <img src="" alt="phone icon" className="icon"/>
                    <p className="phone-number">Phone Number</p>
                </div>
                <div className="explore-address">
                    <h3>Address:</h3>
                    <p>Street</p>
                    <p>Zip Code, City, State</p>
                    <p>Country</p>
                </div>
                <h3>Details:</h3>
                <p>Details...</p>
            </div>
        </div>
    )
}

export function Filter(){
    const [openedMenu, updateMenu] = React.useState(false)

    return(
        <div className="filter">
            <div className="filter-container" onClick={() => updateMenu(!openedMenu)}>
                <div className="filter-header">
                    <span>Filters:</span>
                </div>
            </div>
            <div className={`filter-content ${openedMenu ? "active" : ""}`}>
                <div>
                    <h3>Location Ratio:</h3>
                    <div>
                        <input type="number" className="classic-input"/>
                    </div>
                    <h3>miles</h3>
                </div>
                <form action="" className="filter-form">
                    <div>
                        <label className="input-container">
                            <input type="radio" onChange={() => {}} checked="checked" name="radio"/>
                            <span className="checkmark"></span>
                        </label>
                        <h3>Any</h3>
                    </div>
                    <div>
                        <label className="input-container">
                            <input type="radio" name="radio"/>
                            <span className="checkmark"></span>
                        </label>
                        <h3>Specialties:</h3>
                    </div>
                    <div className="horizontal-scroll">
                        {/* Map Function - Specialties */}
                        <div className="specialty-option">
                            <span>Specialty</span>
                        </div>
                    </div>
                    <div>
                        <label className="input-container">
                            <input type="radio" name="radio"/>
                            <span className="checkmark"></span>
                        </label>
                        <h3>Illness:</h3>
                    </div>
                    <div className="horizontal-scroll">
                        {/* Map Function - Users Illnes */}
                        <div className="illness-option">
                            <span>Illness</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
