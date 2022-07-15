import * as React from "react"
import axios from "axios"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as config from "../../config"
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

    localStorage.setItem("current_user_id", user["objectId"])
    addAuthenticationHeader()

    setIsLoggedIn(true)
  }

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <div className="routes_container">
            <Routes>
              <Route path="/" element={<Welcome isLoggedIn={isLoggedIn} handleLogin={handleLogin}/>} />
              <Route path="/SignUp" element={<SignUp handleLogin={handleLogin}/>}/>
              <Route path="/Home/*" element={<MainApp isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </div>
  )
}

export function MainApp({isLoggedIn, handleLogout}){
  const [data, setData] = React.useState([])
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchUserData = (async () => {
      axios.get(`${config.API_BASE_URL}/app/${localStorage.getItem("current_user_id")}`)
        .then(response => {
          console.log('res.data: ', response.data.userdata);
          setData(response.data.userdata)
        })
        .catch(error => {
          console.error("Error fetching: ", error)
        })
    })()

    if (!isLoggedIn){
      navigate("../", { replace: true })
    }

  }, [])

  return(
    <main>
      <Sidebar handleLogout={handleLogout}/>
      <div className="routes_container">
        <Routes>
          <Route path="/" element={<Home data={data} setData={setData}/>} />
        </Routes>
      </div>
    </main>
  )
}
