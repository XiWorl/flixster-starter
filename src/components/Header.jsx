import { useState } from 'react'
import "../styles/Header.css"

function SearchBar() {
    const [input, setInput] = useState("hello")

    function onChange(event) {
        setInput(event.target.value)
    }
    return (
        <div id="searchbar-options">
            <input type="text" id="search-bar" onChange={onChange} placeholder="Search.." value={input}></input>
            <button id="search-submit">Submit</button>
            <button id="search-clear">Clear</button>
        </div>
    )
}

export function Header() {
    return (
        <div id="header-div">
            <div id="title-div">
                <h1>Flixster</h1>
            </div>

            <div id="search-options">
                {SearchBar()}

                <select id="dropdown">
                    <option value="volvo">Sort by</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
            </div>
        </div>
    )
}
