import React from 'react';
import { Button, TextField, Box, Grid, Paper, Typography, Link, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const SignInPage: React.FC = () => {
    const navigate = useNavigate();

    const handleSignIn = () => {
      navigate('/');
    };
    return (
        <Box display="flex" height="100vh">
            <Box flex={1} display="flex" justifyContent="center" alignItems="center">
                <Box width="100%" maxWidth={400} p={2}>
                    <Typography variant="h4" className="text-left" component="h1" gutterBottom>
                        Welcome back.
                    </Typography>
                    <Typography variant="body1" className="text-left" gutterBottom>
                        New to our platform? <Link onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}>Register</Link>
                    </Typography>
                    <Box component="form" noValidate>
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            required
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            required
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ mt: 2 }}
                        >
                            Login
                        </Button>
                        <Link href="#" variant="body2" className="block text-right mt-2">
                            Forgot password?
                        </Link>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="primary"
                            size="large"
                            startIcon={<img alt="Google logo" src="https://developers.google.com/identity/images/g-logo.png" width="20" />}
                            sx={{ mt: 2 }}
                            onClick={handleSignIn}
                        >
                            Sign In with Google
                        </Button>


                    </Box>

                    <Typography variant="body2" className="text-center mt-2">
                        By continuing, you agree to our <Link href="#" className="text-blue-500">Terms of Use</Link> and <Link href="#" className="text-blue-500">Privacy Policy</Link>.
                    </Typography>
                </Box>
            </Box>
            <Box flex={1} display="flex" justifyContent="center" alignItems="center">
                <img
                    alt="Illustration"
                    className="object-cover max-h-full w-full border"
                    src="https://images.unsplash.com/photo-1655693471966-153a0119caa6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
            </Box>

        </Box>
    );
}

export default SignInPage;
