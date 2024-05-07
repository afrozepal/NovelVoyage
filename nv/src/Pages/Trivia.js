import React, { useState, useEffect } from 'react';
//import TriviaGenerator from './TriviaGenerator'; // Assuming TriviaGenerator component is in a separate file
import axios from 'axios';

const BookTriviaPage = () => {
    const [triviaData, setTriviaData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTriviaData = async () => {
            try {
                const response = await axios.post('http://localhost:8000/generate-trivia', {
                    bookID: '66379ce55c06bf3deb2e3145',
                    userId: '66352352ba654ba9f524c855'
                });
                console.log("hereeeeeeeeeeee");
                setTriviaData(response.data);
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to fetch trivia data');
            }
        };

        fetchTriviaData();
    }, []);

    return (
        <div>
        {error && <p>{error}</p>}
    </div>
    
    );
}

export default BookTriviaPage;
