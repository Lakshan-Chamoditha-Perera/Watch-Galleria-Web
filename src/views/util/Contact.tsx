import React from 'react';
import { Container, TextField, Button, Typography, Box, Link, Grid, Paper } from '@mui/material';

const ContactUs: React.FC = () => {
    return (
        <div className=" bg-gray-50 lg:px-[13.33vw] mb-10 flex flex-col justify-center">
            {/* <h1 className="text-[48px] text-left font-bold mt-2">Contact Us</h1> */}
            <Container maxWidth="lg" className="pb-8">

                {/* Adding more information sections */}
                <Box className="mt-12">
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={7}>

                            <Box className="lg:mb-8 w-full">
                                <iframe
                                    title="Our Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.836880414701!2d144.95373531531755!3d-37.816279379751814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5779eabc54b1e14!2sTime+City%2C+Clockland!5e0!3m2!1sen!2s!4v1622527450094!5m2!1sen!2s"
                                    height="300"
                                    allowFullScreen
                                    loading="lazy"
                                    className='rounded lg:w-full border '

                                ></iframe>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <Box className="mb-8">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="First Name"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Last Name"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Email"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Phone"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Message"
                                            variant="outlined"
                                            multiline
                                            rows={4}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" color="primary" fullWidth>
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

export default ContactUs;
