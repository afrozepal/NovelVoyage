export function fetchUsers() {
    return fetch('http://localhost:5000/api/userslala')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        return response.json();
      })
      .then(data => {
        console.log('Fetched users at login side:', data);
        return data; // Return the fetched data
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        throw error; // Re-throw the error to be handled by the component
      });
}

export async function addUser(username, password, name, email) {
    try {
        const read_count=0;
        const liked_books='';
        const saved_books='';
        const response = await fetch('http://localhost:5000/api/userslala', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password, email, name, liked_books, read_count, saved_books}) 
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        console.log('User added successfully');
        return response.json(); // Return the response data (the newly created user)
      } catch (error) {
        console.error('Error adding user:', error);
        throw error; // Re-throw the error to be handled by the calling function
      }
}
  
export async function updatePassword(username, password) {
  try {
    const response = await fetch(`http://localhost:5000/api/userslala/${username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password }) 
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    console.log('Password updated successfully');
    return response.json(); // Return the response data (the updated user)
  } catch (error) {
    console.error('Error updating password:', error);
    throw error; // Re-throw the error to be handled by the calling function
  }
}