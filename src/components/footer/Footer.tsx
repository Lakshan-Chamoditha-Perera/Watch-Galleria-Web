// src/components/Footer.tsx

import React from 'react';
import { Box, Container, Grid, Link, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer: React.FC = () => {
    return (
        <Box className='' component="footer" sx={{ bgcolor: 'black', color: 'white', py: 6 }}>
            <Container maxWidth="lg">
                <Grid justifyContent={
                    'space-between'
                } container >

                    <Grid item xs={12} sm={6} md={3}>
                        <Typography align='left' variant="h6" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography align='left' variant="body2">
                            123 Watch St.<br />
                            Time City, Clockland<br />
                            Email: info@watchshop.com<br />
                            Phone: (123) 456-7890
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Typography align='left' variant="h6" gutterBottom>
                            Company
                        </Typography>
                        <Link href="#" align='left' color="inherit" variant="body2" display="block">
                            About Us
                        </Link>
                        <Link href="#" align='left' color="inherit" variant="body2" display="block">
                            Careers
                        </Link>
                        <Link href="#" align='left' color="inherit" variant="body2" display="block">
                            Press
                        </Link>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Typography align='left' variant="h6" gutterBottom>
                            Help
                        </Typography>
                        <Link href="#" align='left' color="inherit" variant="body2" display="block">
                            Customer Service
                        </Link>
                        <Link href="#" align='left' color="inherit" variant="body2" display="block">
                            Shipping Information
                        </Link>
                        <Link href="#" align='left' color="inherit" variant="body2" display="block">
                            Returns & Exchanges
                        </Link>
                    </Grid>

                    <Grid className='border' alignItems={'flex-end'} md={1} item >
                      
                        <Grid className='border'  >
                            <IconButton href="https://facebook.com" target="_blank" color="inherit">
                                <FacebookIcon />
                            </IconButton>
                            <IconButton href="https://twitter.com" target="_blank" color="inherit">
                                <TwitterIcon />
                            </IconButton>
                            <IconButton href="https://instagram.com" target="_blank" color="inherit">
                                <InstagramIcon />
                            </IconButton>
                            <IconButton href="https://youtube.com" target="_blank" color="inherit">
                                <YouTubeIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Box mt={4} className={'border'} textAlign="center">
                    <Typography variant="body2" color="inherit">
                        &copy; {new Date().getFullYear()} Watch Shop. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
