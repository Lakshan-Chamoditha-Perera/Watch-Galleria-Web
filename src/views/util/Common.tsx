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
// @ts-ignore
import landingImg7 from "../../assets/landing_logo7.png";
import Products from "../../components/cards/Products";
import { WatchDto } from "../../util/dto/watch.dto";
import NewsletterSignup from "../../components/newsletter/Newsletter";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { BACKEND_SERVER_URL } from "../../config/env";
import ContactUs from "./Contact";

const CommonView = () => {
    const [products, setProducts] = useState<WatchDto[]>([]);
    const [originalProducts, setOriginalProducts] = useState<WatchDto[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        console.log("CommonView : useEffect {}")
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        console.log("CommonView : loadAllProducts {}")
        const config = {
            method: "get", url: BACKEND_SERVER_URL + "/api/watch",
        };

        axios.request(config).then((res) => {
            const productList = res.data.data.map((item) => new WatchDto(item.itemCode, item.productName, item.description, item.category, item.price, item.quantity, item.rating, new Date(item.productDate), item.gender, item.imageUrlList, 0));
            setProducts(productList);
            setOriginalProducts(productList);
        }).catch((err) => {
            console.log(err);
            enqueueSnackbar('Failed to load products.', { variant: 'error' });
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

    return (
        <div className=' flex-col pt-10 flex lg:p-0'>
            <div className="sm:py-2 text-4xl flex-col lg:h-[93vh] md:h-auto lg:flex-row flex flex-wrap justify-between px-[20px] lg:px-[13.33vw] ">

                <div className="lg:h-full md:h-[50%] lg:w-[40%] p-8 flex flex-col justify-center items-start text-black ">
                    <h1 className="text-[48px] text-center lg:text-8xl lg:text-left font-bold text-black mb-1">TIMELY WATCHES</h1>
                    <h2 className="text-2xl w-full text-center lg:text-4xl lg:text-left font-bold text-[#BD9069] lg:mb-4 mb-5">
                        Time is what we make of it
                    </h2>
                    <Typography className="lg:text-left " variant="subtitle1" gutterBottom>
                        Designed to keep a consistent movement despite the motions caused by the person's activities.
                    </Typography>
                </div>

                <div className="lg:w-[50%] flex justify-center items-center">
                    <img src={landingImg7} alt="watch" className="z-0 h-full object-cover" />
                </div>

            </div>

            <div className="min-h-[100vh] px-[20px]  lg:px-[13.33vw] my-auto mt-20">
                <h1 className="shadow-sm text-5xl lg:text-[48px] font-bold lg:mt-10">Products</h1>
                <div className="h-auto flex flex-col p-2 b lg:flex-row lg:justify-end lg:my-10 ">

                    <ButtonGroup size="small" className="justify-center lg:w-fit" variant="text" color="primary" aria-label="text primary button group">
                        <Button size="small" onClick={resetSort}>ALL</Button>
                        <Button size="small" onClick={sortItemsAscending}>Lowest to Highest</Button>
                        <Button size="small" onClick={sortItemsDescending}>Highest to Lowest</Button>
                    </ButtonGroup>

                    <div className=" lg:w-fit py-2 lg:py-0 flex justify-center ">
                        <FormControl aria-label="text primary " size="small" className="w-[98%]">
                            <InputLabel className="text-sky-400/75" color="primary" id="category-label">Category</InputLabel>
                            <Select
                                labelId="category-label"
                                id="category-select"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                color="primary"
                                className="lg:w-[200px] ml-2"
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
                </div>

                <Grid className="mt-[50px] flex flex-wrap gap-10 items-center justify-around">
                    {currentProducts.length > 0 && currentProducts.map((product, index) => (
                        <Products key={index} product={product} />
                    ))}
                </Grid>

                <Grid container justifyContent="center" className="my-20">
                    <Pagination count={Math.ceil(filteredProducts.length / productsPerPage)} page={currentPage}
                        onChange={handlePageChange} color="primary" />
                </Grid>
            </div>

            <div className='flex flex-col px-[20px] bg-gray-50 lg:px-[13.33vw] lg:items-center lg:justify-center  lg:py-5  '            >
                <NewsletterSignup />
                <ContactUs />
            </div>

        </div>);
};

export default function Common() {
    return (
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <CommonView />
        </SnackbarProvider>
    );
}
