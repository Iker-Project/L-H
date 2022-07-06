import * as React from "react"
import axios from "axios"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import Welcome from "../Welcome/Welcome"
import SignUp from "../SignUp/SignUp"


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem("current_user_id") !== null)
  const [userLogIn, updateLogIn] = React.useState({
    email: "",
    password: ""
  })

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          {/* <Sidebar/> */}
          <div className="routes_container">
            <Routes>
              <Route path="/" element={<Welcome/>} />
              <Route path="/SignUp" element={<SignUp/>}/>
              <Route path="/Home" element={<MainApp/>} />
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </div>
  )
}

export function MainApp(){
  return(
    <main>
          <Sidebar/>
          <div className="routes_container">
            <Routes>
              <Route path="/" element={<Home/>} />
            </Routes>
          </div>
    </main>
  )
}
