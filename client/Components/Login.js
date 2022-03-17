import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../redux/reducer'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { default as MUILink } from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <MUILink color="inherit" href="https://mui.com/">
        quizDI
      </MUILink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Login = () => {
  const dispatch = useDispatch();
  const usernameText = React.createRef();
  const passwordText = React.createRef();

  return (
    <div>
      <form className='loginForm' onSubmit={(e) => {
          e.preventDefault();
          console.log('username: ', usernameText.current.value, ' password: ', passwordText.current.value);
          dispatch(login({username: usernameText.current.value, password: passwordText.current.value}))
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
    // <ThemeProvider theme={theme}>
    //   <Container component="main" maxWidth="xs">
    //     <CssBaseline />
    //     <Box
    //       sx={{
    //         marginTop: 8,
    //         display: 'flex',
    //         flexDirection: 'column',
    //         alignItems: 'center',
    //       }}
    //     >
    //       <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
    //         <LockOutlinedIcon />
    //       </Avatar>
    //       <Typography component="h1" variant="h5">
    //         Sign in
    //       </Typography>
    //       <Box component="form" noValidate sx={{ mt: 1 }}>
    //         <TextField
    //           margin="normal"
    //           required
    //           fullWidth
    //           id="username"
    //           label="Username"
    //           name="username"
    //           autoComplete="username"
    //           inputRef={usernameText}
    //           autoFocus
    //         />
    //         <TextField
    //           margin="normal"
    //           required
    //           fullWidth
    //           name="password"
    //           label="Password"
    //           type="password"
    //           id="password"
    //           inputRef={passwordText}
    //           autoComplete="current-password"
    //         />
    //         {/* {auth === false && 
    //           <Alert variant="outlined" severity="error">
    //             Please enter a valid username and password
    //           </Alert>
    //         } */}
    //         <FormControlLabel
    //           control={<Checkbox value="remember" color="primary" />}
    //           label="Remember me"
    //         />
    //         <Button
    //           type="submit"
    //           fullWidth
    //           variant="contained"
    //           sx={{ mt: 3, mb: 2 }}
    //           onClick={() => dispatch(login({username: usernameText.current.value, password: passwordText.current.value}))}
    //         >
    //           Sign In
    //         </Button>
    //       </Box>
    //     </Box>
    //     <Copyright sx={{ mt: 8, mb: 4 }} />
    //   </Container>
    // </ThemeProvider>
  )
}

export default Login