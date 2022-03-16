import React from 'react';
// import { useSelector, useDispatch } from 'react-redux'
// import { signup } from '../redux/reducer'

const Signup = () => {
  // const dispatch = useDispatch();
  const usernameText = React.createRef();
  const passwordText = React.createRef();

  return (
    <div>
      <form className='signupForm' onSubmit={(e) => {
          e.preventDefault();
          console.log('username: ', usernameText.current.value, ' password: ', passwordText.current.value)
          // () => dispatch(signup(usernameText.current.value, passwordText.current.value))
        }} >
        <div className='signupText'>Signup</div>
          <label title="username">
          <input ref={usernameText} type='text' placeholder='username' id = "username"></input>
          </label>
          <label htmlFor="password">
            <input ref={passwordText} type='password' placeholder='password' id ="password"></input>
          </label>
        <div className='error'></div>
        <button type='submit' className='signupButton'>Signup</button>
      </form> 
    </div>
  )
}

export default Signup