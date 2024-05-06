import React from "react";
import icon from '../assets/icon.png';
import '../style/App.css'

function Nav() {
    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="/">Novel Voyage</a>       
            </div>
            <img src={icon} className="imageicon" alt="Icon" />
        </div>
        </nav>
    );
}


export {Nav}
