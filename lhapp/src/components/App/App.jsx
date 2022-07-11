import * as React from "react"
import axios from "axios"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
    console.log('localStorage: ', localStorage);
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
        {/* {isLoggedIn && (
          <Navigate to="/Home" replace={true}/>
        )} */}
          <div className="routes_container">
            <Routes>
              <Route path="/" element={<Welcome isLoggedIn={isLoggedIn} handleLogin={handleLogin}/>} />
              <Route path="/SignUp" element={<SignUp handleLogin={handleLogin}/>}/>
              <Route path="/Home" element={<MainApp isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
              {/* {isLoggedIn ? <Route path="/Home" element={<MainApp isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} /> : ""} */}
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </div>
  )
}

export function MainApp({isLoggedIn, handleLogout}){
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoggedIn){
      navigate("../", { replace: true })
    }
  }, [])

  return(
    <main>
      <Sidebar handleLogout={handleLogout}/>
      <div className="routes_container">
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </div>
    </main>
  )
}
