import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import './bookspopulation.css'

function BooksTable() {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);

    const populateBooks = () => {
        axios.get('http://localhost:5000/getbooks')
            .then(response => {
                console.log('Response:', response.data);
                setBooks(response.data);
            })
            .catch(err => console.error('Error fetching data:', err));
    };

    const filterBooks = useCallback(() => {
        if (searchQuery.trim() === '') {
            setFilteredBooks(books);
        } else {
            const filtered = books.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()));
            setFilteredBooks(filtered);
        }
    }, [searchQuery, books]);

    useEffect(() => {
        populateBooks();
    }, []);

    useEffect(() => {
        filterBooks();
    }, [searchQuery, books, filterBooks]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div>
            <div className="search-container">
                <input type="text" placeholder="Enter Book Name" value={searchQuery} onChange={handleSearchChange} />
            </div>

            <div className="container2">
                <div className="books-container">
                    {filteredBooks.length === 0 ? (
                        <p>No books found.</p>
                    ) : (
                        <table className="table table-borderless books-table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title <sub>pages</sub> </th>
                                    <th scope="col">Author</th>
                                    <th scope="col">Genre</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBooks.map((book, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{book.title} <sub>{book.num_pages}</sub> </td>
                                        <td>{book.author}</td>
                                        <td>{book.Genre}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BooksTable;
