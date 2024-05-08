import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';



const BookTriviaPage = () => {
    const { bookID } = useParams();
    console.log(bookID)
    console.log("booook:",bookID);
    const [triviaEntries, setTriviaEntries] = useState([]);
    const [score, setScore] = useState(0);
    useEffect(() => {
        const fetchTriviaEntries = async () => {
            try {
                const response = await axios.get('http://localhost:5000/gettrivia', {
                    params: {
                        bookId: '66379ce55c06bf3deb2e3149',
                        userId: '66352352ba654ba9f524c855'
                    }
                });
            
                setTriviaEntries(response.data);
            } catch (error) {
                console.error('Error fetching trivia entries:', error);
            }
        };
    

        fetchTriviaEntries();
    }, []);

    const handleSubmit = async (event, id) => {
        event.preventDefault(); 
        const triviaEntry = triviaEntries.find(entry => entry._id === id);
        const selectedOption = event.target.selectedOption.value;
      
        // Check if the selected option matches the correct option
        if (selectedOption === triviaEntry.correctOption) {
          // If the selected option is correct, add 10 marks to the score
            const updatedMarks = triviaEntry.marks + 10;
            setScore(updatedMarks);
            try {
            // Make a PUT request to update the trivia entry
            const response = await axios.put(`http://localhost:5000/triviaupdate/${id}`, {
                chosenOption: selectedOption,
                marks: updatedMarks
            });
      
            // Update the trivia entry in the state with the updated marks
            setTriviaEntries(prevEntries => {
                return prevEntries.map(entry => {
                if (entry._id === id) {
                    return {
                    ...entry,
                    chosenOption: selectedOption,
                    marks: updatedMarks
                    };
                }
                return entry;
                });
            });
      
            console.log('Trivia entry updated successfully:', response.data);
            } catch (error) {
            console.error('Error updating trivia entry:', error);
            }
        } else {
            try {
                const marks1  = triviaEntry.marks;
                const response = await axios.put(`http://localhost:5000/triviaupdate/${id}`, {
                    marks: marks1,
                    chosenOption: selectedOption,
                });
            
                // Update the trivia entry in the state with the new chosen option
                setTriviaEntries(prevEntries => {
                    return prevEntries.map(entry => {
                    if (entry._id === id) {
                        return {
                        ...entry,
                        chosenOption: selectedOption,
                        };
                    }
                    return entry;
                    });
                });
        } catch (error) {
            console.error('Error updating trivia entry:', error);};
        };
    };

    return (
    
    
        <div className="container-fluid bg-gray p-4 rounded shadow-lg d-flex justify-content-center align-items-center">
        <div className="dabba bg-black p-4 rounded">
            <h1 className=" text-center mb-4 text-light">Trivia Entries</h1>

            {triviaEntries.map(entry => (
                <div className='andar-wala-dabba'>
                    <div key={entry._id} className="thora-margin-do mb-4">
                        <p className="mb-2 text-light">Question: {entry.question}</p>
                            <form onSubmit={(event) => handleSubmit(event, entry._id)} style={{ display: 'inline' }}>
                            {/* Add hidden input fields to pass trivia entry data */}
                            <input type="hidden" name="userId" value={entry.userId} />
                            <input type="hidden" name="bookId" value={entry.bookId} />
                            <input type="hidden" name="question" value={entry.question} />
                            {/* Add radio buttons for each option */}
                            {entry.options.map((option, index) => (
                                <div className="form-check" key={index}>
                                    <input className="form-check-input" type="radio" name="selectedOption" id={`option${index}`} value={option} />
                                    <label className="form-check-label text-light" htmlFor={`option${index}`}>{option}</label>
                                </div>
                            ))}
                            {/* Add your form fields here if needed */}
                            <button type="submit" className="btn btn-info mt-2">Submit</button>
                        </form>
                    </div>
                </div>
            ))}
            <button className='btn btn-warning text-white button-margin'> {score}</button>
        </div>
    </div>


    );
}

export default BookTriviaPage;






/*    
        <div className="container-fluid">
            <h1>Trivia Entries</h1>
            <ul>
                {triviaEntries.map(entry => (
                    <li key={entry._id}>
                        <p>Question: {entry.question}</p>
                        <form onSubmit={(event) => handleSubmit(event, entry._id)} style={{ display: 'inline' }}>
                            {/* Add hidden input fields to pass trivia entry data *///}
                            //<input type="hidden" name="userId" value={entry.userId} />
                            //<input type="hidden" name="bookId" value={entry.bookId} />
                           // <input type="hidden" name="question" value={entry.question} />
                            //{/* Add radio buttons for each option */}
                            //{entry.options.map((option, index) => (
                                //<label key={index}>
                                    //<input type="radio" name="selectedOption" value={option} />
                                    //{option}
                                //</label>
                            //))}
                            //<br />
                            //{/* Add your form fields here if needed */}
                            //<button type="submit">Submit</button>
                        //</form>
                    //</li>
                //))}
            //</ul>
        //</div>
    //);        