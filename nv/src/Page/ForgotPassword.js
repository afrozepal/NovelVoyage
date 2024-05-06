import { Nav } from '../components/nav.js';
import {useState} from 'react';
import '../style/login.css';
import lgimg from '../assets/lg-main.avif';

function ForgotPassword() {
  //username hooks
  const [username, setUsername] = useState('');
  const [usernameBorderColor,setUsernameBorderColor] = useState('');
  //email hooks
  const [email, setEmail] = useState('');
  //password hooks
  const [password, setPassword] = useState('');
  //confirm password hooks
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleUsernameBorder()
  {
    if(username==='')
    {
        usernameBorderColor='red';
    }
    else usernameBorderColor='black';
  }
  
  function handleEmailBorder()
  {
    if(email==='')
    {
        emailBorderColor='red';
    }
    else emailBorderColor='black';
  }
  
  function handlePasswordBorder()
  {
    if(password==='')
    {
        passwordBorderColor='red';
    }
    else passwordBorderColor='black';
  }
  
  function handleConfirmPasswordBorder()
  {
    if(confirmPassword==='')
    {
        confirmPasswordBorderColor='red';
    }
    else confirmPasswordBorderColor='black';
  }



  return (
    <div className="mainc">
      <Nav />
      <div className="row px-0">
        <div className="col-lg-6 px-0">
          <img src={lgimg} alt="Login Img Not Displayed" className="img-fluid" />
        </div>
        <div className="col-lg-6 mt-3">
          <div className="card">
            <div className="card-body">
              <div className='login-heading'>
                <h4 className="card-title mb-3">Change Password</h4>
                <h6 className=" mb-4">Don't have an account? <a href="/Signup">Sign Up!</a></h6>
              </div>
              <form >
                    <div className="mb-3">
                        <input
                            type="text"
                            className= "form-control"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange = {(e)=>(setUsername(e.target.value))}
                            onBlur={handleUsernameBorder}
                            />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            className= "form-control"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange = {(e)=>(setEmail(e.target.value))}
                            />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className= "form-control"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange = {(e)=>(setPassword(e.target.value))}
                            />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className= "form-control"
                            id="confirmpassword"
                            placeholder="Confirm password here"
                            value={confirmPassword}
                            onChange = {(e)=>(setConfirmPassword(e.target.value))}
                            />
                    </div>
                    <div class="d-grid">
                        <button type="submit" className="btn btn-primary">Update Password</button>
                    </div>
                    <div class="container mt-2">
                        <div class="row justify-content-right align-items-right" >
                        <div class="col-auto">
                            <span class="content forgot-password"><a href='/Login'>Back to Login</a></span>
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
