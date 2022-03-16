import React from 'react';
// import { useSelector, useDispatch } from 'react-redux'
// import { login } from '../redux/reducer'

const Login = () => {
  // const dispatch = useDispatch();
  const usernameText = React.createRef();
  const passwordText = React.createRef();

  return (
    <div>
      <form className='loginForm' onSubmit={(e) => {
          e.preventDefault();
          console.log('username: ', usernameText.current.value, ' password: ', passwordText.current.value)
          // () => dispatch(login(usernameText.current.value, passwordText.current.value))
        }} >
        <div className='loginText'>Login</div>
          <label title="username">
          <input ref={usernameText} type='text' placeholder='username' id = "username"></input>
          </label>
          <label htmlFor="password">
            <input ref={passwordText} type='password' placeholder='password' id ="password"></input>
          </label>
        <div className='error'></div>
        <button type='submit' className='loginButton'>Login</button>
      </form> 
    </div>
  )
}

export default Login