import { useState } from 'react'
import "../styles/MovieContainer.css"

export function CreateMovieContainer(apiData) {
    apiData = {
        "results": [
            {
                "adult": false,
                "backdrop_path": "/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg",
                "genre_ids": [
                10751,
                35,
                12,
                14
                ],
                "id": 950387,
                "original_language": "en",
                "original_title": "A Minecraft Movie",
                "overview": "Four misfits find themselves struggling with ordinary problems when they are suddenly pulled through a mysterious portal into the Overworld: a bizarre, cubic wonderland that thrives on imagination. To get back home, they'll have to master this world while embarking on a magical quest with an unexpected, expert crafter, Steve.",
                "popularity": 1022.7906,
                "poster_path": "/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg",
                "release_date": "2025-04-04",
                "title": "A Minecraft Movie",
                "video": false,
                "vote_average": 6.062,
                "vote_count": 298
            },
            {
                "adult": false,
                "backdrop_path": "/lqHt4icP1GTaNBeVTxTrwTZdoAW.jpg",
                "genre_ids": [
                28,
                53,
                9648,
                80
                ],
                "id": 1195430,
                "original_language": "hi",
                "original_title": "देवा",
                "overview": "Dev Ambre, a ruthless cop, loses his memory in an accident just after he has finished solving a murder case and now has to reinvestigate it while keeping his memory loss a secret from everyone except DCP Farhan Khan.",
                "popularity": 485.463,
                "poster_path": "/4wKpglgZYMYpISMdThgdqS1TSQc.jpg",
                "release_date": "2025-01-31",
                "title": "Deva",
                "video": false,
                "vote_average": 3.2,
                "vote_count": 13
            },
            {
                "adult": false,
                "backdrop_path": "/is9bmV6uYXu7LjZGJczxrjJDlv8.jpg",
                "genre_ids": [
                28,
                12
                ],
                "id": 1229730,
                "original_language": "fr",
                "original_title": "Carjackers",
                "overview": "By day, they're invisible—valets, hostesses, and bartenders at a luxury hotel. By night, they're the Carjackers, a crew of skilled drivers who track and rob wealthy clients on the road. As they plan their ultimate heist, the hotel director hires a ruthless hitman, to stop them at all costs. With danger closing in, can Nora, Zoe, Steve, and Prestance pull off their biggest score yet?",
                "popularity": 380.9912,
                "poster_path": "/wbkPMTz2vVai7Ujyp0ag7AM9SrO.jpg",
                "release_date": "2025-03-27",
                "title": "Carjackers",
                "video": false,
                "vote_average": 6.093,
                "vote_count": 81
            }
        ]
    }
    const tableOfMovies = apiData.results.map(function(obj){
        console.log(obj.adult)
        return <Movie movieTitle={obj.title} rating={obj.vote_average} key={obj.id} posterImage={obj.poster_path}/>
    })

    return <div className="movie-container">
        {tableOfMovies}
    </div>
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
        <div key={props.id} className="movie">
            <img src={`https://image.tmdb.org/t/p/w500${props.posterImage}`} alt={props.movieTitle} />
            <h3>x Watched</h3>
            <h3>x Favorite</h3>
            <h2>{props.movieTitle}</h2>
            <h3>{props.rating}</h3>

        </div>
    )
}
