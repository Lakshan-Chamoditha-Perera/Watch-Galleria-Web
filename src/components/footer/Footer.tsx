//@ts-ignore
import React from 'react';
import { Box, Container, Grid, Link, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer: React.FC = () => {
    return (
    
        <div className=' px-[13.33vw] border-t-1 pt-3 hidden lg:block'>

            <div className='flex flex-row justify-between' >

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

                <div className='flex flex-col'  >
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
                </div>
            </div>
            <Typography variant="body2" color="inherit">
                &copy; {new Date().getFullYear()} Watch Shop. All rights reserved.
            </Typography>
        </div>
    );
};

export default Footer;
