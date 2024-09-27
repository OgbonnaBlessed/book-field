import React, { useState } from 'react'
import './CSS/LoginSignUp.css'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const signUp = async () => {
    let responseData;

    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      navigate('/');

    } else {
      alert(responseData.errors);
    }
  }

  return (
    <div className='sign-up-container'>
      <div className="sign-up-box">
        <h1>Sign up</h1>
        <div className="input-fields">
          <input 
            type="text" 
            name='username' 
            placeholder='Full name'
            value={formData.username}
            onChange={changeHandler} 
          />
          <input 
            type="email" 
            name="email" 
            id="email" 
            placeholder='Email' 
            value={formData.email}
            onChange={changeHandler}
          />
          <input 
            type="password" 
            name="password" 
            id="password" 
            placeholder='Password'
            value={formData.password}
            onChange={changeHandler}
          />
        </div>
        <button 
          onClick={() => signUp()}
          type="button">
            Continue
        </button>
        <div className="sign-up-logic">
          <div className="login">Already have an account? <Link to='/login'>Login here</Link></div>
          <div className="agree">
            <input type="checkbox" name="" id="" />
            <p>Agree to our terms and conditions.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp