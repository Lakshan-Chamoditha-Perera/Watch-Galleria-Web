import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
//@ts-ignore
import landingImg from "../assets/landing_logo.png";
//@ts-ignore
import landingImg1 from "../assets/landing_logo1.png";
//@ts-ignore
import landingImg2 from "../assets/landing_logo2.png";
//@ts-ignore
import landingImg3 from "../assets/landing_logo3.png";
import Products from "../components/cards/Products";

const Common = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadAllProducts();
    }, [])

    const loadAllProducts = () => {

        const config = {
            method: "get",
            url: "http://localhost:3000/api/watch",
        };

        axios.request(config).then((res) => {
            console.log(res.data.data);
            setProducts(res.data.data);
        }).catch((err) => {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response.data.error
            })
        })
    }

    const images = [landingImg, landingImg1, landingImg2, landingImg3];
    const settings = {
        dots: true,
        infinite: true,
        speed: 20000,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className='my-6 pb-10 '>
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
            <div className="border min-h-[100vh] px-[13.33vw] my-auto border-red-500" >
                <div className="border mb-10" >
                    <h1 className="text-center text-[48px] font-bold mt-10 ">Our Products</h1>
                    <p className="text-center text-[32px] mt-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Aperiam, asperiores!</p>
                </div>
                <Grid container justifyContent="center" className="mt-[50px] border border-orange-500">
                    {
                        products.length > 0 && products.map((product, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index} className="flex justify-center">
                                <Products product={product} />
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        </div>);
}

export default Common;
