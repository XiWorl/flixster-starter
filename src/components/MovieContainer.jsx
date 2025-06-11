import { useEffect, useState } from "react";
import "../styles/MovieContainer.css";


async function fetchData(page, apiKey) {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
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

export function CreateMovieContainer({apiKey, movieData, setMovieData}) {

    const [loadButtonEnabled, setLoadButtonEnabled] = useState(true)

    useEffect(function () {
        let result = fetchData(1, apiKey) 
        result.then(function(data) {
            setMovieData(data)
        })
    }, []);
    
    const tableOfMovies = movieData.map(function (obj) {
        let movieTitle = ""
        if (obj.title != null) {
            movieTitle = obj.title
        } else if (obj.name != null) {
            movieTitle = obj.name
        }
        return (
            <Movie
                movieTitle={movieTitle}
                rating={obj.vote_average}
                key={obj.id}
                posterImage={obj.poster_path}
                movieData={movieData}
            />
        );
    });


    return (
        <>
            <div className="movie-container">
                {tableOfMovies}
            </div>
            <LoadButton visible={loadButtonEnabled} setMovieData={setMovieData} movieData={movieData} apiKey={apiKey}/>
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
    return (
        <div key={props.id} className="movie" onClick={onMovieClick}>
            <img
                src={posterImage}
                alt={props.movieTitle}
            />
            <div className="interactable-container">
                <h3>x Watched</h3>
                <h3>x Favorite</h3>
            </div>
            <h2>{props.movieTitle}</h2>
            
        </div>
    );
}

function LoadButton({loadButtonEnabled, setMovieData, movieData, apiKey}) {
    function onLoadButtonClick() {
        console.log(window.currentPage += 1)
        console.log(movieData)

        let result = fetchData(window.currentPage, apiKey) 
        result.then(function(data) {
            console.log([...movieData, ...data])
            setMovieData([...movieData, ...data])
        })
    }
    if (loadButtonEnabled == false) {
        return 
    } else {
        return <button onClick={onLoadButtonClick} id="load-more" className="load-more-button">Load More</button>
    }
}

function onMovieClick() {
    console.log("click");
}
