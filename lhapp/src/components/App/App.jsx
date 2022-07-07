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

  const addAuthenticationHeader = () => {
    const currentUserId = localStorage.getItem("current_user_id")
    if (currentUserId !== null) {
      axios.defaults.headers.common = {
        "current_user_id": currentUserId
      };
    }
  }
  addAuthenticationHeader()

  const handleLogout = () => {
    localStorage.removeItem("current_user_id")
    axios.defaults.headers.common = {};
    setIsLoggedIn(false)
  }

  const handleLogin = (user) => {
    console.log(user)
    localStorage.setItem("current_user_id", user["objectId"])
    addAuthenticationHeader()

    setIsLoggedIn(true)
  }

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          {/* <Sidebar/> */}
          <div className="routes_container">
            <Routes>
              <Route path="/" element={<Welcome handleLogin={handleLogin}/>} />
              <Route path="/SignUp" element={<SignUp handleLogin={handleLogin}/>}/>
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
