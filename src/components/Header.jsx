import { useState } from 'react'
import "../styles/Header.css"

const filterOptions = {"A-Z": (a,b) => a.title.localeCompare(b.title)}

async function searchData(apiKey, searchValue) {
    window.currentPage = 1
    let url = `https://api.themoviedb.org/3/search/movie?query=${searchValue}`;
    if (searchValue == "" || searchValue == " ") {
        url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`
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

function SearchBar(apiKey, setMovieData, setLoadButtonEnabled) {
    const [input, setInput] = useState("")

    function onChange(event) {
        setInput(event.target.value)
    }

    function onSearchClick(_event, priorityInput) {
        let selectedInput = priorityInput != null ? priorityInput : input

        searchData(apiKey, selectedInput).then(function(data) {
            setMovieData(data.results)

            if (data.total_pages <= window.currentPage) {
                setLoadButtonEnabled(false)
            } else {
                setLoadButtonEnabled(true)
            }
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
    function onDropdownChange(event) {
        const selectedValue = event.target.value
        
        let sortedData = props.movieData.sort((a,b) => a.title.localeCompare(b.title))
        props.setMovieData([])
    }
    
    return (
        <div id="header-div">
            <div id="title-div">
                <h1>Flixster</h1>
            </div>

            <div id="search-options">
                {SearchBar(props.apiKey, props.setMovieData, props.setLoadButtonEnabled)}

                <select id="dropdown" onChange={onDropdownChange}>
                    <option value="" disabled selected>Sort by</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Release Date">Release Date</option>
                    <option value="Rating">Rating</option>
                </select>
            </div>
        </div>
    )
}
