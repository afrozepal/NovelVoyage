import React from "react";
import {Link} from 'react-router-dom'
import '../App.css'
import './styling.css'
function Nav(props) {

    return (
        
        <div className="background-container">
            <nav className="navbar navbar-expand-lg mainheader">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand locset" href="/">Welcome {props.username} to Novel Voyage</a>       
            </div>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Read</a>
                </li>
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Community</a>
                </li>
                <div>
                <Link to="./Login" className="nav-link login-link">LogIn</Link>
                    </div>

                {/* <Link to="/Login" className="btn btn-light cbtn" >LogIn</Link> */}
                <button type="button" className="btn btn-light cbtn">SIGNUP</button>
            </ul>
        </div>
        </nav>
        <div className="downside">
           <div>
           <h1 className="dh1">READ AND ADD YOUR INSIGHT</h1>
           </div>
           <div className="dcont">
            <p>Find your favorite book and read it here for free</p>
           </div>
           <div className="dBooksView">
            <Link to="/BooksPopulation" className="custom-link" >VIEW ALL BOOKS</Link>
           </div>
        </div>
            
        </div>

    );
}


export {Nav}

