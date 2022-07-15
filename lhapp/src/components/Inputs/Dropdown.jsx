import React from 'react'
import "./Dropdown.css"

export default function Dropdown({data, updateData}){
    const [openMenu, openMenuFunc] = React.useState(false)
    const [dataSelected, updateDataSelected] = React.useState(data ? data[0] : "")

    function handleDrowdown(){
        openMenuFunc(!openMenu)
    }

    function handleCategory(category){
        openMenuFunc(!openMenu)
        updateDataSelected(category)
        updateData(category)
    }

    return(
        <div className="dropdown-input">
            <div className="dropdown-button" role="button" onClick={handleDrowdown}>
                <img src="../../../img/arrow_black.png" alt="V" className={`arrowMenu ${openMenu ? "active" : ""}`}/>
                <span>{dataSelected}</span>
            </div>
            {data ? <DropdownMenu data={data} openMenu={openMenu} handleCategory={handleCategory}/> : ""}
        </div>
    )
}

export function DropdownMenu({data, openMenu, handleCategory}){
    const listClass = openMenu ? "active" : ""

    return(
        <ul className={`dropdown-menu ${listClass}`}>
            {data.map((item) => <li key={item} onClick={() => handleCategory(item)}>{item}</li>)}
        </ul>
    )
}
