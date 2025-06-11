import { useState } from 'react'
import "../styles/Header.css"


async function searchData(apiKey, searchValue) {
    const url = `https://api.themoviedb.org/3/search/collection?query=${searchValue}`;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                `Bearer ${apiKey}`,
        },
    };

    let response = await fetch(url, options)
    let json = await response.json()
    return json.results
}

function SearchBar(apiKey) {
    const [input, setInput] = useState("")

    function onChange(event) {
        setInput(event.target.value)
    }

    function onSearchClick(event) {
        searchData(apiKey, input).then(function(data) {
            console.log(data)
        })
    }
    return (
        <div id="searchbar-options">
            <input type="text" id="search-bar" onChange={onChange} placeholder="Search.." value={input}></input>
            <button onClick={onSearchClick} id="search-submit">Submit</button>
            <button id="search-clear">Clear</button>
        </div>
    )
}

export function Header(props) {
    return (
        <div id="header-div">
            <div id="title-div">
                <h1>Flixster</h1>
            </div>

            <div id="search-options">
                {SearchBar(props.apiKey)}

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
