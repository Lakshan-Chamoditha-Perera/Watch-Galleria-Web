import React, { useEffect, useState } from "react";
import {
    Button,
    ButtonGroup,
    Grid,
    Pagination,
    Select,
    MenuItem,
    Box,
    Chip,
    FormControl,
    InputLabel,
    OutlinedInput,
    SelectChangeEvent,
    useTheme,
    Theme,
    Typography
} from "@mui/material";
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
//@ts-ignore
import landingImg4 from "../assets/landing_logo4.png";
//@ts-ignore
import landingImg5 from "../assets/landing_logo5.jpg";
//@ts-ignore
import landingImg6 from "../assets/landing_logo6.png";
//@ts-ignore
import landingImg7 from "../assets/landing_logo7.png";

import Products from "../components/cards/Products";
import { WatchDto } from "../util/dto/watch.dto";
import { MenuProps } from "@nextui-org/react";
import { ClassNames } from "@emotion/react";
import NewsletterSignup from "../components/Newsletter";
import ContactUs from "./Contact";
import ImageSlider from "./ImageSlider";

const Common = () => {
    const [products, setProducts] = useState<WatchDto[]>([]);
    const [originalProducts, setOriginalProducts] = useState<WatchDto[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        const config = {
            method: "get", url: "http://localhost:3000/api/watch",
        };

        axios.request(config).then((res) => {
            const productList = res.data.data.map((item) => new WatchDto(item.itemCode, item.productName, item.description, item.category, item.price, item.quantity, item.rating, new Date(item.productDate), item.gender, item.imageUrlList, 0));
            setProducts(productList);
            setOriginalProducts(productList);
        }).catch((err) => {
            console.log(err);
            Swal.fire({
                icon: 'error', title: 'Oops...', text: err.response.data.error
            });
        });
    };

    const sortItemsAscending = () => {
        const sortedItems = [...products].sort((a, b) => a.price - b.price);
        setProducts(sortedItems);
    };

    const sortItemsDescending = () => {
        const sortedItems = [...products].sort((a, b) => b.price - a.price);
        setProducts(sortedItems);
    };

    const resetSort = () => {
        setProducts(originalProducts);
    };

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        setSelectedCategory(event.target.value);
    };

    const filteredProducts = products.filter((product) => {
        if (selectedCategory && product.category !== selectedCategory) {
            return false;
        }
        return true;
    });

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (<div className=''>
        <div className="lg:h-[93vh] md:h-auto lg:flex-row flex flex-wrap justify-between px-[13.33vw] ">
            <div className="lg:h-full md:h-[50%] w-[40%] p-8 flex flex-col justify-center items-start text-black ">
                <h1 className="text-8xl text-left font-bold text-black mb-1">TIMELY WATCHES</h1>
                <h2 className="text-4xl font-bold text-[#BD9069] mb-4">
                    Time is what we make of it    
                </h2>
                <Typography className="text-left" variant="subtitle1" gutterBottom>
                   
                   Designed to keep a consistent movement despite the motions caused by the person's activities. 
                </Typography>
            </div>
            <div className="w-[50%] flex justify-center items-center">
                <img src={landingImg7} alt="watch" className="z-0 h-full  object-cover" />
            </div>
        </div>

        <div className="min-h-[100vh] px-[13.33vw] my-auto">
            <div>
                <h1 className="shadow-sm text-[48px] font-bold mt-10">Products</h1>
            </div>

            <div className="h-auto flex flex-row justify-end my-10 ">
                <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                    <Button onClick={resetSort}>ALL</Button>
                    <Button onClick={sortItemsAscending}>Lowest to Highest</Button>
                    <Button onClick={sortItemsDescending}>Highest to Lowest</Button>
                </ButtonGroup>
                <FormControl aria-label="text primary " size="small" className=" border border-red-600">
                    <InputLabel className="text-sky-400/75" color="primary" id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category-select"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        color="primary"
                        className="w-[200px] ml-2"
                        size="small"

                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        <MenuItem value="LUXURY">Luxury</MenuItem>
                        <MenuItem value="CASUAL">Casual</MenuItem>
                        <MenuItem value="SPORT">Sport</MenuItem>
                        <MenuItem value="SMART">Smart</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <Grid className="mt-[50px] flex flex-wrap gap-10 items-center justify-around">
                {currentProducts.length > 0 && currentProducts.map((product, index) => (
                    <Products product={product} />
                ))}
            </Grid>

            <Grid container justifyContent="center" className="my-20">
                <Pagination count={Math.ceil(filteredProducts.length / productsPerPage)} page={currentPage}
                    onChange={handlePageChange} color="primary" />
            </Grid>
        </div>

        <NewsletterSignup />

        {/* <ImageSlider /> */}

    </div>);
};

export default Common;
