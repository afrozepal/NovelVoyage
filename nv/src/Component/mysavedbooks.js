import React, { useState, useEffect } from "react";
import './library.css'
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

function Mysavedbooks(props) {

    const id = props.userId;

    const [books, setBooks] = useState([]);
    const [savedBookIds, setSavedBookIds] = useState([]);

    const populateBooks = () => {
        axios.get('http://localhost:5000/getbooks')
            .then(response => {
                console.log('Response:', response.data);
                setBooks(response.data);
            })
            .catch(err => console.error('Error fetching data:', err));
    };

    const populateUsers = () => {
        axios.get(`http://localhost:5000/getusers/${id}`)
            .then(response => {
                console.log('Response:', response.data);
                // Split the saved_books string by commas and remove empty strings
                const savedBooks = response.data.saved_books.split(",").filter(id => id.trim().length > 0);
                setSavedBookIds(savedBooks);
            })
            .catch(err => console.error('Error fetching data:', err));
    };

    useEffect(() => {
        populateBooks();
        populateUsers();
    }, [id]);

    console.log("saved book ids are ", savedBookIds);

    const [selectedBook, setSelectedBook] = useState(null);
    const handleDescriptionClick = (book) => {
        setSelectedBook(book);
    };

    const handleCloseAlert = () => {
        setSelectedBook(null);
    };

    const handleRemoveBook = (bookId) => {
        // Remove the bookId from the savedBookIds list
        const updatedSavedBookIds = savedBookIds.filter(savedId => savedId !== bookId);
        const formattedSavedBookIds = updatedSavedBookIds.join(',');
        console.log('Updated saved book IDs:', formattedSavedBookIds); // Log the updated saved book IDs
        setSavedBookIds(updatedSavedBookIds);
        // Update the user's saved_books in the backend
        axios.put(`http://localhost:5000/updatesaving/${id}`, { saved_books: formattedSavedBookIds })
          .then(response => {
            console.log('User saved books updated successfully:', response.data);
          })
          .catch(err => console.error('Error updating user saved books:', err));
      };
    // const handleSave = (bookId,id) => {
    //     axios.put(`http://localhost:5000/updateLibrary/${bookId}` , {userId:id})
    //         .then(response => {
    //             console.log('Book saved successfully:', response.data);
    //         })
    //         .catch(err => console.error('Error updating like:', err));
    // };
    

    // Filter books based on savedBookIds
    const savedBooks = books.filter(book => savedBookIds.includes(book._id));

    return (
        <div className="display2">
            <div className="librarybooks">
                <h1 className="savedbookh">Your Saved Books:</h1>
                <div className="savedbookscard">
                    <div className="card-container">
                        {savedBooks.length > 0 ? (
                            savedBooks.map((book, index) => (
                                <div className="card" style={{ width: '17rem', marginRight: '20px', marginBottom: '20px' }} key={book._id}>
                                    <img src={book.Image} className="card-img-top" alt="Book Cover" style={{ objectFit: 'contain', maxHeight: '300px' }} />
                                    <div className="card-body card3-body" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <h5 className="card-title">{book.title} <sub> {book.Rating}</sub> </h5>
                                        <button onClick={() => handleDescriptionClick(book)}>See Description</button>
                                        <div className="row-container">
                                            <button className="btn btn-link unsave-icon" onClick={() => handleRemoveBook(book._id)}><FaTimes /></button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No Books Saved</p>
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

export { Mysavedbooks };
