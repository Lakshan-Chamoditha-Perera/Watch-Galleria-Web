


import React from 'react';
import { Button, TextField, Box, Grid, Paper, Typography, Link, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box display="flex" height="100vh">
            <Box flex={1} display="flex" justifyContent="center" alignItems="center">

                <img alt="Illustration" className='object-cover max-h-full w-full border' src='https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
            </Box>
            <Box flex={1} display="flex" justifyContent="center" alignItems="center">
                <Box width="100%" maxWidth={400} p={2}>
                    <Typography variant="h4" className='text-left' component="h1" gutterBottom>
                        Sign up to Timely.
                    </Typography>
                    <Typography variant="body1" className="text-left" gutterBottom>
                        Already a member? <Link onClick={() => navigate('/signin')} style={{ cursor: 'pointer' }}>Log in</Link>
                    </Typography>
                    <TextField
                        fullWidth
                        label="E-mail"
                        type="email"
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                    // helperText="6+ Characters, 1 Capital letter"
                    />
                    <TextField
                        fullWidth
                        label="Re-password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ mt: 2 }}
                    >
                        Create an account
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        size="large"
                        startIcon={<img alt="Google logo" src="https://developers.google.com/identity/images/g-logo.png" width="20" />}
                        sx={{ mt: 2 }}
                    >
                        Sign up with Google
                    </Button>
                    <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
                        This site is protected by reCAPTCHA and the Google <Link href="#">Privacy Policy</Link> and <Link href="#">Terms of Service</Link> apply.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
export default SignUpPage;
