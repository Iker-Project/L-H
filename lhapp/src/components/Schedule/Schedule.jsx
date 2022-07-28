import React from 'react'
import {GoogleMap, useLoadScript, Marker, DirectionsRenderer} from "@react-google-maps/api"
// import {getGeocode, getLatLng} from 'use-places-autocomplete'
import Geocode from "react-geocode";
import mapStyles from "./mapStyles"
import axios from "axios"
import * as config from "../../config"

import "./Schedule.css"
import Dropdown from "../Inputs/Dropdown"
import Slider from "../Inputs/Slider"

export default function Schedule({data, setData}) {
    const [dataAppointments, setAppointments] = React.useState({})
    const [dataMedicine, setMedicine] = React.useState({})

    const optionsData = ["Appointments", "Medicine"]
    const [optionSelected, updateOpcionSelected] = React.useState(optionsData[0])
    const [currentPos, updateCurrentPos] = React.useState(null)

    const [addNewTab, updateAddNewTab] = React.useState(false)
    const [deleteMode, updateDelteMode] = React.useState(false)
    const [appointmentSelected, updateAppointmentSelected] = React.useState(null)
    const [medicineSelected, updateMedicineSelected] = React.useState(null)

    const handleDeleteAppointment = ( async (id) => {
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

    const handleDeleteMedicine = ( async (id) => {
        updateDelteMode(!deleteMode)
        updateMedicineSelected(null)

        if (id){
            axios.post(`${config.API_BASE_URL}/deleteMedicine/${id}`)
            .then(res => {
                console.log(res);
            })
            let newDataList = dataMedicine.filter(medicine => medicine.objectId != id);
            setMedicine([...newDataList])
        }
    })

    const saveAppointment = (async (appointmentObj) =>{
        axios.post(`${config.API_BASE_URL}/newAppointment`, appointmentObj)
        .then(res => {
            axios.get(`${config.API_BASE_URL}/app/${localStorage.getItem("current_user_id")}/appointments`)
            .then(response => {
                console.log('res.data: ', response.data);
                setAppointments(response.data)
            })
            .catch(error => {
                console.error("Error fetching: ", error)
            })
        })
    })

    const saveMedicine = (async (medicineObj) =>{
        axios.post(`${config.API_BASE_URL}/newMedicine`, medicineObj)
        .then(res => {
            axios.get(`${config.API_BASE_URL}/app/${localStorage.getItem("current_user_id")}/medicine`)
            .then(response => {
                console.log('res.data: ', response.data);
                setMedicine(response.data)
            })
            .catch(error => {
                console.error("Error fetching: ", error)
            })
        })
    })

    React.useEffect(() => {
        Geocode.setApiKey("AIzaSyBZ-L6y4RM_Adga1qdKEj8ZTMCBkMHE_3o");

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
                    setAppointments(response.data)
                })
                .catch(error => {
                    console.error("Error fetching: ", error)
                })

            axios.get(`${config.API_BASE_URL}/app/${localStorage.getItem("current_user_id")}/medicine`)
                .then(response => {
                    console.log('res.data: ', response.data);
                    setMedicine(response.data)
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
                                <AppointmentManager updateAddNewTab={updateAddNewTab} data={dataAppointments} updateAppointmentSelected={updateAppointmentSelected} deleteMode={deleteMode} handleDeleteButton={handleDeleteAppointment}/>,
                            'Medicine':
                                <MedicineManager updateAddNewTab={updateAddNewTab} data={dataMedicine} updateMedicineSelected={updateMedicineSelected} deleteMode={deleteMode} handleDeleteButton={handleDeleteMedicine}/>
                        }[optionSelected]
                    }
                </div>
                <span></span>
                <div className="second-row">
                {
                    {
                        'Appointments': addNewTab ?
                        <AddAppointment saveInfo={saveAppointment}/>
                        : appointmentSelected ? <AppointmentInformation data={appointmentSelected} currentPos={currentPos}/> : <div className="fit-height"><h3>Select an Appointment.</h3></div>,
                        'Medicine': addNewTab ?
                        <AddMedicine saveInfo={saveMedicine}/>
                        : medicineSelected ? <MedicineInformation data={medicineSelected}/> : <div className="fit-height"><h3>Select a Medicine.</h3></div>
                    }[optionSelected]
                }
                </div>
            </section>
        </div>
    )
}

export function AppointmentManager({updateAddNewTab, data, updateAppointmentSelected, deleteMode, handleDeleteButton}){
    return(
        <div style={{width: "100%", height: "auto"}}>
            <div className="addDelete-button">
                <button className="classic-button" onClick={() => updateAddNewTab(true)}>Tap to add an appointment</button>
                <span></span>
                <button className={`delete-button ${deleteMode ? "active" : ""}`} onClick={() => handleDeleteButton()}></button>
            </div>
            {data.length > 0 ? data.map((appointment) => {
                return <AppointmentTab key={appointment.objectId} updateAddNewTab={updateAddNewTab} appointment={appointment} updateAppointmentSelected={updateAppointmentSelected} deleteMode={deleteMode} handleDeleteButton={handleDeleteButton}/>
            })
            : <div className="fit-height"><h3>No appointments registered.</h3></div>}
        </div>
    )
}

export function MedicineManager({updateAddNewTab, data, updateMedicineSelected, deleteMode, handleDeleteButton}){

    return(
        <div style={{width: "100%", height: "auto"}}>
            <div className="addDelete-button">
                <button className="classic-button" onClick={() => updateAddNewTab(true)}>Tap to add a medicine</button>
                <span></span>
                <button className={`delete-button ${deleteMode ? "active" : ""}`} onClick={() => handleDeleteButton()}></button>
            </div>
            {data.length > 0 ? data.map((medicine) => {
                return <MedicineTab key={medicine.objectId} updateAddNewTab={updateAddNewTab} medicine={medicine} updateMedicineSelected={updateMedicineSelected} deleteMode={deleteMode} handleDeleteButton={handleDeleteButton}/>
            })
            : <div className="fit-height"><h3>No medicine registered.</h3></div>}
        </div>
    )
}

export function AppointmentTab({updateAddNewTab, appointment, updateAppointmentSelected, deleteMode, handleDeleteButton}){
    return(
        <div className="schedule-block" onClick={() => {updateAddNewTab(false); updateAppointmentSelected(appointment)}}>
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
    const [startHour, updateStartHour] = React.useState("")
    const [endDate, updateEndDate] = React.useState("")
    const [endHour, updateEndHour] = React.useState("")
    const [street, updateStreet] = React.useState("")
    const [zipCode, updateZipCode] = React.useState("")
    const [city, updateCity] = React.useState("")
    const [state, updateState] = React.useState("")
    const [country, updateCountry] = React.useState("")

    function ordinal(n) {
        var s = ["th", "st", "nd", "rd"];
        var v = n%100;
        return n + (s[(v-20)%10] || s[v] || s[0]);
    }

    const getDateAndHour = (date) => {
        const newDate = new Date(date);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const withPmAm = newDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });

        const day = newDate.getDate();
        const month = newDate.getMonth();
        const year = newDate.getFullYear();

        const str = `${months[month]}, ${newDate.toLocaleDateString('en-US', { weekday: 'long' })} ${ordinal(day)}, ${year}`;
        return {date: str, hour: withPmAm}
    }

    const setStartDate = (date) => {
        updateDate(getDateAndHour(date).date)
        updateStartHour(getDateAndHour(date).hour)
    }

    const setEndDate = (date) => {
        updateEndDate(getDateAndHour(date).date)
        updateEndHour(getDateAndHour(date).hour)
    }


    const submitButton = async () => {
        const newAddress = `${street}, ${city} ${state} ${zipCode}`;

        Geocode.fromAddress(`${street} ${city} ${state} ${zipCode}`).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              const newAppointment = {
                userID: localStorage.getItem("current_user_id"),
                name: name,
                date: date,
                hour: startHour,
                endDate: endDate,
                endHour: endHour,
                address: newAddress,
                latitude: lat,
                longitude: lng
            }

            updateName(""); updateDate(""); updateStartHour(""); updateEndDate(""); updateEndHour("");
            updateStreet(""); updateZipCode(""); updateCity(""); updateState(""); updateCountry("");

            saveInfo(newAppointment)
            },
            (error) => {
              console.error(error);
            }
          );
    }

    return(
        <div className="schedule-info">
            <h2>Add New Appointment</h2>
            <div className="schedule-block">
                <div className="schedule-content">
                    <div>
                        <h3>Subject:</h3>
                        <input type="text" value={name} onChange={(e) => updateName(e.target.value)} placeholder="Appoinment name" className="classic-input"/>
                    </div>
                    <div className="add-dates">
                        <div>
                            <h3>Start Date:</h3>
                            <input type="datetime-local" onChange={(e) => setStartDate(e.target.value)} className="classic-input"/>
                        </div>
                        <span></span>
                        <div>
                            <h3>End Date:</h3>
                            <input type="datetime-local" onChange={(e) => setEndDate(e.target.value)} className="classic-input"/>
                        </div>
                    </div>
                    <div className="add-address">
                        <h3>Address:</h3>
                        <input type="text" value={street} onChange={(e) => updateStreet(e.target.value)} placeholder="Street" className="classic-input"/>
                        <div>
                            <input type="text" value={zipCode} onChange={(e) => updateZipCode(e.target.value)} placeholder="Zip Code" className="classic-input"/>
                            <span></span>
                            <input type="text" value={city} onChange={(e) => updateCity(e.target.value)} placeholder="City" className="classic-input"/>
                        </div>
                        <input type="text" value={state} onChange={(e) => updateState(e.target.value)} placeholder="State" className="classic-input"/>
                        <input type="text" value={country} onChange={(e) => updateCountry(e.target.value)} placeholder="Country" className="classic-input"/>
                    </div>
                    <button onClick={() => submitButton()} className="classic-button"> Add Appointment</button>
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

export function MedicineTab({updateAddNewTab, medicine, updateMedicineSelected, deleteMode, handleDeleteButton}){
    return(
        <div className="schedule-block" onClick={() => {updateAddNewTab(false); updateMedicineSelected(medicine)}}>
            <div className="schedule-container">
                {/* Medicine Logo - Stretch Feature */}
                {/* <div className="logo-container">
                    <img src="" alt="Medicine Logo" />
                </div> */}
                <div>
                    <p>{medicine.name}</p>
                    <h3><span>Take:</span> {medicine.take} Tab(s)<span>, Each</span> {medicine.each} hour(s) <span>, For</span> {medicine.for} days</h3>
                    <h3><span>Ends:</span> {medicine.endDate} <span>at:</span> {medicine.endHour}</h3>
                </div>
                {deleteMode && <button onClick={(e) => {e.stopPropagation(); handleDeleteButton(medicine.objectId)}}><img src="" alt="delete button" /></button>}
            </div>
        </div>
    )
}

export function MedicineInformation({data}){
    return(
        <div className="schedule-info">
            <h2>{data.name}</h2>
            <div className="schedule-block">
                <div className="schedule-content">
                    <div>
                        <h3>Started Date:</h3>
                        <p>{data.startDate}, <span>at</span> {data.startHour}</p>
                    </div>
                    <div>
                        <h3>End Date:</h3>
                        <p>{data.endDate}, <span>at</span> {data.endHour}</p>
                    </div>
                    <div>
                        <h3>Prescription:</h3>
                        <p>{data.prescription}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function AddMedicine({saveInfo}){
    const [name, updateName] = React.useState("")
    const [startDate, updateStartDate] = React.useState("")
    const [startHour, updateStartHour] = React.useState("")
    const [endDate, updateEndDate] = React.useState("")
    const [endHour, updateEndHour] = React.useState("")
    const [nextDates, updateNextDates] = React.useState([])
    const [prescription, updatePrescription] = React.useState("")
    const [take, updateTake] = React.useState(0)
    const [each, updateEach] = React.useState(0)
    const [forTime, updateForTime] = React.useState(0)
    const optionsData = ["Tab(s)", "ML", "Drop(s)"]
    const [optionSelected, updateOpcionSelected] = React.useState(optionsData[0])

    const [date, updateDate] = React.useState(new Date())

    function ordinal(n) {
        var s = ["th", "st", "nd", "rd"];
        var v = n%100;
        return n + (s[(v-20)%10] || s[v] || s[0]);
    }

    const getDateAndHour = (date) => {
        const newDate = new Date(date);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const withPmAm = newDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });

        const day = newDate.getDate();
        const month = newDate.getMonth();
        const year = newDate.getFullYear();

        const str = `${months[month]}, ${newDate.toLocaleDateString('en-US', { weekday: 'long' })} ${ordinal(day)}, ${year}`;
        return {date: str, hour: withPmAm}
    }

    const setStartDate = (date) => {
        updateDate(date)
        updateStartDate(getDateAndHour(date).date)
        updateStartHour(getDateAndHour(date).hour)
    }

    const submitButton = () => {
        // getMedicineSchedule()

        const timesAtDay = (forTime * 24) / each;

        var today = new Date(date);
        var dates = []

        for (let i = 0; i < timesAtDay; i++) {
            today = new Date(today.getTime() + each*60*60*1000);
            dates.push(today)
        }

        const newMedicine = {
            userID: localStorage.getItem("current_user_id"),
            name: name,
            startDate: startDate,
            startHour: startHour,
            endDate: getDateAndHour(dates[dates.length - 1]).date,
            endHour: getDateAndHour(dates[dates.length - 1]).hour,
            prescription: prescription,
            take: take,
            takeSelected: optionSelected,
            each: each,
            for: forTime,
            dates: dates,
        }
        console.log('newMedicine: ', newMedicine);
        updateName(""); updateDate(""); updateStartHour(""); updatePrescription(""); updateTake("");
        updateEach(""); updateForTime(""); updateOpcionSelected("");

        saveInfo(newMedicine)
    }

    const getMedicineSchedule = () => {


        updateEndDate(getDateAndHour(dates[dates.length - 1]).date)
        updateEndHour(getDateAndHour(dates[dates.length - 1]).hour)
        updateNextDates([...dates])
        console.log(endDate);
        console.log(endHour);
        console.log(nextDates);
    }

    return(
        <div className="schedule-info">
            <h2>Add New Medicine</h2>
            <div className="schedule-block">
                <div className="schedule-content">
                    <div>
                        <input onChange={(e) => updateName(e.target.value)} type="text" placeholder="Medicine name" className="classic-input"/>
                    </div>
                    <div className="add-time">
                            <h3>Start Date:</h3>
                        <div>
                            <input onChange={(e) => setStartDate(e.target.value)} type="datetime-local" className="classic-input"/>
                        </div>
                    </div>
                    <div className="add-prescription">
                        <h3>Prescription:</h3>
                        <div>
                            <h3>Take:</h3>
                            <input onChange={(e) => updateTake(e.target.value)} type="number" className="classic-input"/>
                            <span></span>
                            <div className="prescription-dropdown">
                                <Dropdown data={optionsData} updateData={updateOpcionSelected}/>
                            </div>
                        </div>
                        <div>
                            <h3>Each:</h3>
                            <input onChange={(e) => updateEach(e.target.value)} type="number" className="classic-input"/>
                            <h3>Hours</h3>
                        </div>
                        <div>
                            <h3>For:</h3>
                            <input onChange={(e) => updateForTime(e.target.value)} type="number" className="classic-input"/>
                            <h3>Days</h3>
                        </div>
                        <textarea onChange={(e) => updatePrescription(e.target.value)} className="classic-input" style={{height: "150px", marginTop: "20px", fontSize: "18px"}} placeholder="More Details... (optional)" name="" id="" cols="30" rows="10"></textarea>
                    </div>
                    <button onClick={() => submitButton()} className="classic-button"> Add Appointment</button>
                </div>
            </div>
        </div>
    )
}
