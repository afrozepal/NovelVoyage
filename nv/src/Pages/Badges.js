import React, { useEffect, useState } from 'react';
import { Nav } from '../Component/nav';
import axios from 'axios';
import '../Component/badgestyling.css';

const Badges = () => {
  const [userData, setUserData] = useState([]);

  const fetchData = () => {
    axios.get(`http://localhost:5000/getuserdata`)
      .then(response => {
        console.log('Response:', response.data);
        const userDataArray = response.data.userData; // Access the userData array from the response
        // Sort userDataArray based on read_count in descending order
        userDataArray.sort((a, b) => countReadBooks(b.read_count) - countReadBooks(a.read_count));
        setUserData(userDataArray); // Update the state with the sorted userData array
      })
      .catch(err => console.error('Error fetching data:', err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const countReadBooks = (readBooksString) => {
    if (!readBooksString) return 0;
    return readBooksString.split(',').length;
  };

  return (
    <div>
      <Nav />
      <div />
      <div className="design content-wrapper">
        <table className="table-design table-dark table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Read Books Count</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{countReadBooks(user.read_count)}</td> {/* Display the count of IDs in read_books */}
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
