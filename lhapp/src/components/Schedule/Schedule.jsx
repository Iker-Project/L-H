import React from 'react'
import {GoogleMap, useLoadScript, Marker, DirectionsRenderer} from "@react-google-maps/api"
import {geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';
import mapStyles from "./mapStyles"
import axios from "axios"
import * as config from "../../config"

import "./Schedule.css"
import Dropdown from "../Inputs/Dropdown"
import Slider from "../Inputs/Slider"

export default function Schedule({data, setData}) {
    const [dataAppointments, setAppointments] = React.useState({})

    const optionsData = ["Appointments", "Medicine"]
    const [optionSelected, updateOpcionSelected] = React.useState(optionsData[0])
    const [currentPos, updateCurrentPos] = React.useState(null)

    const [addingAppointment, updateAddingAppointment] = React.useState(false)
    const [deleteMode, updateDelteMode] = React.useState(false)
    const [appointmentSelected, updateAppointmentSelected] = React.useState(null)
    const [medicineSelected, updateMedicineSelected] = React.useState(null)

    const handleDeleteButton = ( async (id) => {
        updateDelteMode(!deleteMode)
        updateAppointmentSelected(null)

        if (id){
            axios.post(`${config.API_BASE_URL}/deleteAppointment/${id}`)
            .then(res => {
                console.log(res);
            })
            let newDataList = dataAppointments.filter(appointment => appointment.objectId != id);
            setAppointments([...newDataList])
        }
    })

    const saveInfo = (appointmentObj) =>{
        setIllnesses([...dataIllnesses, appointmentObj])
        axios.post(`${config.API_BASE_URL}/newAppointment`, dataIllnesses)
        .then(res => {
            console.log(res);
        })
    }

    React.useEffect(() => {
        if (navigator.geolocation) {
	    	navigator.geolocation.getCurrentPosition(showPosition);
	  	} else {
	    	console.log("Geolocation is not supported by this browser.");
	  	}

        function showPosition(position) {
            const coords = {lat: position.coords.latitude, lng: position.coords.longitude}
            updateCurrentPos(coords)
        }

        const fetchUserData = (async () => {
            axios.get(`${config.API_BASE_URL}/app/${localStorage.getItem("current_user_id")}/appointments`)
                .then(response => {
                    console.log('res.data: ', response.data);
                    setAppointments(response.data)
                })
                .catch(error => {
                    console.error("Error fetching: ", error)
                })
          })()
    }, [])

    return (
        <div className="schedile-view">
            <div className="title">
                <div>
                    <div className="title-logo">
                        <img src="../../../img/scheduleIcon.png" alt="Schedule" />
                    </div>
                    <h1>Schedule</h1>
                </div>

                <Slider/>
            </div>

            <section className="rows">
                <div className="first-row">
                    <Dropdown data={optionsData} updateData={updateOpcionSelected}/>
                    {
                        {
                            'Appointments':
                                <AppointmentManager updateAddingAppointment={updateAddingAppointment} data={dataAppointments} updateAppointmentSelected={updateAppointmentSelected} deleteMode={deleteMode} handleDeleteButton={handleDeleteButton}/>,
                            'Medicine':  false ?
                                <MedicineTab /> :
                                <div className="fit-height"><h3>No medicine registered.</h3></div>
                        }[optionSelected]
                    }
                </div>
                <span></span>
                <div className="second-row">
                {
                    {
                        'Appointments': addingAppointment ?
                        <AddAppointment/>
                        : appointmentSelected ? <AppointmentInformation data={appointmentSelected} currentPos={currentPos}/> : <div className="fit-height"><h3>Select an Appointment.</h3></div>,
                        'Medicine': medicineSelected ? <MedicineInformation /> : <div className="fit-height"><h3>Select a Medicine.</h3></div>
                    }[optionSelected]
                }
                </div>
            </section>
        </div>
    )
}

export function AppointmentManager({updateAddingAppointment, data, updateAppointmentSelected, deleteMode, handleDeleteButton}){

    return(
        <div style={{width: "100%", height: "auto"}}>
            <div className="addDelete-button">
                <button className="classic-button" onClick={() => updateAddingAppointment(true)}>Tap to add an appointment</button>
                <span></span>
                <button className={`delete-button ${deleteMode ? "active" : ""}`} onClick={() => handleDeleteButton()}></button>
            </div>
            {data.length > 0 ? data.map((appointment) => {
                return <AppointmentTab key={appointment.objectId} updateAddingAppointment={updateAddingAppointment} appointment={appointment} updateAppointmentSelected={updateAppointmentSelected} deleteMode={deleteMode} handleDeleteButton={handleDeleteButton}/>
            })
            : <div className="fit-height"><h3>No appointments registered.</h3></div>}
        </div>
    )
}

export function AppointmentTab({updateAddingAppointment, appointment, updateAppointmentSelected, deleteMode, handleDeleteButton}){
    return(
        <div className="schedule-block" onClick={() => {updateAddingAppointment(false); updateAppointmentSelected(appointment)}}>
            <div className="schedule-container">
                {/* Appointment Logo - Stretch Feature */}
                {/* <div className="logo-container">
                    <img src="" alt="Medicine Logo" />
                </div> */}
                <div>
                    <p>{appointment.name}</p>
                    <h3>{appointment.date}, <span>at</span> {appointment.hour}</h3>
                    <h3> {appointment.address}</h3>
                </div>
                {deleteMode && <button onClick={(e) => {e.stopPropagation(); handleDeleteButton(appointment.objectId)}}><img src="" alt="delete button" /></button>}
            </div>
        </div>
    )
}

export function AppointmentInformation({data, currentPos}){
    const [directions, updateDirections] = React.useState(null)

    const GetDirections = () =>{
        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
          {
            origin: currentPos,
            destination: {lat: data.latitude, lng: data.longitude}, // ONLY TESTING
            travelMode: window.google.maps.TravelMode.DRIVING
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              updateDirections(result)
            } else {
              console.error(`error fetching directions ${result}`);
            }
          }
        );
      }

    return(
        <div className="schedule-info">
            <h2>{data.name}</h2>
            <div className="schedule-block">
                <div className="schedule-content">
                    <div>
                        <h3>Start Date:</h3>
                        <p>{data.date}, <span>at</span> {data.hour}</p>
                    </div>
                    <div>
                        <h3>End Date:</h3>
                        <p>{data.endDate}, <span>at</span> {data.endHour}</p>
                    </div>
                    <div>
                        <h3>Address:</h3>
                        <p>{data.address}</p>
                    </div>
                    <div className="map-section">
                        <Map lat={data.latitude} lng={data.longitude} directions={directions} />
                        <div className="map-buttons">
                            <button className="classic-button" onClick={() => GetDirections()}>Get Directions</button>
                            <button className="classic-button">Open In...</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function AddAppointment({saveInfo}){
    const [name, updateName] = React.useState("")
    const [date, updateDate] = React.useState("")
    const [endDate, updateEndDate] = React.useState("")
    const [hout, updateHour] = React.useState("")
    const [street, updateStreet] = React.useState("")
    const [zipCode, updateZipCode] = React.useState("")
    const [city, updateCity] = React.useState("")
    const [state, updateState] = React.useState("")
    const [country, updateCountry] = React.useState("")

    return(
        <div className="schedule-info">
            <h2>Add New Appointment</h2>
            <div className="schedule-block">
                <div className="schedule-content">
                    <div>
                        <h3>Subject:</h3>
                        <input type="text" placeholder="Appoinment name" className="classic-input"/>
                    </div>
                    <div className="add-dates">
                        <div>
                            <h3>Start Date:</h3>
                            <input type="datetime-local" className="classic-input"/>
                        </div>
                        <span></span>
                        <div>
                            <h3>End Date:</h3>
                            <input type="datetime-local" className="classic-input"/>
                        </div>
                    </div>
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
                    <button className="classic-button"> Add Appointment</button>
                </div>
            </div>
        </div>
    )
}

export function Map({lat, lng, directions}){
    const [ libraries ] = React.useState(['places']);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyBZ-L6y4RM_Adga1qdKEj8ZTMCBkMHE_3o",
        libraries
    })

    const mapContainerStyle = {
        width: '100%',
        height: "100%",
        borderRadius: '10px',
    }

    const options = {
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
    }

    return(
        isLoaded &&
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={15.5}
            center={{lat: lat, lng: lng}} // ONLY TESTING
            options={options}>
            <Marker position={{lat: lat, lng: lng}} /> // ONLY TESTING
            {directions && <DirectionsRenderer
                directions={directions}/>}
        </GoogleMap>
    )
}

export function MedicineTab(){
    return(
        <div className="schedule-block">
            <div className="schedule-container">
                <div className="logo-container">
                    <img src="" alt="Medicine Logo" />
                </div>
                <div>
                    <p>Medicine name</p>
                    <h3><span>Take:</span> 1 Tab(s)<span>, Each</span> 1 hour(s) <span>, For</span> 10 days</h3>
                    <h3><span>Ends:</span> January 17th, 2023 <span>at:</span> 11:28 p.m.</h3>
                </div>
            </div>
        </div>
    )
}

export function MedicineInformation(){
    return(
        <div className="schedule-info">
            <h2>Medicine Selected</h2>
            <div className="schedule-block">
                <div className="schedule-content">
                    <div>
                        <h3>Started Date:</h3>
                        <p>November 28th, 2022, <span>at</span> 11:28 a.m.</p>
                    </div>
                    <div>
                        <h3>End Date:</h3>
                        <p>January 28th, 2023, <span>at</span> 11:28 p.m.</p>
                    </div>
                    <div>
                        <h3>Prescription:</h3>
                        <p>Prescription...</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function AddMedicine(){
    const optionsData = ["Tab(s)", "ML", "Drop(s)"]
    const [optionSelected, updateOpcionSelected] = React.useState(optionsData[0])

    return(
        <div className="schedule-info">
            <h2>Add New Medicine</h2>
            <div className="schedule-block">
                <div className="schedule-content">
                    <div>
                        <input type="text" placeholder="Medicine name" className="classic-input"/>
                    </div>
                    <div className="add-time">
                            <h3>Start Date:</h3>
                        <div>
                            <input type="date" className="classic-input"/>
                            <span></span>
                            <input type="time" className="classic-input"/>
                        </div>
                    </div>
                    <div className="add-prescription">
                        <h3>Prescription:</h3>
                        <div>
                            <h3>Take:</h3>
                            <input type="text" className="classic-input"/>
                            <span></span>
                            <div className="prescription-dropdown">
                                <Dropdown data={optionsData} updateData={updateOpcionSelected}/>
                            </div>
                        </div>
                        <div>
                            <h3>Each:</h3>
                            <input type="text" className="classic-input"/>
                            <h3>Hours</h3>
                        </div>
                        <div>
                            <h3>For:</h3>
                            <input type="text" className="classic-input"/>
                            <h3>Days</h3>
                        </div>
                    </div>
                    <button className="classic-button"> Add Appointment</button>
                </div>
            </div>
        </div>
    )
}
