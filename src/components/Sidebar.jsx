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
            <button className="sidebar-button" onClick={onClick(setCurrentView, "Home")}>Home</button>
            <button className="sidebar-button" onClick={onClick(setCurrentView, "Favorites")}>Favorites</button>
            <button className="sidebar-button" onClick={onClick(setCurrentView, "Watched")}>Watched</button>
        </>


    )
}