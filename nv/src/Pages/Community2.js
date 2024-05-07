import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import share from '../assets/icons8-send-48.png'


function Community2() {
    const [CommunityData, setCommunityData] = useState([]);
    const [username, setUsername] = useState('');
    const [comment, setNewComment] = useState('');
    const [thoughtText, setThoughtText] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/getcomments')
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
        axios.post('http://localhost:5000/createpost', { username, comment: comment })
            .then((response) => {
                setCommunityData([...CommunityData, response.data]);
                setUsername(''); // Clear the username input field
                setNewComment('');
            })
            .catch(err => console.log(err));
    };
    const handleLikePost = (postId) => {
        axios.post(`http://localhost:5000/likePost/${postId}`)
            .then(response => {
                const updatedCommunityData = CommunityData.map(post => {
                    if (post._id === postId) {
                        return { ...post, likes: response.data.likes };
                    }
                    return post;
                });
                setCommunityData(updatedCommunityData);
            })
            .catch(err => console.log(err));
    };
    const handleSavePost = (postId) => {
        axios.post(`http://localhost:5000/savePost/${postId}`)
            .then(response => {
                const updatedCommunityData = CommunityData.map(post => {
                    if (post._id === postId) {
                        return { ...post, saved: !post.saved };
                    }
                    return post;
                });
                setCommunityData(updatedCommunityData);
            })
            .catch(err => console.log(err));
    };

    const handleAddThought = (postId) => {
        axios.post(`http://localhost:5000/addThought/${postId}`, { thoughtText })
            .then(response => {
                const updatedCommunityData = CommunityData.map(post => {
                    if (post._id === postId) {
                        return { ...post, thoughts: [...post.thoughts, response.data] };
                    }
                    return post;
                });
                setCommunityData(updatedCommunityData);
                setThoughtText(''); // Clear the input field
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <div className="background-container fixed-top">
                <nav className="navbar navbar-expand-lg mainheader">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                            <a className="navbar-brand locset" href="/">Novel Voyage</a>
                        </div>
                        <ul className="nav justify-content-end">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Read</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Community</a>
                            </li>
                            <button type="button" className="btn btn-light cbtn">LogIn</button>
                            <button type="button" className="btn btn-light cbtn">SIGNUP</button>
                        </ul>
                    </div>
                </nav>
            </div>

            <div className="container-fluid pt-5">
                <div className="downside">
                    <div>
                        <h1 className="dh1">Create Your Community Here!</h1>
                    </div>
                    <div className="dcont">
                        <h4>Find Your Reader Friends Here.</h4>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="row">
                    <div className="siderbardesign col-md-3">
                        <div className="siderbardesign p-3">
                            <div className="sidebar">
                                <h4>Your Communities</h4>
                                <div className="row">
                                    <div className="column">
                                        <Link to="/communitypage" type="button" className="btn transparent-btn d-block">ReaderSpace</Link>
                                        <Link to="/community2" type="button" className="btn transparent-btn d-block active">BussReads</Link>
                                        <Link to="/community3" type="button" className="btn transparent-btn d-block">FlowerPortal</Link>
                                        <Link to="/community4" type="button" className="btn transparent-btn d-block">NightGale Studio</Link>
                                        <hr className='hortizontal-line' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-md-9 padding p-5">
                        <h1 className="text-white text-3xl">BussReads</h1>
                        <p className="text-white">(20 members)</p>
                        <p className="text-white"><span className='bold-karo'>Description:</span> Welcome aboard BussReads, the literary journey of a lifetime! Buckle up as we traverse through genres, from thrilling mysteries to heartwarming romances, making stops at every captivating plot twist. Our community is your ticket to bookish adventures, where readers from all walks of life gather to share stories, exchange recommendations, and spark lively discussions. Whether you're a seasoned traveler of the literary world or just starting your reading voyage, BussReads is your ultimate destination for literary exploration and discovery.</p>

                        {/* Your other components */}
                        {Array.isArray(CommunityData) &&
                            CommunityData.map(com => (
                                <section key={com._id} className="section-design text-white body-font bg-black m-5 p-5">
                                    <div className="container-fluid mx-auto row align-items-center justify-content-center">
                                        <h1 className="rounded-circle img-thumbnail" style={{ width: '50px', height: '50px' }}>
                                            {com.username[0]}
                                        </h1>
                                        <div className="text-color col-md-6 d-flex flex-column justify-content-center align-items-start">
                                            <p className="text-color mb-4">{com.comment}</p>
                                        </div>
                                    </div>
                                    <button type="button" className="margin-btn btn btn-danger btn-sm" onClick={() => handleLikePost(com._id)}>likes: {com.likes}</button>
                                    <button className="text-white btn btn-warning btn-sm" onClick={() => handleSavePost(com._id)}> {com.saved ? 'Saved' : 'Save'}</button>

                                    <h4 className='comment-section' >Comment Section</h4>
                                    <ul>
                                        {com.thoughts.map(thought => (
                                            <li key={thought._id}>{thought.username}: {thought.thoughtText}</li>
                                        ))}
                                    </ul>
                                    <input
                                        className='text-feild-design'
                                        type="text"
                                        value={thoughtText}
                                        onChange={(e) => setThoughtText(e.target.value)}
                                        placeholder="Enter your thought"
                                    />
                                    <button className='img-btn text-white btn btn-info btn-sm' onClick={() => handleAddThought(com._id)}><img className='img-size' src={share} alt='share' /></button>

                                </section>
                            ))
                        }
                        <section className="section-design text-white body-font bg-black m-5 p-5">
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
                    </div>
                </div>
            </div>

        </>
    );
}

export default Community2;




