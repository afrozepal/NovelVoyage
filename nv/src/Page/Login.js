import React, { useState, useEffect } from 'react';
import { Nav } from '../components/nav.js';
import '../style/login.css';
import { fetchUsers } from '../script/api.js';
import warningicon from '../assets/warning.png';
import lgimg from '../assets/lg-main.avif';
// import {Link} from 'react-router-dom'

function Login() {
  //username hooks
  const [usernameBorderColor, setUsernameBorderColor] = useState('');
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');

  //password hooks
  const [passwordBorderColor, setPasswordBorderColor] = useState('');
  const [password, setPassword] = useState('');

  //warning img hooks
  const [warningimgp, setWarningImgp] = useState(false);
  const [warningimgu, setWarningImgu] = useState(false);

  useEffect(() => {
    fetchUsers()
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  function handleSubmit(event) {
    event.preventDefault(); 
    if (username !== '' && password !== '')
    {
      const user = users.find(user => user.username === username && user.password === password);

      if(searchInUsers(username,password))
      {

        // Save user ID and name
      localStorage.setItem('userId', user.id);
      localStorage.setItem('username', user.name);

          setWarningImgp(false);
          setWarningImgu(false);
          alert('Logged in successfully!');

          window.location.href = `/Home/${user._id}/${encodeURIComponent(user.name)}`;
          // <Link to={`/Home/${user._id}/${encodeURIComponent(user.name)}`}></Link>

          setUsername('');
          setPassword('');
      }
      else if(searchInUsers_u(username) && !searchInUsers_p(password))
      {
          setWarningImgp(true);
          setWarningImgu(false);
      }
      else if(!searchInUsers_u(username) && searchInUsers_p(password))
      {
          setWarningImgu(true);
          setWarningImgp(false);
      }
      else if(!searchInUsers_u(username) && !searchInUsers_p(password))
      {
          setWarningImgu(true);
          setWarningImgp(true);
      }
    } 
  }

  function handleUsernameChange(event){
    setUsername(event.target.value);
  }

  function handlePasswordChange(event){
    setPassword(event.target.value);
  }

  function handleUsernameBlur() {
    if (username === '')
      setUsernameBorderColor('red');
    else { setUsernameBorderColor('black'); 
    setWarningImgu(false);
    }
  }

  function handlePasswordBlur() {
    if (password === '')
      setPasswordBorderColor('red');
    else { setPasswordBorderColor('black'); 
    setWarningImgp(false);
    }
  }

  function searchInUsers(username, password) {
    if (users.some(user => user.username === username && user.password === password)) {
      return true;
    }
    return false;
  }

  function searchInUsers_u(username) {
    if (users.some(user => user.username === username)) {
      return true;
    }
    return false;
  }

  function searchInUsers_p(password) {
    if (users.some(user => user.password === password)) {
      return true;
    }
    return false;
  }

  return (
    <div className="mainc">
      <Nav />
      <div className="row px-0">
        <div className="col-lg-6 px-0">
          <img src={lgimg} alt="Login Img Not Displayed" className="img-fluid" />
        </div>
        
        <div className="col-lg-6 mt-3">
          {/* <div className="animated-text">
            <span className="letter">J</span>
            <span className="letter">o</span>
            <span className="letter">i</span>
            <span className="letter">n</span>
            <span className="letter">&nbsp;</span>
            <span className="letter">t</span>
            <span className="letter">h</span>
            <span className="letter">e</span>
            <span className="letter">&nbsp;</span>
            <span className="letter">c</span>
            <span className="letter">o</span>
            <span className="letter">m</span>
            <span className="letter">m</span>
            <span className="letter">u</span>
            <span className="letter">n</span>
            <span className="letter">i</span>
            <span className="letter">t</span>
            <span className="letter">y</span>
          </div> */}
          <div className="card card2">
            <div className="card-body">
              <div className='login-heading'>
                <h4 className="card-title mb-3 card2-title">Login</h4>
                <h6 className=" mb-4">Don't have an account? <a href="/Signup">Sign Up!</a></h6>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <div className='username-label'>
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
                <div className="mb-3">
                  <div className='password-label'>
                    <label htmlFor="password" className={`form-label label-left-margin`}>Password</label>
                  </div>
                  <div className="mb-3 d-flex align-items-center">
                    <input
                      type="password"
                      className={`form-control ${passwordBorderColor === 'red' ? 'thick-border' : ''}`}
                      id="password"
                      value = {password}
                      placeholder="Enter your password"
                      onChange={handlePasswordChange}
                      onBlur={handlePasswordBlur}
                      style={{ borderColor: passwordBorderColor }}
                    />
                    {warningimgp && (<img src={warningicon} alt='Warning Icon' className='warning ml-2' />)}
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Login</button>
                  </div>
                  <div className="container mt-2">
                    <div className="row justify-content-right align-items-right" >
                      <div className="col-auto">
                        <span className="content forgot-password"><a href='/ForgotPassword'>Forgot Password?</a></span>
                      </div>
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

export default Login;
