import React from 'react';
import { Grid } from "@mui/material";
import Products from "../components/cards/Products";

//@ts-ignore
import landingImg from "../assets/landing_logo.png";
//@ts-ignore
import landingImg1 from "../assets/landing_logo1.png";
//@ts-ignore
import landingImg2 from "../assets/landing_logo2.png";
//@ts-ignore
import landingImg3 from "../assets/landing_logo3.png";

const Common = () => {
    const images = [landingImg, landingImg1, landingImg2, landingImg3];
    const settings = {
        dots: true,
        infinite: true,
        speed: 20000,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className='my-6 pb-10 border-b-orange-500 border'>
            <div className="bg-[#f5f5f5] py-5 h-[90vh] px-[13.33vw] grid grid-cols-2">
                <div id="left_div"
                    className="h-full bg-[#f5f5f5] p-8 flex flex-col justify-center items-start text-black">
                    <h1 className="text-8xl text-left font-bold text-black mb-1">TIMELY WATCHES</h1>
                    <h2 className="text-4xl font-bold text-[brown] mb-4">DIAL BURGUNDY</h2>
                    <p className="text-sm text-gray-700 text-left mb-8">
                        This attractive Komono Magnus watch is made from stainless steel and is fitted with an
                        analogue quartz movement. It is fitted with a brown leather strap and has a white dial.
                    </p>
                    <button
                        className="border border-black py-2 px-6 bg-white text-black font-semibold hover:bg-black hover:text-white transition-colors duration-300">
                        GET STARTED
                    </button>
                </div>
                <div className="bg-[#f5f5f5] flex justify-center items-center">
                    <img
                        src={landingImg}
                        alt="watch"
                        className="z-0 scale-125 object-cover"
                    />
                </div>
            </div>
            <div className="border mb-10">
                <h1 className="text-center text-4xl font-bold mt-10">Our Products</h1>
                <p className="text-center text-lg mt-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Aperiam, asperiores!</p>
            </div>
            <Grid container spacing={4} className="px-[13.33vw] border-t-orange-500">
                <Grid item><Products /></Grid>
                <Grid item><Products /></Grid>
                <Grid item><Products /></Grid>
                <Grid item><Products /></Grid>
                <Grid item><Products /></Grid>
                <Grid item><Products /></Grid>
            </Grid>
        </div>);
}

export default Common;
