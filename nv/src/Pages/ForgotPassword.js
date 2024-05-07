import { Nav } from '../components/nav.js';
import { useState, useEffect } from 'react'; // Import createRef
import '../style/login.css';
import lgimg from '../assets/lg-main.avif';
import { fetchUsers, updatePassword } from '../script/api.js';

function ForgotPassword(props) {
  //username hooks
  const [username, setUsername] = useState('');
  const [usernameBorderColor, setUsernameBorderColor] = useState('');
  //email hooks
  const [email, setEmail] = useState('');
  const [emailBorderColor, setEmailBorderColor] = useState('');
  //password hooks
  const [password, setPassword] = useState('');
  const [passwordBorderColor, setPasswordBorderColor] = useState('');
  //confirm password hooks
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordBorderColor, setConfirmPasswordBorderColor] = useState('');
  //error message hook
  const [errorMessage, setErrorMessage] = useState('');
  //users hook
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetchUsers()
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  function searchInUsers_u(username) {
    if (users.some(user => user.username === username)) {
      return true;
    }
    return false;
  }

  function searchInUsers_e(email) {
    if (users.some(user => user.email === email)) {
      return true;
    }
    return false;
  }

  function handleUsernameBorder() {
    if (username === '') {
      setUsernameBorderColor('red');
    } else setUsernameBorderColor('black');
  }

  function handleEmailBorder() {
    if (email === '') {
      setEmailBorderColor('red');
    } else setEmailBorderColor('black');
  }

  function handlePasswordBorder() {
    if (password === '') {
      setPasswordBorderColor('red');
    } else setPasswordBorderColor('black');
  }

  function handleConfirmPasswordBorder() {
    if (confirmPassword === '') {
      setConfirmPasswordBorderColor('red');
    } else setConfirmPasswordBorderColor('black');
  }

  //form submission
  function handleSubmit(event) {
    event.preventDefault();
    if (username === '' || password === '' || confirmPassword === '' || email === '') {
      if (username === '') handleUsernameBorder();
      if (email === '') handleEmailBorder();
      if (password === '') handlePasswordBorder();
      if (confirmPassword === '') handleConfirmPasswordBorder();
      return;
    } else if (searchInUsers_u(username) && !searchInUsers_e(email)) {
      setErrorMessage('Please use the correct email for your valid username');
      return;
    } else if (!searchInUsers_u(username) && searchInUsers_e(email)) {
      setErrorMessage('Please use the correct username for your valid email');
      return;
    } else if (password !== confirmPassword) {
      setErrorMessage('The passwords are not matching!');
      return;
    } else {
      // update existing password to new password
      updatePassword(username, password) // Call updatePassword function
        .then(() => {
          alert('Password successfully changed! Click on OK to be redirected to the login page!');
          window.location.href = '/Login'; // Redirect to the login page
        })
        .catch(error => {
          console.error('Error updating password:', error);
          setErrorMessage('Error updating password. Please try again.'); // Display error message
        });
    }
  }
  
  return (
    <div className="mainc">
      <Nav />
      <div className="row px-0">
        <div className="col-lg-6 px-0">
          <img src={lgimg} alt="Login Img Not Displayed" className="img-fluid" />
        </div>
        <div className="col-lg-6 mt-3">
          <div className="card card2">
            <div className="card-body">
              <div className='login-heading'>
                <h4 className="card-title mb-3 card2-title">Change Password</h4>
                <h6 className=" mb-4">Don't have an account? <a href="/Signup">Sign Up!</a></h6>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => (setUsername(e.target.value))}
                    onBlur={handleUsernameBorder}
                    style={{ borderColor: usernameBorderColor }}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => (setEmail(e.target.value))}
                    onBlur={handleEmailBorder}
                    style={{ borderColor: emailBorderColor }}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => (setPassword(e.target.value))}
                    onBlur={handlePasswordBorder}
                    style={{ borderColor: passwordBorderColor }}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="confirmpassword"
                    placeholder="Confirm password here"
                    value={confirmPassword}
                    onChange={(e) => (setConfirmPassword(e.target.value))}
                    onBlur={handleConfirmPasswordBorder}
                    style={{ borderColor: confirmPasswordBorderColor }}
                  />
                </div>
                <div className="d-grid">
                  <div className='last-message'>
                    <p className='error-message'>{errorMessage}</p>
                  </div>
                  <button type="submit" className="btn btn-primary">Update Password</button>
                </div>
                <div className="container mt-2">
                  <div className="row justify-content-right align-items-right" >
                    <div className="col-auto">
                      <span className="content forgot-password"><a href='/Login'>Back to Login</a></span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
