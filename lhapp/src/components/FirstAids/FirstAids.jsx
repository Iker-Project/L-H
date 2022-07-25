import React from 'react'
import "./FirstAids.css"

export default function FirstAids() {
    return (
        <div className="first-aids">
            <div className="title">
                <div className="title-logo">
                    <img src="../../../img/faIcon.png" alt="First Aids" />
                </div>
                <h1>First Aids</h1>
            </div>

            <section className="rows">
                <div className="first-row">
                    <AidsTab/>
                </div>
                <span></span>
                <div className="second-row">
                    <FirstAidInformation/>
                </div>
            </section>
        </div>
    )
}

export function AidsTab(){
    return(
        <div className="aid-tab">
            <div className="aidtab-container">
                <div>
                    <img src="" alt="Burns" />
                </div>
                <p>Burns</p>
            </div>
        </div>
    )
}

export function FirstAidInformation(){
    return(
        <div className="firstaid-info">
            <h2>First Aids Selected</h2>
            <div className="firstaid-block">
                <div className="firstaid-container">
                    <h3>What shoud I do?</h3>
                    <div>
                        <p>1.- Step One</p>
                        <span>Description...</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
