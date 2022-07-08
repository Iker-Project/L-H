import React from 'react'
import "./PopUp.css"

export default function PopUp({title, description, closeFunc}){
    return(
        <div className="popup-window">
            <div className="block">
                <div className="container">
                    <h3>{title}</h3>
                    <span>{description}</span>
                    <button onClick={() => closeFunc(false)}>Ok</button>
                </div>
            </div>
        </div>
    )
}
