import "../styles/Sidebar.css"

function onOpen() {
    document.getElementById("mySidebar").style.display = "block";
}

function onClose() {
    document.getElementById("mySidebar").style.display = "none";
}

export function Sidebar() {
    return (
        <>
            <div className="w3-sidebar w3-bar-block w3-border-right" id="mySidebar">
                <button onClick={onClose} className="w3-bar-item w3-large">Close &times;</button>
                <a href="#" className="w3-bar-item w3-button">Link 1</a>
                <a href="#" className="w3-bar-item w3-button">Link 2</a>
                <a href="#" className="w3-bar-item w3-button">Link 3</a>
            </div>

            <div className="w3-teal">
                <button onClick={onOpen} className="w3-button w3-teal w3-xlarge">☰</button>
            </div>

        </>


    )
}