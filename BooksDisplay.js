import React from "react";
import { Link } from 'react-router-dom';
import './displaystyling.css';
import { Nav } from "./Nav";

function BooksDisplay() {
    return (
        <div>
            <Nav/>
            <div className="display">
                <div className="sidebar">
                    <h4 className="d2ah">Explore</h4>
                    <div className="col">
                        <Link to="/" className="btn transparent-btn d-block">Books</Link>
                        <button type="button" className="btn transparent-btn d-block">Quizzes</button>
                        <button type="button" className="btn transparent-btn d-block">Challenges</button>
                        <button type="button" className="btn transparent-btn d-block">Trivia</button>
                        <button type="button" className="btn transparent-btn d-block">Themes</button>
                        <button type="button" className="btn transparent-btn d-block">Activities</button>
                    </div>
                    <h3>User Profile</h3>
                    <div className="col">
                        <Link to="/rewards" className="btn transparent-btn d-block">Rewards</Link>
                        <Link to="/badges" className="btn transparent-btn d-block">Badges</Link>
                        <Link to="/notepad" className="btn transparent-btn d-block">Notepad</Link>
                    </div>
                </div>
            </div>
            <div className="bookscard">
                <h1 className="addlibtext">Added to Your Library</h1>
            </div>
        </div>
    );
}

export { BooksDisplay };
