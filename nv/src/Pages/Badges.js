import React, { useEffect, useState } from 'react'
import { Nav } from '../Component/nav'
import axios from 'axios'
import '../Component/badgestyling.css'

const Badges = () => {
  const [userData, setUserData] = useState([]);

  const fetchData = () => {
    axios.get(`http://localhost:8080/getuserdata`)
        .then(response => {
            console.log('Response:', response.data);
            const userDataArray = response.data.userData; // Access the userData array from the response
            setUserData(userDataArray); // Update the state with the userData array
        })
        .catch(err => console.error('Error fetching data:', err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  //return (
  //   <div>
  //     <Nav />
  //     <div/>
  //     <div className="content-wrapper">
  //       <table>
  //         <thead>
  //           <tr>
  //             <th>Rank</th>
  //             <th>Username</th>
  //             <th>Read_Books</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {userData.map((user, index) => (
  //             <tr key={user._id}>
  //               <td>{index + 1}</td>
  //               <td>{user.username}</td>
  //               <td>{user.saved_books}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );
  return (
    <div>
      <Nav />
      <div />
      <div className="content-wrapper">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Read_Books</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.saved_books}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {userData.length === 0 && <p>No user data available.</p>}
      </div>
    </div>
  );
  
}

export default Badges;
