import * as React from "react"
import axios from "axios"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <Sidebar/>
          <div className="routes_container">
            <Routes>
              <Route path="/" element={<Home/>} />
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </div>
  )
}
