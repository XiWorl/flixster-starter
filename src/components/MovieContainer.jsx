import { useEffect, useState } from "react";
import { enableModal, Modal } from "./Modal";
import { setFilter } from "./Header";
import "../styles/MovieContainer.css";

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

export function CreateMovieContainer({apiKey, movieData, setMovieData, loadButtonEnabled, setModalData, input}) {
    const [favorited, setFavorited] = useState({})
    const [watched, setWatched] = useState({})
    const [currentView, setCurrentView] = useState("Home")
    let displayedMovieIds = []

    useEffect(function () {
        if (currentView == "Home") {
            let result = fetchData(1, apiKey) 
            result.then(function(data) {
                setMovieData(data)
            })
        } else if (currentView == "Favorites") {
            setMovieData(favorited)
        } else if (currentView == "Watched") {
            setMovieData(watched)
        }
    }, [currentView]);
    
    
    
    const tableOfMovies = movieData.map(function (obj) {
        let movieTitle = ""
        if (obj.title != null) {
            movieTitle = obj.title
        } else if (obj.name != null) {
            movieTitle = obj.name
        }

        if (displayedMovieIds.includes(obj.id)) {
            return
        }
        displayedMovieIds.push(obj.id)

        return (
            <Movie
                movieTitle={movieTitle}
                rating={obj.vote_average}
                key={obj.id}
                posterImage={obj.poster_path}
                movieData={movieData}
                setModalData={setModalData}
                backdropImage={obj.backdrop_path}
                releaseDate={obj.release_date}
                genres={[...obj.genre_ids]}
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
        <>
            <div className="movie-container">
                {tableOfMovies}
            </div>
            <LoadButton loadButtonEnabled={loadButtonEnabled} setMovieData={setMovieData} movieData={movieData} apiKey={apiKey} input={input}/>
        </>
    )
}


function Movie(props) {
    let posterImage = props.posterImage

    if (posterImage === null) {
        posterImage = "src/assets/Placeholder Image.png"
    } else {
        posterImage = `https://image.tmdb.org/t/p/w500${props.posterImage}`
    }

    function onInteractableClick(event) {
        event.stopPropagation()
        if (event.target.className == "favorite") {
            if (props.favorited[props.id] == null) {
                props.setFavorited({...props.favorited, [props.id]: props})
                return
            } else {
                delete props.favorited[props.id]
                console.log(props.favorited)
            }
            console.log(props.favorited)

        } else {
            // window.watched.push(props)
        }
    }

    return (
        <div key={props.id} className="movie" onClick={onMovieClicked(props, props.setModalData)} >
            <img
                src={posterImage}
                alt={props.movieTitle}
            />
            <div className="interactable-container">
                <div className="watched">
                    <input onClick={onInteractableClick} type="image" src="src/assets/eye-slash.png" alt="Watched" />
                    <h3>Watched</h3>
                </div>
                <input onClick={onInteractableClick} className="favorite" type="image" src="src\assets\star-regular.png" alt="Favorite" />
            </div>
            <h2>{props.movieTitle}</h2>
        </div>
    );
}

function LoadButton({loadButtonEnabled, setMovieData, movieData, apiKey, input}) {
    function onLoadButtonClick() {
        window.currentPage += 1

        let result = fetchData(window.currentPage, apiKey, input) 
        result.then(function(data) {
            setMovieData([...movieData, ...data])
            setFilter([...movieData, ...data], setMovieData)
        })
    }
    if (loadButtonEnabled == false) {
        return 
    } else {
        return <button onClick={onLoadButtonClick} id="load-more" className="load-more-button">Load More</button>
    }
}

function onMovieClicked(props, setModalData) {
    return function() {
        enableModal()
        setModalData({
            backdropImage: props.backdropImage,
            releaseDate: props.releaseDate,
            genres: props.genres,
            overview: props.overview,
            movieTitle: props.movieTitle,
            movieId: props.id
        })
    }
}