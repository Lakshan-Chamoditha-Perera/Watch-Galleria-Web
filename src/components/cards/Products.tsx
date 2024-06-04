import React, { useContext, useEffect } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { AiFillStar } from 'react-icons/ai';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, IconButton } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from "../../context/ShopContext";
import './products.css'
import { enqueueSnackbar, SnackbarProvider } from "notistack";

const ProductsView = ({ product }) => {
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
            enqueueSnackbar('Item added to cart', { variant: 'success' });
        } catch (e) {
            enqueueSnackbar('Item Already in Cart', { variant: 'info' });

        };
    }

    return (
        <Card isFooterBlurred
            isPressable className="w-[280px] max-h-[500px] col-span-12 sm:col-span-5 ">
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
                <hr />
            </CardBody>

            <CardFooter className="flex  flex-col items-start p-4 ">

                <div className=" text-[13px] text-gray-500">{product.category}</div>
                <div className=" w-full justify-between flex flex-roe text-black">
                    <div className="text-[18px]  text-black">
                        {product.itemCode}
                    </div>
                    <div className="text-[15px] text-right text-black">
                        {product.productName}
                    </div>

                </div>
                <div className="text-[15px] text-left text-gray-500">{product.description}</div>
                <div className="flex items-center mb-2">
                    {[...Array(product.rating)].map((_, index) => (
                        <span key={index} className="text-[15px] text-yellow-500">★</span>
                    ))}
                </div>
                <div className="text-[23px] text-black">$ {product.price.toFixed(2)} </div>
                <div className="flex justify-end w-full">
                    <Button variant="outlined" size="small" aria-label="add to shopping cart" onClick={handleAddToCart}>
                        {/* <AddShoppingCartIcon fontSize="small" /> */}
                        add to cart
                    </Button>
                </div>
            </CardFooter>
        </Card>

    );
};


export default function Products({ product }) {
    return (
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <ProductsView product={product} />
        </SnackbarProvider>
    );
}
