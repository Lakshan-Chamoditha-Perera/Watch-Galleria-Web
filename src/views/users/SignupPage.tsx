import React from 'react';
import { useState } from 'react';
import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import Swal from 'sweetalert2';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';

const SignUpPage = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleRePasswordChange = (e) => setRePassword(e.target.value);
    const handleUsernameChange = (e) => setUsername(e.target.value);

    const registerUser = async (e) => {
        e.preventDefault();
        if (password !== rePassword) {
            Swal.fire('Error!', 'Passwords do not match', 'error');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("----------------------------------------------------------------------------------------------")
            console.log("Register User : ")
            console.log(user)
            console.log("----------------------------------------------------------------------------------------------")
            let username = user.displayName ? user.displayName : user.email;

            await axios.post('http://localhost:3000/api/auth/signup', {
                email: email, 
                password: password, 
                name: username, 
                photoURL: user.photoURL ? user.photoURL : ""
            }).then((res) => {
                Swal.fire('Success!', 'Account created successfully!', 'success');
            }).catch((err) => {
                console.log(err.response.data)
                Swal.fire(err.response.data.message, 'Error!', 'error');
            });
        } catch (error) {
            Swal.fire('Error!', error.message, 'error')
        }
    };


    return (<Box display="flex" height="100vh">
        <Box flex={1} display="flex" justifyContent="center" alignItems="center">
            <img
                alt="Illustration"
                className="object-cover max-h-full w-full border"
                src="https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
        </Box>
        <Box flex={1} display="flex" justifyContent="center" alignItems="center">
            <Box width="100%" maxWidth={400} p={2}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Sign up to Timely.
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Already a member?{' '}
                    <Link onClick={() => navigate('/signin')} style={{ cursor: 'pointer' }}>
                        Log in
                    </Link>
                </Typography>
                {/*<TextField*/}
                {/*    fullWidth*/}
                {/*    label="Username"*/}
                {/*    type="text"*/}
                {/*    variant="outlined"*/}
                {/*    margin="normal"*/}
                {/*    onChange={handleUsernameChange}*/}
                {/*/>*/}
                <TextField
                    fullWidth
                    label="E-mail"
                    type="email"
                    variant="outlined"
                    margin="normal"
                    onChange={handleEmailChange}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    onChange={handlePasswordChange}
                />
                <TextField
                    fullWidth
                    label="Re-password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    onChange={handleRePasswordChange}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ mt: 2 }}
                    onClick={registerUser}
                >
                    Create an account
                </Button>
                {/*<Button*/}
                {/*    fullWidth*/}
                {/*    variant="outlined"*/}
                {/*    color="primary"*/}
                {/*    size="large"*/}
                {/*    startIcon={<img*/}
                {/*        alt="Google logo"*/}
                {/*        src="https://developers.google.com/identity/images/g-logo.png"*/}
                {/*        width="20"*/}
                {/*    />}*/}
                {/*    sx={{mt: 2}}*/}
                {/*    onClick={registerUser}*/}
                {/*>*/}
                {/*    Sign up with Google*/}
                {/*</Button>*/}
                <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
                    This site is protected by reCAPTCHA and the Google{' '}
                    <Link href="#">Privacy Policy</Link> and <Link href="#">Terms of Service</Link> apply.
                </Typography>
            </Box>
        </Box>
    </Box>);
};

export default SignUpPage;
