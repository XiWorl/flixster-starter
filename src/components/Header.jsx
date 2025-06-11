import { useState } from 'react'
import "../styles/Header.css"


async function searchData(apiKey, searchValue) {
    window.currentPage = 0
    let url = `https://api.themoviedb.org/3/search/collection?query=${searchValue}`;
    if (searchValue == "" || searchValue == " ") {
        url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
    }

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
    return json
}

function SearchBar(apiKey, setMovieData) {
    const [input, setInput] = useState("")

    function onChange(event) {
        setInput(event.target.value)
    }

    function onSearchClick(event, priorityInput) {
        let selectedInput = priorityInput != null ? priorityInput : input

        searchData(apiKey, selectedInput).then(function(data) {
            setMovieData(data.results)
        })
    }
    function onClearClick() {
        setInput("")
        onSearchClick(apiKey, "")
    }
    return (
        <div id="searchbar-options">
            <input type="text" id="search-bar" onChange={onChange} placeholder="Search.." value={input}></input>
            <button onClick={onSearchClick} id="search-submit">Submit</button>
            <button onClick={onClearClick}id="search-clear">Clear</button>
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
                {SearchBar(props.apiKey, props.setMovieData)}

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
