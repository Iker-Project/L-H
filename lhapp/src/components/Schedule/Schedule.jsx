import React from 'react'
import {GoogleMap, useLoadScript, Marker, DirectionsRenderer} from "@react-google-maps/api"
import {geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';
import mapStyles from "./mapStyles"

import "./Schedule.css"
import Dropdown from "../Inputs/Dropdown"

export default function Schedule() {
    const optionsData = ["Appointments", "Medicine"]
    const [optionSelected, updateOpcionSelected] = React.useState(optionsData[0])
    const [currentPos, updateCurrentPos] = React.useState(null)

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
    }, [])

    return (
        <div className="schedile-view">
            <div className="title">
                <div className="title-logo">
                    <img src="../../../img/scheduleIcon.png" alt="Schedule" />
                </div>
                <h1>Schedule</h1>
            </div>

            <section className="rows">
                <div className="first-row">
                    <Dropdown data={optionsData} updateData={updateOpcionSelected}/>
                    <button className="classic-button">Tap to add an appointment</button>
                    <AppointmentTab/>
                </div>
                <div className="second-row">
                    <AppointmentInformation currentPos={currentPos}/>
                </div>
            </section>
        </div>
    )
}

export function AppointmentTab(){
    return(
        <div className="schedule-block">
            <div className="schedule-container">
                <div className="logo-container">
                    <img src="" alt="Medicine Logo" />
                </div>
                <div>
                    <p>Appointment name</p>
                    <h3>November 28th, 2022, <span>at</span> 11:28 a.m.</h3>
                    <h3><span>Address:</span> Hacker Way 1, Menlo Park</h3>
                </div>
            </div>
        </div>
    )
}

export function AppointmentInformation({currentPos}){
    const [directions, updateDirections] = React.useState(null)

    const GetDirections = () =>{
        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
          {
            origin: currentPos,
            destination: {lat: 40.72, lng: -74.002}, // ONLY TESTING
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
            <h2>Appointment Selected</h2>
            <div className="schedule-block">
                <div className="schedule-content">
                    <div>
                        <h3>Date:</h3>
                        <p>November 28th, 2022, <span>at</span> 11:28 a.m.</p>
                    </div>
                    <div>
                        <h3>Address:</h3>
                        <p>Hacker Way 1, Menlo Park</p>
                    </div>
                    <div className="map-section">
                        <Map directions={directions} />
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

export function Map({directions}){
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
        // scrollwheel: false,
        // gestureHandling: 'none'
    }

    return(
        isLoaded &&
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={15.5}
            center={{lat: 40.72, lng: -74.002}} // ONLY TESTING
            options={options}>
            <Marker position={{lat: 40.72, lng: -74.002}} /> // ONLY TESTING
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
