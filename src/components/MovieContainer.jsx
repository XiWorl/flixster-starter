import { useEffect, useState } from "react";
import "../styles/MovieContainer.css";

async function fetchData(page, setMovieData) {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDhiN2UyODU3NGRkMDE2YjVmOGIyOTY0ZGFiMTgxNiIsIm5iZiI6MTc0OTUxMjI0My44NTc5OTk4LCJzdWIiOiI2ODQ3NzAzMzQ0OTAxMjhjMTMzZmNkMmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6YOq5-jEBXUeVzcmhnrZcI1DOYVpuTm0I-VE-lgJR5s",
        },
    };

    fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
            console.log(json.results);
            setMovieData(json.results);
        })
        .catch((err) => console.error(err));
}

export function CreateMovieContainer() {
    const [movieData, setMovieData] = useState([]);

    const tableOfMovies = movieData.map(function (obj) {
        return (
            <Movie
                movieTitle={obj.title}
                rating={obj.vote_average}
                key={obj.id}
                posterImage={obj.poster_path}
            />
        );
    });


    useEffect(function () {
        fetchData(1, setMovieData);
        console.log("here");
    }, []);
    
    return <div className="movie-container">{tableOfMovies}</div>;
}

//{
// id: 1;
// movieTitle: "";
// rating: 0;
// favorited: false;
// watched: false;
// overview: "";
// posterImage: "";
// releaseDate: "";
// genre: "";
// runTime: "";
// }
function Movie(props) {
    return (
        <div key={props.id} className="movie" onClick={onMovieClick}>
            <img
                src={`https://image.tmdb.org/t/p/w500${props.posterImage}`}
                alt={props.movieTitle}
            />
            <div className="interactable-container">
                <h3>x Watched</h3>
                <h3>x Favorite</h3>
            </div>
            <h2>{props.movieTitle}</h2>
            {/* <h3>{props.rating}</h3> */}
        </div>
    );
}

export function Modal() {
    const [modalVisibility, setModalVisibility] = useState(false);

    return div;
}

function onMovieClick() {
    console.log("click");
    // if (modalVisibility === true) {return}
}
