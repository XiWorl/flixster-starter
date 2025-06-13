import { useEffect, useState } from "react";
import { enableModal, Modal } from "./Modal";
import { setFilter } from "./Header";
import "../styles/MovieContainer.css";
import { Sidebar } from "./Sidebar";

async function fetchData(page, apiKey, input) {
    let url =  `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`
    if (window.searchEnabled == true) {
        url = `https://api.themoviedb.org/3/search/movie?query=${input}&page=${page}`
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
    return json.results
}

export function CreateMovieContainer({apiKey, movieData, setMovieData, loadButtonEnabled, setModalData, input, setInput}) {
    const [favorited, setFavorited] = useState([])
    const [watched, setWatched] = useState([])
    const [currentView, setCurrentView] = useState("Home")
    let displayedMovieIds = []

    useEffect(function () {
        if (currentView == "Home") {
            let result = fetchData(1, apiKey) 
            result.then(function(data) {
                setMovieData(data)
            })
        } else if (currentView == "Favorites") {
            setInput("")
            setMovieData(favorited)
        } else if (currentView == "Watched") {
            setInput("")
            setMovieData(watched)
        }
    }, [currentView]);
    
    
    const tableOfMovies = movieData.map(function (obj) {
        let movieTitle = ""
        if (obj.title != null) {
            movieTitle = obj.title
        } else if (obj.name != null) {
            movieTitle = obj.name
        } else if (obj.movieTitle != null) {
            movieTitle = obj.movieTitle
        }

        if (displayedMovieIds.includes(obj.id)) {
            return
        }
        displayedMovieIds.push(obj.id)

        return (
            <Movie
                movieTitle={movieTitle}
                vote_average={obj.vote_average}
                key={obj.id}
                poster_path={obj.poster_path}
                movieData={movieData}
                setModalData={setModalData}
                backdrop_path={obj.backdrop_path}
                release_date={obj.release_date}
                genre_ids={[...obj.genre_ids]}
                overview={obj.overview}
                id={obj.id}
                favorited={favorited}
                watched={watched}
                setFavorited={setFavorited}
                setWatched={setWatched}
            />
        );
    });

    return (
        <div className="container">
            <div className="sidebar">
                <Sidebar setCurrentView={setCurrentView}/>
            </div>
            
            <div className="content">
                <div className="movie-container">
                    {tableOfMovies}
                </div>
                <LoadButton loadButtonEnabled={loadButtonEnabled} setMovieData={setMovieData} movieData={movieData} apiKey={apiKey} input={input} currentView={currentView}/>
            </div>
        </div>
    )
}


function Movie(props) {
    let posterImage = props.poster_path
    let favoriteImage = "src/assets/star-regular.png"

    if (posterImage == null) {
        posterImage = "Placeholder Image.png"
    } else {
        posterImage = `https://image.tmdb.org/t/p/w500${props.poster_path}`
    }

    function onInteractableClick(event) {

        function propLoop(array, state) {
            for (let i = 0; i < array.length; i++) {
                if (array[i] != null && array[i].id == props.id) {

                    let copy = [...array]
                    copy.splice(i, 1)
                    state(copy)
                    return true
                }
            }
            return false
        } 

        event.stopPropagation()

        if (event.target.className == "favorite") {
            if (propLoop(props.favorited, props.setFavorited) == true) {
                return
            }

            let copy = [...props.favorited]
            copy.push(props)
            props.setFavorited(copy)

        } else {
            if (propLoop(props.watched, props.setWatched) == true) {
                return
            }

            let copy = [...props.watched]
            copy.push(props)
            props.setWatched(copy)
        }
    }

    function setIcon(array, defaultImage, selectedImage) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] != null && array[i].id == props.id) {
                return selectedImage
            }
        }
        return defaultImage
    }

    return (
        <div key={props.id} className="movie" onClick={onMovieClicked(props, props.setModalData)} >
            <img
                src={posterImage}
                alt={props.movieTitle}
            />
            <div className="interactable-container">
                <div className="watched">
                    <input onClick={onInteractableClick} type="image" src={setIcon(props.watched, "eye-slash.png", "eye-solid.png")} alt="Watched" />
                </div>
                <input onClick={onInteractableClick} className="favorite" type="image" src={setIcon(props.favorited, "star-regular.png", "star-solid.png")} alt="Favorite" />
            </div>
            <h2>{props.movieTitle}</h2>
            <h3>Rating: {props.vote_average}</h3>
        </div>
    );
}

function LoadButton({loadButtonEnabled, setMovieData, movieData, apiKey, input, currentView}) {
    function onLoadButtonClick() {
        window.currentPage += 1

        let result = fetchData(window.currentPage, apiKey, input) 
        result.then(function(data) {
            setMovieData([...movieData, ...data])
            setFilter([...movieData, ...data], setMovieData)
        })
    }
    if (loadButtonEnabled == false || currentView != "Home") {
        return 
    } else {
        return <button onClick={onLoadButtonClick} id="load-more" className="load-more-button">Load More</button>
    }
}

function onMovieClicked(props, setModalData) {
    return function() {
        enableModal()
        setModalData({
            backdrop_path: props.backdrop_path,
            release_date: props.release_date,
            genre_ids: props.genre_ids,
            overview: props.overview,
            movieTitle: props.movieTitle,
            movieId: props.id
        })
    }
}