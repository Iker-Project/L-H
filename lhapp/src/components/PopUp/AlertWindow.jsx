import React from 'react'
import "./AlertWindow.css"

export default function AlertWindow({title, description, cancelFunc, acceptFunc}) {
    return (
        <div className="alert-window">
            <div className="block">
                <div className="container">
                    <h3>{title}</h3>
                    <span>{description}</span>
                    <div>
                        <button onClick={() => cancelFunc(false)}>Cancel</button>
                        <button onClick={() => acceptFunc()}>Accept</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
