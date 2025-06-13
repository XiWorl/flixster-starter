import "../styles/Modal.css"
import genre_ids from "../data/genre-data"

async function fetchData(apiKey, movieId) {
    // let url = `https://api.themoviedb.org/3/movie/${movieId}/videos?${apiKey}`
    let url = `https://api.themoviedb.org/3/movie/1426776/videos?language=en-US`
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

export function enableModal() {
    let modal = document.getElementById("the-modal")
    modal.style.visibility = "visible"
}

function closeModal() {
    let modal = document.getElementById("the-modal")
    modal.style.visibility = "hidden"
}

function Trailer({apiKey, movieId}) {
    fetchData(apiKey, movieId).then(function(data) {
        data.filter(function(obj) {
            if (obj.type == "Trailer") return true
            return false
        })
        return <iframe src="#" frameborder="0"></iframe>
    })
}

export function Modal({modalData, apiKey}) {
    let selectedImage = `https://image.tmdb.org/t/p/w500${modalData.backdrop_path}`

    if (selectedImage == null) {
        selectedImage = "src/assets/Placeholder Image.png"
    } 

    let genreString = ""
    if (modalData.genre_ids != null) {
        for (let genreId of modalData.genre_ids) {
            for (let i = 0; i < genre_ids.genres.length; i++) {
                if (genre_ids.genres[i].id == genreId) {
                    genreString += `${genre_ids.genres[i].name}, `
                }
            }
        }
    }

    if (genreString.length > 2) {
        genreString = genreString.substring(0, genreString.length-2)
    }

    function test(event) {
        event.stopPropagation()
    }
    return (
        <div id="the-modal" className="modal" onClick={closeModal}>
            <div className="modal-content" onClick={test}>
                <span className="close" onClick={closeModal}>&times;</span>
                    <div id="modal-top">
                        <h2>{modalData.movieTitle}</h2>
                        <img id="modal-img" src={selectedImage} alt={modalData.movieTitle} />
                        <p id="release-date"><b>Release Date: </b>{modalData.release_date}</p>
                        <p id="genres"><b>Genres: </b>{genreString}</p>
                        <p id="overview"><b>Overview: </b>{modalData.overview}</p>
                    </div>
                    <div id="modal-bottom">
                        <Trailer apiKey={apiKey} movieId={modalData.id}/>
                    </div>
                </div>
        </div>
    )
}