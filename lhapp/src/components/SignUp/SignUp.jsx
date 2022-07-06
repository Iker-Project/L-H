import * as React from "react"
import axios from "axios"
import { Link } from "react-router-dom";

export default function SignUp(){
    const email = React.createRef();
    const password = React.createRef();

    return (
        <div className="signup">
            <div className="block">
                <div className="container">
                    <h2>Sign Up</h2>
                    <h3>Account Information:</h3>
                    <form action="" className="signup-form">
                        <div>
                            <input type="text" placeholder="First Name"/>
                            <input type="text" placeholder="Last Name"/>
                        </div>
                        <input type="text" placeholder="Email" ref={email}/>
                        <input type="text" placeholder="Password" ref={password}/>
                        <div>
                            <input type="date"/>
                            <input type="text" placeholder="Sex:"/>
                        </div>
                        <button>Next</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
