import "../styles/Sidebar.css"


function onClick(setCurrentView, value) {

    return function() {
        console.log(value)
        setCurrentView(value)
    }
}

export function Sidebar({setCurrentView}) {
    return (
        <>
            <button onClick={onClick(setCurrentView, "Home")}>Home</button>
            <button onClick={onClick(setCurrentView, "Favorites")}>Favorites</button>
            <button onClick={onClick(setCurrentView, "Watched")}>Watched</button>
        </>


    )
}