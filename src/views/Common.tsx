import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Grid, Pagination, Select, MenuItem, Box, Chip, FormControl, InputLabel, OutlinedInput, SelectChangeEvent, useTheme, Theme } from "@mui/material";
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
import { WatchDto } from "../util/dto/watch.dto";
import { MenuProps } from "@nextui-org/react";
import { ClassNames } from "@emotion/react";

const Common = () => {
    const [products, setProducts] = useState<WatchDto[]>([]);
    const [originalProducts, setOriginalProducts] = useState<WatchDto[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(20);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        const config = {
            method: "get",
            url: "http://localhost:3000/api/watch",
        };

        axios.request(config).then((res) => {
            const productList = res.data.data.map((item) => new WatchDto(
                item.itemCode,
                item.productName,
                item.description,
                item.category,
                item.price,
                item.quantity,
                item.rating,
                new Date(item.productDate),
                item.gender,
                item.imageUrlList,
                0
            ));
            setProducts(productList);
            setOriginalProducts(productList);
        }).catch((err) => {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response.data.error
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

    return (
        <div className='my-6 pb-10'>
            <div className="bg-[#f5f5f5] py-5 h-[90vh] px-[13.33vw] grid grid-cols-2">
                <div id="left_div" className="h-full bg-[#f5f5f5] p-8 flex flex-col justify-center items-start text-black">
                    <h1 className="text-8xl text-left font-bold text-black mb-1">TIMELY WATCHES</h1>
                    <h2 className="text-4xl font-bold text-[brown] mb-4">DIAL BURGUNDY</h2>
                    <p className="text-sm text-gray-700 text-left mb-8">
                        This attractive Komono Magnus watch is made from stainless steel and is fitted with an
                        analogue quartz movement. It is fitted with a brown leather strap and has a white dial.
                    </p>
                </div>
                <div className="bg-[#f5f5f5] flex justify-center items-center">
                    <img src={landingImg} alt="watch" className="z-0 scale-125 object-cover" />
                </div>
            </div>
            <div className="min-h-[100vh] px-[13.33vw] my-auto">
                <div>
                    <h1 className="text-left text-[48px] font-bold mt-10">Our Products</h1>
                    <p className="text-left text-[32px] mt-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, asperiores</p>
                </div>
                <div className="h-auto flex flex-row justify-end px-8  my-10 ">
                    <ButtonGroup className="" variant="text" color="primary" aria-label="text primary button group">
                        <Button onClick={resetSort}>ALL</Button>
                        <Button onClick={sortItemsAscending}>Lowest to Highest</Button>
                        <Button onClick={sortItemsDescending}>Highest to Lowest</Button>
                        <FormControl aria-label="text primary " size="small" className=" border border-red-600">
                            <InputLabel color="primary" id="category-label">CATEGORY</InputLabel>
                            <Select
                                labelId="category-label"
                                id="category-select"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                // label="Category"
                                color="primary"
                                className="w-[200px] ml-2"
                            >
                                <MenuItem value="">
                                    <em>All</em>
                                </MenuItem>
                                <MenuItem value="LUXURY">LUXURY</MenuItem>
                                <MenuItem value="CASUAL">CASUAL</MenuItem>
                                <MenuItem value="SMART">SMART</MenuItem>
                            </Select>
                        </FormControl>
                    </ButtonGroup>
                </div>

                <Grid container spacing={2} className="mt-[50px]">
                    {currentProducts.length > 0 && currentProducts.map((product, index) => (
                        <Grid item xs={12} sm={6} md={3} lg={3} key={index} className="flex justify-center m-2">
                            <Products product={product} />
                        </Grid>
                    ))}
                </Grid>
                <Grid container justifyContent="center" className="mt-4">
                    <Pagination count={Math.ceil(filteredProducts.length / productsPerPage)} page={currentPage} onChange={handlePageChange} color="primary" />
                </Grid>
            </div>
        </div>
    );
};

export default Common;
