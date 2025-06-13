import { useState } from 'react'
import "../styles/Header.css"
import { Sidebar } from './Sidebar'

const filterOptions = {
    "A-Z": (a,b) => a.title.localeCompare(b.title),
    "Rating": (a,b) => b.vote_average - a.vote_average,
    "Release Date": (a,b) => { new Date(b.release_date).getTime() - new Date(a.release_date).getTime()}
}

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

function SearchBar(apiKey, setMovieData, setLoadButtonEnabled, input, setInput) {

    function onChange(event) {
        setInput(event.target.value)
    }

    function onSearchClick(_event, priorityInput) {
        let selectedInput = priorityInput != null ? priorityInput : input
        window.searchEnabled = true

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
        window.searchEnabled = false
    }
    return (
        <div id="searchbar-options">
            <input type="text" id="search-bar" onChange={onChange} placeholder="Search.." value={input}></input>
            <button onClick={onSearchClick} id="search-submit">Submit</button>
            <button onClick={onClearClick}id="search-clear">Clear</button>
        </div>
    )
}


export function setFilter(movieData, setMovieData) {
    if (window.currentFilter == "") return 

    function deepCopy(array) {
        return array.map((item) => {
            if (Array.isArray(item)) {
                return deepCopy(item);
            } else {
                return item;
            }
        });
    }

    function getSortedData() {
        switch (window.currentFilter) {
            case "A-Z":
                return deepCopy(movieData).sort(filterOptions["A-Z"])
            case "Release Date":
                // return deepCopy(movieData).sort(filterOptions["Release Date"])

                return deepCopy(movieData).sort(function(a,b) {
                    const movie1Date = new Date(b.release_date).getTime()
                    const movie2Date = new Date(a.release_date).getTime()
                    return movie1Date - movie2Date
                })
            case "Rating":
                return deepCopy(movieData).sort(filterOptions["Rating"])
            default: 
                return function() {}
        }
    }

    if (filterOptions[window.currentFilter] != null) {
        let data = getSortedData()
        setMovieData(data)
    }
}


export function Header(props) {
    
    function onDropdownChange(event) {
        window.currentFilter = event.target.value
        setFilter(props.movieData, props.setMovieData)
    }
    
    return (
        <div id="header-div">
            <div id="title-div">
                <h1>Flixster</h1>
            </div>

            <div id="search-options">
                {SearchBar(props.apiKey, props.setMovieData, props.setLoadButtonEnabled, props.input, props.setInput)}

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
