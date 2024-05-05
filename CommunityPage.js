import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Community.css';
import '../styles/dispplaystyling.css';
import '../styles/styling.css';


function CommunityPage() {
    const [CommunityData, setCommunityData] = useState([]);
    const [username, setUsername] = useState('');
    const [comment, setNewComment] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/getcomments')
            .then(CommunityData => setCommunityData(CommunityData.data))
            .catch(err => console.log(err))
    }, [])


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePostChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleSubmit = () => {
        axios.post('http://localhost:3001/createpost', { username, comment: comment })
            .then((response) => {
                setCommunityData([...CommunityData, response.data]);
                setUsername(''); // Clear the username input field
                setNewComment('');
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <div className="col-md-9 bg-dark p-5">
                <h1 className="text-white text-3xl">ReadersSpace</h1>
                <p className="text-white">(15 members)</p>

                {Array.isArray(CommunityData) &&
                    CommunityData.map(com => (
                        <section key={com._id} className="text-white body-font bg-black m-5 p-5">
                            <div className="container-fluid mx-auto row align-items-center justify-content-center">
                                <h1 className="rounded-circle img-thumbnail" style={{ width: '50px', height: '50px' }}>
                                    {com.username[0]}
                                </h1>
                                <div className="text-color col-md-6 d-flex flex-column justify-content-center align-items-start">
                                    <p className="text-color mb-4">{com.comment}</p>
                                </div>
                            </div>
                        </section>
                    ))
                }


                <section className="text-white body-font bg-black m-5 p-5">
                    <div className="container-fluid mx-auto">
                        <h2 className="text-center mb-4">Create Post</h2>
                        <input
                            type="text"
                            className="form-control mb-4"
                            placeholder="Enter your username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <textarea
                            className="form-control mb-4"
                            rows="3"
                            placeholder="Write your post here..."
                            value={comment}
                            onChange={handlePostChange}
                        ></textarea>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                            Post
                        </button>
                    </div>
                </section>
            </div >
        </>
    );
}

export default CommunityPage;
