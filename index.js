const express = require('express');
const connectDB = require('./db');
const CommunityDataModel = require('./models/CommunitySchema')
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.get('/getcomments', (req, res) => {
    CommunityDataModel.find()
        .then(CommunityData => res.json(CommunityData))
        .catch(err => res.json(err))
})

app.post('/createpost', async (req, res) => {
    const { username, comment } = req.body;
    try {
        const newPost = new CommunityDataModel({ username, comment });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create post' });
    }
});


app.listen(3001, () => {
    console.log("App is running");
});



// this is supposed to go in comunity page.js (start)

//  <div className="pt-5">
{/* Main Content */ }
// <div className="container-fluid">
//     <div className="row">
//         {/* Sidebar */}
//         <div className="col-md-3 bg-black">
//             <div className="sidebar">
//                 <h4 className="d2ah">Your Communities</h4>
//                 <div className="row">
//                     <div className="col">
//                         <button type="button" className="btn transparent-btn d-block active">ReaderSpace</button>
//                         <button type="button" className="btn transparent-btn d-block">BussReads</button>
//                         <button type="button" className="btn transparent-btn d-block">FlowerPortal</button>
//                         <button type="button" className="btn transparent-btn d-block">NightGale Studio</button>
//                         <hr className='hortizontal-line' />
//                     </div>
//                 </div>
//             </div>
//         </div>


// Another part of code where posts render (end)

//               {/* Render User Posts */}
// {/* {posts.map((post, index) => (
//                 <section key={index} className="text-white body-font bg-black m-5 p-5">
//                     <p className='text-center p-1'>Community post and discussion show here</p>
//                     <div className="container-fluid mx-auto row align-items-center justify-content-center">
//                         <h1 className="rounded-circle img-thumbnail" style={{ width: '50px', height: '50px' }}>
//                             {post[0].toUpperCase()}
//                         </h1>
//                         <div className="col-md-6">
//                             <img className="img-fluid rounded" alt="hero" src={index % 2 === 0 ? frame3 : frame} />
//                         </div>
//                         <div className="col-md-6 d-flex flex-column justify-content-center align-items-start">
//                             <p className="mb-4">{post.comment}</p>
//                             <button type="button" className="btn btn-outline-danger mb-2">
//                                 <i className="bi bi-heart-fill"></i> Like
//                             </button>
//                             <button type="button" className="btn btn-outline-primary mb-2">
//                                 Reply
//                             </button>
//                         </div>
//                     </div>
//                     <p className='text-center p-2'>More post and stuff like this for community</p>
//                 </section>
//             ))} */}