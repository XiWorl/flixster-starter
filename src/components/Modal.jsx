import "../styles/Modal.css"
import genre_ids from "../data/genre-data"


export function enableModal() {
    let modal = document.getElementById("the-modal")
    modal.style.visibility = "visible"
}

function closeModal() {
    let modal = document.getElementById("the-modal")
    modal.style.visibility = "hidden"
}

export function Modal({modalData}) {
    let selectedImage = `https://image.tmdb.org/t/p/w500${modalData.backdropImage}`

    if (selectedImage == null) {
        selectedImage = "src/assets/Placeholder Image.png"
    } 

    let genreString = ""
    if (modalData.genres != null) {
        for (let genreId of modalData.genres) {
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
                        <p id="release-date"><b>Release Date: </b>{modalData.releaseDate}</p>
                        <p id="genres"><b>Genres: </b>{genreString}</p>
                        <p id="overview"><b>Overview: </b>{modalData.overview}</p>
                    </div>
                    <div id="modal-bottom">
                        
                    </div>
                </div>
        </div>
    )
}