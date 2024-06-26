import { Box, Grid, Typography } from '@mui/material';
import React from 'react'

import { FaArrowUp } from 'react-icons/fa';
import SalesChart from '../../components/charts/SalesChart';
const Sales = () => {
    return (
        <div className="px-[20px] lg:px-[13.33vw] my-10 flex flex-col min-h-[80vh]">

            <Box className=' rounded border  p-3 lg:glass-card'>
                <Typography fontWeight="bold" className="text-left " variant="h3"  >
                    Sales
                    <Typography className="text-left" variant="subtitle1" gutterBottom>
                        Manage your sales
                    </Typography>
                </Typography>
            </Box>


            <Box className="mt-3 rounded border p-2" >
                <Grid container className='justify-between ' spacing={3} sx={{ minHeight: 'fit' }}>

                    <Grid item xs={12} md={7}>
                        <div className="h-full flex border flex-col items-center lg:p-3 py-4">

                        </div>
                    </Grid>


                    <Grid item xs={12} md={5} >
                        <div className="h-fit flex flex-col items-center lg:p-3 py-4">
                        <SalesChart />
                        </div>
                    </Grid>

                </Grid>
            </Box>
        </div>
    )
}

export default Sales;