import React, { useContext, useEffect } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { AiFillStar } from 'react-icons/ai';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from "../../context/ShopContext";
import Swal from "sweetalert2";

const Products = ({ product }) => {
    const { addToCart, cart } = useCart();

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const handleAddToCart = () => {
        try {
            addToCart({ ...product, addToCartQuantity: 1 });
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Item added to cart'
            });
        } catch (e) {
            Swal.fire({
                icon: 'info',
                title: 'Info',
                text: 'Item already in cart'
            })
        };
    }

    return (
        <Card isFooterBlurred
            isPressable className="w-[280px] h-[500px] max-h-[500px] col-span-12 sm:col-span-5">
            <CardHeader className="absolute z-10 flex-col items-start">
                {
                    product.productDate < Date.now() - (7 * 86400000) ?
                        <p className="text-tiny w-[40px] border-1 border-red-200 rounded text-red-500 uppercase font-bold">NEW</p> : ''
                }
            </CardHeader>
            <CardBody className="p-0 h-[300px]">
                <img
                    src={product.imageUrlList[0]}
                    alt={`${product.productName} Image`}
                    className="object-cover w-full h-full hover:scale-125 transition-transform duration-300 ease-in-out"
                />
            </CardBody>
            {/* <CardFooter className="p-3 flex flex-col align-baseline items-start bg-white/30 border-t-1 border-zinc-100/50 z-10">
                <div className="flex w-full h-full py-0 justify-between items-center">
                    <h4 className="text-black p-0 font-bold text-xl">{product.productName}</h4>
                    <strong className='text-[25px] text-red-500'>
                        ${product.price}
                    </strong>
                </div>

                <div className="flex items-center mb-2">
                    <p className="text-black text-xs">{product.description}</p>
                </div>

                <div className="flex items-center mb-2">
                    {[...Array(product.rating)].map((_, index) => (
                        <AiFillStar key={index} className="text-yellow-500" />
                    ))}
                </div>

                <div className="flex items-center mb-2 border">
                    <p className="text-black text-xs">Category: </p>
                    <p className="text-black text-xs ml-6 font-bold">{product.category}</p>
                </div>
                <div className="flex justify-end w-full">
                    <IconButton color="primary" aria-label="add to shopping cart" onClick={handleAddToCart}>
                        <AddShoppingCartIcon />
                    </IconButton>
                </div>
            </CardFooter> */}
            <CardFooter className="flex  flex-col items-start p-4 space-y-1">
                <div className=" text-[15px] text-gray-500">{product.category}</div>
                <div className=" w-full justify-between flex flex-roe text-black">
                    <div className="text-[25px]  text-black">
                        {product.itemCode}
                    </div>
                    <div className="  text-black">
                        {product.productName}
                    </div>

                </div>
                <div className="text-[15px] text-gray-500">{product.description}</div>
                <div className="flex items-center mb-2">
                    {[...Array(product.rating)].map((_, index) => (
                        <span key={index} className="text-[15px] text-yellow-500">★</span>
                    ))}
                </div>
                <div className="text-[25px] font-bold text-black">$ {product.price} </div>
                <div className="flex justify-end w-full">
                    <IconButton color="primary" aria-label="add to shopping cart" onClick={handleAddToCart}>
                        <AddShoppingCartIcon sx={{ fontSize: 30 }} />
                    </IconButton>
                </div>
            </CardFooter>
        </Card>
        
    );
};

export default Products;
