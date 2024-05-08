import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import share from '../assets/icons8-send-48.png'
import {Nav} from '../Component/nav'

function Community3() {
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
            <Nav></Nav>
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
                            <div className="sidebar2">
                                <h4>Your Communities</h4>
                                <div className="row">
                                    <div className="column">
                                        <Link to="/${props.userId}/${encodeURIComponent(props.username)}/CommunityPage" type="button" className="btn transparent-btn d-block active">ReaderSpace</Link>
                                        <Link to="/${props.userId}/${encodeURIComponent(props.username)}/Community2" type="button" className="btn transparent-btn d-block">BussReads</Link>
                                        <Link to="/${props.userId}/${encodeURIComponent(props.username)}/Community3" type="button" className="btn transparent-btn d-block">FlowerPortal</Link>
                                        <Link to="/${props.userId}/${encodeURIComponent(props.username)}/Community4" type="button" className="btn transparent-btn d-block">NightGale Studio</Link>
                                        <hr className='hortizontal-line' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Main Content */}
                    <div className="col-md-9 padding p-5">
                        <h1 className="text-white text-3xl">FlowerPortal</h1>
                        <p className="text-white">(21 members)</p>
                        <p className="text-white"><span className='bold-karo'>Description:</span> Enter the mesmerizing realm of Flower Portal, where the fragrance of books mingles with the scent of blooming flowers. Our community is a lush garden of literature, where every story is a seed waiting to sprout into a captivating narrative. From classic tales to contemporary sagas, we cultivate a love for reading that blooms perennially. Wander through our virtual gardens, share your favorite literary blooms, and discover new buds waiting to be explored. Join us in nurturing a blossoming community of readers and let your passion for books flourish like petals in the sun-kissed meadows of Flower Portal.</p>

                        {/* Your other components */}
                        {Array.isArray(CommunityData) &&
                            CommunityData.map(com => (
                                <section key={com._id} className="section-design text-white body-font bg-black m-5 p-5">
                                    <div className="container-fluid mx-auto row align-items-center justify-content-center">
                                        <h1 className="rounded-circle img-thumbnail" style={{ width: '50px', height: '50px' }}>
                                            {com.username[0]}
                                        </h1>
                                        
                                        <div className="image-setting col-lg-max-w-fit col-md-6 col-12 mb-4 mb-md-0">
                                        <p className="TextUsername">{com.username}</p>
                                            <img className="image-setting img-fluid rounded" alt="hero" src={com.image} />
                                        </div>
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
                                <button type="button" className="btn text-white btn-warning post-btn" onClick={handleSubmit}>
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

export default Community3;




