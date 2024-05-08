import React, { useState, useEffect } from "react";
import axios from 'axios';
import './displaystyling.css'
import { FaHeart } from 'react-icons/fa';
import { FaSave } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { Link } from "react-router-dom";

function BooksDisplay(props) {

    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState("");
    const id = props.userId;
    const name=props.username;

    // console.log("write now id is , " , id ,name);

    const populateBooks = () => {
        axios.get('http://localhost:5000/getbooks')
            .then(response => {
                console.log('Response:', response.data);
                setBooks(response.data);
            })
            .catch(err => console.error('Error fetching data:', err));
    };



    const handleLike = (bookId) => {
        axios.put(`http://localhost:5000/updateLike/${bookId}`)
            .then(response => {
                console.log('Book liked successfully:', response.data);
            })
            .catch(err => console.error('Error updating like:', err));
    };

    useEffect(() => {
        populateBooks();
    }, []);
/////////////////////////////sam
   
    /////////////////////////


    const handleDescriptionClick = (book) => {
        setSelectedBook(book);
    };

    const handleCloseAlert = () => {
        setSelectedBook(null);
    };

    const handleGenreClick = (genre) => {
        setSelectedGenre(genre);
    };
    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    const uniqueGenres = Array.from(new Set(books.map(book => book.Genre)));

    const filteredBooks = selectedGenre ? books.filter(book => book.Genre.toLowerCase().includes(selectedGenre.toLowerCase())) : books;

    const handlerank = (bookId, selectedRating) => {
        axios.put(`http://localhost:5000/updateRank/${bookId}`, { rating: selectedRating })
            .then(response => {
                console.log('Rating updated successfully:', response.data);
            })
            .catch(err => console.error('Error updating rating:', err ));
    };

    
    const handleSave = (bookId,id) => {
        axios.put(`http://localhost:5000/updateLibrary/${bookId}` , {userId:id})
            .then(response => {
                console.log('Book saved successfully:', response.data);
            })
            .catch(err => console.error('Error updating library:', err));
    };

    const handleRead = (bookId,id) => {
        axios.put(`http://localhost:5000/MarkasRead/${bookId}` , {userId:id})
            .then(response => {
                console.log('Book saved successfully:', response.data);
            })
            .catch(err => console.error('Error updating like:', err));
    };


    return (
        <div>
            <div className="display">
                <div className="sidebar">
                    <h4 className="d2ah">Books By Genres</h4>
                    <div className="row">
                        <div className="col">
                            <button type="button" className="btn transparent-btn d-block" onClick={() => handleGenreClick('Fiction')}>Fiction</button>
                            <button type="button" className="btn transparent-btn d-block" onClick={() => handleGenreClick('Detective')}>Detective</button>
                            <button type="button" className="btn transparent-btn d-block" onClick={() => handleGenreClick('Adventure')}>Adventure</button>
                            <button type="button" className="btn transparent-btn d-block" onClick={() => handleGenreClick("Children's Stories")}>Children's Stories</button>
                            <button type="button" className="btn transparent-btn d-block" onClick={() => handleGenreClick('History')}>History</button>
                            <button type="button" className="btn transparent-btn d-block" onClick={() => handleGenreClick('Philosophy')}>Philosophy</button>
                            <div className="row">
                            <div className="col">
                            <select onChange={handleGenreChange} value={selectedGenre} className="button-like-select">
                                <option value="other"> Other </option>
                                {uniqueGenres.map((genre, index) => (
                                    <option key={index} value={genre}>{genre}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <Link to={`/Library/${id}/${encodeURIComponent(name)}`} className="linkoflib" >MY LIBRARY</Link>
                        </div>
                        <div>
                    <Link to={`/Badges/${id}/${encodeURIComponent(name)}`} className="linkoflib" >DashBoard</Link>
                        </div>
                    </div>
                </div>

                <div className="bookscard">
                    <div className="card-container">
                        {filteredBooks.length > 0 ? (
                            filteredBooks.map((book, index) => (
                                <div className="card" style={{ width: '17rem', marginRight: '20px', marginBottom: '20px' }} key={book._id}>
                                    <img src={book.Image} className="card-img-top" alt="Book Cover" style={{ objectFit: 'contain', maxHeight: '300px' }} />
                                    <div className="card-body card3-body" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <h5 className="card-title">{book.title} <sub> {book.Rating}</sub> </h5>
                                        <button onClick={() => handleDescriptionClick(book)}>See Description</button>
                                        <div className="row-container">
                                        <button className="btn btn-link just-icon" onClick={() => handleLike(book._id)}><FaHeart /></button>
                                        <button className="btn btn-link just-icon" onClick={() => handleSave(book._id ,id)} ><FaSave /></button>
                                        <button className="btn btn-link just-icon" onClick={() => handleRead(book._id ,id)} ><FaCheck /></button>
                                        <select className="rating" onChange={(e) => handlerank(book._id, e.target.value)}>
                                            <option value="0" className="star ">&#9734;</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No books found for this genre</p>
                        )}
                    </div>
                </div>
                {selectedBook && (
                    <div className="alert alert-success displayset" role="alert">
                        <h4 className="alert-heading">Description:</h4>
                        <p>{selectedBook.description}</p>
                        <button onClick={handleCloseAlert}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export { BooksDisplay }
