import React from "react";
// import '../App.css'
import '../styles/dispplaystyling.css'

function BooksDisplay() {
    return (
        <div>
            <div className="display">
                <div className="sidebar">
                    <h4 className="d2ah">Books By Genres</h4>
                    <div className="row">
                        <div className="col">
                            <button type="button" className="btn transparent-btn d-block">Fiction</button>
                            <button type="button" className="btn transparent-btn d-block">Detective</button>
                            <button type="button" className="btn transparent-btn d-block">Adventure</button>
                            <button type="button" className="btn transparent-btn d-block">Children's Stories</button>
                            <button type="button" className="btn transparent-btn d-block">History</button>
                            <button type="button" className="btn transparent-btn d-block">Philosophy</button>
                        </div>
                    </div>
                </div>

            </div>
            <div className="bookscard">

            </div>
        </div>
    );
}

export default BooksDisplay;  