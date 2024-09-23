import React from 'react'
import './CSS/LoginSignUp.css'

const LoginSignUp = () => {

  return (
    <div className='sign-up-container'>
      <div className="sign-up-box">
        <h1>Sign up</h1>
        <div className="input-fields">
          <input type="text" placeholder='Full name' />
          <input type="email" name="" id="" placeholder='Email' />
          <input type="password" name="" id="" placeholder='Password'/>
        </div>
        <button type="button">Continue</button>
        <div className="sign-up-logic">
          <div className="login">Already have an account? <span>Login here</span></div>
          <div className="agree">
            <input type="checkbox" name="" id="" />
            <p>Agree to our terms and conditions.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginSignUp
