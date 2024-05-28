import { Card, CardFooter, CardHeader } from "@nextui-org/react";
import React from "react";
import { AiFillStar } from 'react-icons/ai';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Products = ({ product }) => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Card isFooterBlurred className="w-[300px] h-[480px] col-span-12 sm:col-span-5">
            <CardHeader className="absolute z-10 flex-col items-start">
                <p className="text-tiny w-[40px] border-2 border-red-200 rounded text-red-500 uppercase font-bold">New</p>
            </CardHeader>
            {product.imageUrlList.length === 1 ? (
                <div className="w-full h-full">
                    <img
                        src={product.imageUrlList[0]}
                        alt="Product Image"
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : (
                <Slider {...sliderSettings}>
                    {product.imageUrlList.map((imageUrl, index) => (
                        <div key={index}>
                            <img
                                src={imageUrl}
                                alt={`Product Image ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </Slider>
            )}
            <CardFooter className="p-3 flex flex-col align-baseline items-start bg-white/30 border-t-1 border-zinc-100/50 z-10">
                <div className="flex w-full h-full py-0 justify-between items-center">
                    <h4 className="text-black p-0 font-bold text-xl">{product.productName}</h4>
                    <strong className='text-[25px] text-red-500'>
                        ${product.price}
                    </strong>
                </div>
                <div className="flex items-center mb-2">
                    {[...Array(product.rating)].map((_, index) => (
                        <AiFillStar key={index} className="text-yellow-500"/>
                    ))}
                </div>
                <p className="text-black text-xs mb-2">Lorem ipsum dolor sit</p>
                <div className="flex justify-end w-full">
                    {/* Add your button here */}
                </div>
            </CardFooter>
        </Card>
    );
}

export default Products;
