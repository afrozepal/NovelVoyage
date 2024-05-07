import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Trivia from './Trivia';



function Triviapage() {
    const [bookID, setBookID] = useState(null);

    useEffect(() => {
        const fetchTriviaData = async () => {
            try {
                const response = await axios.post('http://localhost:8000/generate-trivia', {
                    bookID,
                    userId: '66352352ba654ba9f524c855'
                });
                console.log("hereeeeeeeeeeee");
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (bookID !== null) {
            fetchTriviaData();
        }
    }, [bookID]);

    const handleButtonClick = (id) => {
        setBookID(id);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Main content */}
                <div className="col-md-9">
                    <h2 className="text-ka-design text-center text-white mb-4">Book Trivia</h2>
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        <div className="col">
                            <div className="card bg-dark text-white">
                                <div className="card-body">
                                    <h5 className="card-title">The Four Loves</h5>
                                    <p className="card-text">Some trivia question related to 'The Four Loves'</p>
                                    <Link to={`/trivia/${bookID}`} className="btn btn-info" onClick={() => handleButtonClick('66379ce55c06bf3deb2e3149')}>Play Trivia</Link>
                                </div>
                            </div>
                        </div>
                        {/* Repeat the card structure for each book */}
                        {/* Example for 'Empire of The Monsoon' */}
                        <div className="col">
                            <div className="card bg-dark text-white">
                                <div className="card-body">
                                    <h5 className="card-title">Empire of The Monsoon</h5>
                                    <p className="card-text">Some trivia question related to 'Empire of The Monsoon'</p>
                                    <Link to={`/trivia/${bookID}`} className="btn btn-info" onClick={() => handleButtonClick('66379ce55c06bf3deb2e314c')}>Play Trivia</Link>
                                </div>
                            </div>
                        </div>
                        {/* Repeat for other books */}
                        {/* Example for 'A Gap Into Madness' */}
                        <div className="col">
                            <div className="card bg-dark text-white">
                                <div className="card-body">
                                    <h5 className="card-title">A Gap Into Madness</h5>
                                    <p className="card-text">Some trivia question related to 'A Gap Into Madness'</p>
                                    <Link to={`/trivia/${bookID}`} className="btn btn-info" onClick={() => handleButtonClick('66379ce55c06bf3deb2e314d')}>Play Trivia</Link>
                                </div>
                            </div>
                        </div>
                        {/* Repeat for other books */}
                        {/* Example for 'Master of The Game' */}
                        <div className="col">
                            <div className="card bg-dark text-white">
                                <div className="card-body">
                                    <h5 className="card-title">Master of The Game</h5>
                                    <p className="card-text">Some trivia question related to 'Master of The Game'</p>
                                    <Link to={`/trivia/${bookID}`} className="btn btn-info" onClick={() => handleButtonClick('66379ce55c06bf3deb2e314e')}>Play Trivia</Link>
                                </div>
                            </div>
                        </div>
                        {/* Repeat for other books */}
                        {/* Example for 'The Little House' */}
                        <div className="col">
                            <div className="card bg-dark text-white">
                                <div className="card-body">
                                    <h5 className="card-title">The Little House</h5>
                                    <p className="card-text">Some trivia question related to 'The Little House'</p>
                                    <Link to={`/trivia/${bookID}`} className="btn btn-info" onClick={() => handleButtonClick('66379ce55c06bf3deb2e3156')}>Play Trivia</Link>
                                </div>
                            </div>
                        </div>
                        {/* Repeat for other books */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Triviapage;
















/*
<div className="container-fluid">
            <div className="row">
                {/* Main content *///}
                //<div className="col-md-9 bg-dark p-5">
                    //<h2 className="text-white text-center mb-4">Book Trivia</h2>
                    //<div className="d-grid gap-3">
                      //  <Link to={`/trivia/${bookID}`}   > 
                        //    <button className="btn btn-primary" onClick={() => handleButtonClick('66379ce55c06bf3deb2e3149')} >The Four Loves</button>
                        //</Link>    
                        //<Link to={`/trivia/${bookID}`}>
                          //  <button className="btn btn-primary" onClick={() => handleButtonClick('66379ce55c06bf3deb2e314c')}>Empire of The Monsoon</button>
                        //</Link>
                        //<Link to={`/trivia/${bookID}`}>
                          //  <button className="btn btn-primary" onClick={() => handleButtonClick('66379ce55c06bf3deb2e314d')}>A Gap Into Madness</button>
                        //</Link>
                        //<Link to={`/trivia/${bookID}`}>
                          //  <button className="btn btn-primary" onClick={() => handleButtonClick('66379ce55c06bf3deb2e314e')}>Master of The Game</button>
                        //</Link>
                        //<Link to={`/trivia/${bookID}`}>
                          //  <button className="btn btn-primary" onClick={() => handleButtonClick('66379ce55c06bf3deb2e3156')}>The Little House</button>
                        //</Link>
                   //</div>
               //</div>
           // </div>
        //</div>
