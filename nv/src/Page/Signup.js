import React, { useState, useEffect } from 'react';
import { Nav } from '../components/nav';
import mainImgSu from '../assets/su-main.jpg';
import '../style/login.css'; 
import { addUser, fetchUsers } from '../script/api';
import warningicon from '../assets/warning.png'

function Signup() {
  //user hook
  const [users, setUsers] = useState([]);
  //username hooks
  const [username, setUsername] = useState('');
  const [usernameBorderColor, setUsernameBorderColor] = useState('');
  //name hooks
  const [fullName, setFullName] = useState('');
  const [nameBorderColor, setNameBorderColor] = useState('');
  //email hooks
  const [email, setEmail] = useState('');
  const [emailBorderColor, setEmailBorderColor] = useState('');
  //password hooks
  const [password, setPassword] = useState('');
  const [passwordBorderColor, setPasswordBorderColor] = useState('');
  //confirm password hooks
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordBorderColor, setConfirmPasswordBorderColor] = useState('');
  //error message
  const [errorMessage, setErrorMessage] = useState('');
  //warning img hook
  const [warningimgp, setWarningImgp] = useState(false);
  const [warningimgu, setWarningImgu] = useState(false);
  const [warningimgn, setWarningImgn] = useState(false);
  const [warningimge, setWarningImge] = useState(false);
  const [warningimgcp, setWarningImgcp] = useState(false);

  useEffect(() => {
    fetchUsers()
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }
    //if username already exists
    else if(searchInUsers_u(username))
    {
      setErrorMessage('Username already exists!');
      return;
    }
    //if email already registered
    else if(searchInUsers_e(email))
    {
      setErrorMessage('Email already exists!');
      return;
    }
    else if(username===''||password===''||confirmPassword===''||email===''||fullName==='')
    {
      return;
    }
    else {
      // Log form data before making the POST request
      console.log('Form Data:', { username, password, fullName, email });
    
      try {
        await addUser(username, password, fullName, email);
        setUsername('');
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrorMessage('');
        alert('Account created successfully! Please log in.');
      } catch (error) {
        console.error('Error creating account:', error);
        setErrorMessage('Error creating account. Please try again later.');
      }
    }
  };

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

  function handleUsernameBlur() {
    if (username === '')
      setUsernameBorderColor('red');
    else { setUsernameBorderColor('black'); 
    setWarningImgu(false);
    }
  }

  function handleNameBlur() {
    if (fullName === '')
      setNameBorderColor('red');
    else { setNameBorderColor('black'); 
    setWarningImgn(false);
    }
  }

  function handlePasswordBlur() {
    if (password === '')
      setPasswordBorderColor('red');
    else { setPasswordBorderColor('black'); 
    setWarningImgp(false);
    }
  }
  
  function handleEmailBlur() {
    if (email === '')
      setEmailBorderColor('red');
    else { setEmailBorderColor('black'); 
    setWarningImge(false);
    }
  }
  function handleConfirmPasswordBlur() {
    if (confirmPassword === '')
      setConfirmPasswordBorderColor('red');
    else { setConfirmPasswordBorderColor('black'); 
    setWarningImgcp(false);
    }
  }

  function handleUsernameChange(event){
    setUsername(event.target.value);
  }

  function handlePasswordChange(event){
    setPassword(event.target.value);
  }

  function handleNameChange(event){
    setFullName(event.target.value);
  }

  function handleEmailChange(event){
    setEmail(event.target.value);
  }

  function handleConfirmPasswordChange(event){
    setConfirmPassword(event.target.value);
  }

  return (
    <div className="mainc">
  <Nav />
  <div className="row px-0">
    <div className="col-lg-6 px-0">
      <img src={mainImgSu} alt="Login Main Img Not Displayed" className="img-fluid" />
    </div>
    <div className="col-lg-6 mt-3">
      <div className="card">
        <div className="card-body">
          <div className='signup-heading'>
            <h4 className="card-title mb-3">Sign Up</h4>
            <h6 className="mb-4">Already have an account? <a href="/Login">Log In!</a></h6>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <div className='username-label2'>
                  <label htmlFor="username" className="form-label">Username</label>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <input
                    type="text"
                    className={`form-control ${usernameBorderColor === 'red' ? 'thick-border' : ''}`}
                    id="username"
                    value={username}
                    placeholder="Enter your username"
                    onChange={handleUsernameChange}
                    onBlur={handleUsernameBlur}
                    style={{ borderColor: usernameBorderColor }}
                  />
                  {warningimgu && (<img src={warningicon} alt='Warning Icon' className='warning ml-2' />)}
                </div>
              </div>
              <div className="col-md-6">
                <div className='right-labels-su'>
                  <label htmlFor="fullname" className="form-label">Full Name</label>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <input
                    type="text"
                    className={`form-control ${nameBorderColor === 'red' ? 'thick-border' : ''}`}
                    id="name"
                    value={fullName}
                    placeholder="Enter your full name"
                    onChange={handleNameChange}
                    onBlur={handleNameBlur}
                    style={{ borderColor: nameBorderColor }}
                  />
                  {warningimgn && (<img src={warningicon} alt='Warning Icon' className='warning ml-2' />)}
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <div className='username-label2'>
                  <label htmlFor="email" className="form-label">Email Address</label>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <input
                    type="email"
                    className={`form-control ${emailBorderColor === 'red' ? 'thick-border' : ''}`}
                    id="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    style={{ borderColor: emailBorderColor }}
                  />
                  {warningimge && (<img src={warningicon} alt='Warning Icon' className='warning ml-2' />)}
                </div>
              </div>
              <div className="col-md-6">
                <div className='right-labels-su'>
                  <label htmlFor="password" className="form-label">Password</label>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <input
                    type="password"
                    className={`form-control ${passwordBorderColor === 'red' ? 'thick-border' : ''}`}
                    id="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                    style={{ borderColor: passwordBorderColor }}
                  />
                  {warningimgp && (<img src={warningicon} alt='Warning Icon' className='warning ml-2' />)}
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <div className='username-label2'>
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <input
                    type="password"
                    className={`form-control ${confirmPasswordBorderColor === 'red' ? 'thick-border' : ''}`}
                    id="confirmPassword"
                    value={confirmPassword}
                    placeholder="Re-enter your password"
                    onChange={handleConfirmPasswordChange}
                    onBlur={handleConfirmPasswordBlur}
                    style={{ borderColor: confirmPasswordBorderColor }}
                  />
                  {warningimgcp && (<img src={warningicon} alt='Warning Icon' className='warning ml-2' />)}
                </div>
              </div>
            </div>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <div class="d-grid">
              <button type="submit" className="btn btn-primary">Create Account</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>



  );
}

export default Signup;
